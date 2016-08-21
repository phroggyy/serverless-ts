interface ConfigCollection {
    [index: string]: string
}

export class Config {

    static config:ConfigCollection = {
        bucket: "cnyn-mysql-backup-dev",
        maxAge: "10",
        dbTable: "cnyn-backups-auth-dev",
        identityPool: "Cnyn Backups",
        developerProvider: "login.cnyn.backups",
        externalName: "My Authentication",
        emailSource: "no-reply@sparky.io",
        verificationPage: "http://bucket.s3.amazonaws.com/verify.html",
        resetPage: "http://bucket.s3.amazonaws.com/reset.html"
    }

    static all() {
        return this.config
    }

    static get(key:string) {
        return this.config[key]
    }
}