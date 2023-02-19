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

};