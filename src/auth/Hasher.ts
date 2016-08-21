import * as crypto from 'crypto'

export class Hasher {
    static hash(password: string, salt: any, callback: any = null) {
        var len: number = 128;
        var iterations: number = 4096;

        if (3 == arguments.length) {
            crypto.pbkdf2(password, salt, iterations, len, callback);
        } else {
            callback = salt;
            crypto.randomBytes(len, function(err: any, saltBuffer: Buffer) {
                if (err) return callback(err);
                let salt: string = saltBuffer.toString('base64');
                crypto.pbkdf2(password, salt, iterations, len, function(err: any, derivedKey: Buffer) {
                    if (err) return callback(err);
                    callback(null, salt, derivedKey.toString('base64'));
                });
            });
        }
    }
}

