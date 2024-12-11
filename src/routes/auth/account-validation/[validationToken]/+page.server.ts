export function load({ params }) {
    const validationToken = params.validationToken; // Le token est un segment de l'URL défini dans les routes
    return { validationToken };
}