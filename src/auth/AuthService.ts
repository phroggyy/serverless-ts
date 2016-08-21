import {DB} from "../persistence/DB";
import * as crypto from "crypto"

export class AuthService {

    constructor(private db: DB) {}

    getUser(email: string, fn: Function) {
        this.db.get({
            email: email
        }, function (err: any, data: any) {
            if (err) return fn(err);
            else {
                if ('Item' in data) {
                    var hash = data.Item.passwordHash.S;
                    var salt = data.Item.passwordSalt.S;
                    var verified = data.Item.verified.BOOL;
                    fn(null, hash, salt, verified);
                } else {
                    fn(null, null); // User not found
                }
            }
        });
    }

    storeUser(email: string, password: string, salt: string, fn: Function) {
        // Bytesize
        var len = 128;
        crypto.randomBytes(len, function (err: any, bufferedToken: Buffer) {
            if (err) return fn(err)
            let token: string = bufferedToken.toString('hex')

            this.db.store({
                    email: email,
                    passwordHash: password,
                    passwordSalt: salt,
                    verified: true,
                    verifyToken: token
                },
                'attribute_not_exists (email)',
                function (err: Error, data: any) {
                    if (err) return fn(err);
                    else fn(null, token);
                });
        });
    }
}

