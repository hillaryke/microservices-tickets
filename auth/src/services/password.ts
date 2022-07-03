import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// promisify changes callback based func to async func
const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        const hashedPassword = buf.toString('hex');

        return `${hashedPassword}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string) {
        const [storedHashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
        const suppliedHashedPassword = buf.toString('hex');

        return suppliedHashedPassword === storedHashedPassword;
    }
}