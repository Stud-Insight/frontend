declare namespace App {
    interface Locals {
        user?: {
            id: number,
            name: string,
            roles: string[],
            permissions: string[],
        }
    }
}
