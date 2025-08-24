const Password = require('../models/Password.js');
const { encrypt, decrypt } = require('../utils/encryption.js');

exports.addPassword = async (req, res) => {
    const { site, username, password } = req.body;

    try {
        const encryptedPassword = encrypt(password);

        await Password.create({
            site,
            username,
            password: encryptedPassword.content,
            iv: encryptedPassword.iv,
            user: req.user._id,
        });

        res.status(201).json({ message: 'Password added successfully' });
    } catch (err) {
        console.error('password adding error', err);
        res.status(500).json({ message: 'Error saving password' });
    }
};


exports.getPasswords = async (req, res) => {
    try {
        const passwords = await Password.find({ user: req.user._id });

        const decryptedPasswords = passwords.map(p => {
            try {
                return {
                    ...p._doc,
                    password: decrypt({ iv: p.iv, content: p.password })
                };
            } catch (err) {
                console.error('Error decrypting password for', p.site);
                return { ...p._doc, password: '**** decryption failed' };
            }
        });

        res.status(200).json(decryptedPasswords);
        console.log('passwords fetched successfully');
    } catch (err) {
        console.error('password fetching error', err);
        res.status(500).json({ message: 'Error fetching passwords' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { site, username, password } = req.body;

        const encryptedPassword = encrypt(password);

        const updated = await Password.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            {
                site,
                username,
                password: encryptedPassword.content,
                iv: encryptedPassword.iv
            },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Password not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('password updating error', error);
        res.status(500).json({ message: 'Error updating password' });
    }
};


exports.deletePassword = async (req, res) => {
    try {
        const deleted = await Password.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        })
        if (!deleted) {
            return res.status(404).json({ message: 'Password not found' })
        }

        res.status(200).json({ message: 'Password deleted successfully' })
    } catch (err) {
        console.error('password deleting error', err)
        return res.status(500).json({ message: 'Error deleting password' })
    }
}