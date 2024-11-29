import { type RequestEvent } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

interface DecodedAccessToken extends jwt.JwtPayload {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
}

const handleAuth = async (event: RequestEvent) => {
    const refreshToken = event.cookies.get("refreshToken");
    let accessToken = event.cookies.get("accessToken");

    if (accessToken && refreshToken) {
        try {
            const decoded = jwt.decode(accessToken) as DecodedAccessToken;

            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp && decoded.exp < now) {
                console.log("[🔐] accessToken expired, refreshing...");

                const refreshResponse = await fetch("http://localhost:8080/auth/refresh", {
                    method: "POST",
                    headers: {
                        Cookie: event.request.headers.get("cookie") || "",
                    },
                    credentials: "include",
                });

                if (!refreshResponse.ok) {
                    console.error("[🔐] Refresh failed:", refreshResponse.statusText);
                    event.locals.user = undefined;
                    return;
                }

                const data = await refreshResponse.json();
                const accessTokenMaxAge = data.access.maxAge;
                accessToken = data.access.token;

                if (!accessToken) {
                    console.error("[🔐] No accessToken received from backend when refreshing.");
                    event.locals.user = undefined;
                    return;
                }

                console.log("[🔐] New accessToken obtained:", accessToken);

                event.cookies.set("accessToken", accessToken, {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: accessTokenMaxAge * 2, // On double la durée de vie de l'accessToken pour qu'il puisse être rafraîchi
                });
            }

            const newDecoded = jwt.decode(accessToken) as DecodedAccessToken;
            event.locals.user = {
                id: newDecoded?.id,
                firstName: newDecoded?.firstName,
                lastName: newDecoded?.lastName,
                email: newDecoded?.email,
                roles: newDecoded?.roles,
            };
        } catch (err) {
            console.error("[🔐] Failed to decode accessToken:", err);
            event.locals.user = undefined;
        }
    } else {
        event.locals.user = undefined;
        event.cookies.delete('accessToken', { path: '/' });
        event.cookies.delete('refreshToken', { path: '/' });
    }
};

export const handle = async ({ event, resolve }) => {
    await handleAuth(event);
    return resolve(event);
};
