export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: {
        _id: string,
        name: string,
        permissions: string[],
    }[];
}