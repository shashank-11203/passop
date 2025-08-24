const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from(process.env.SECRET_ENCRYPTION_KEY, 'hex');
const ivLength = 16;

exports.encrypt = (text) => {
    const iv = crypto.randomBytes(ivLength);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex'),
    };
};

exports.decrypt = ({ iv, content }) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        secretKey,
        Buffer.from(iv, 'hex')
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(content, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString('utf8');
};