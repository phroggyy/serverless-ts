interface ErrorCollection {
    [index: string]: ErrorCollection|string|number;
}

export class Error {
    static errors: ErrorCollection = {
        auth: {
            user_exists: {
                message: "The email has already been taken",
                code: 1001
            }
        }
    }

    static all(): any {
        return this.errors
    }

    static get(key: string): any {
        return this.errors[key]
    }
}