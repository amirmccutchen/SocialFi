import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';

// registers the user

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        // using salt to encrypt password, then creating new user with the encrypted password, as well as randomly generated values for the profile views and impressions

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });

        // sending user a status of 201 to show something was created, then sending a response to the front end with the saved password encrypted user

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (e) {

        // something went wrong

        res.status(500).json({error: e.message});
    };
};

export const login = async (req, res) => {
    try {

        // using mongoose to find user that has specified email

        const { email, password } = req.body;

        // checking if user inputted user/pass are valid, if not send error to user

        const user = await Users.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: 'User does not exist.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.'})

        // sending user their auth token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user});

    } catch (e) {
        res.status(500).json({ error: e.message });
    };
};