import Users from '../models/Users.js';

export const getUser = async (req, res) => {
    try {

        // finding user based on id

        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(200).json(user);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};

export const getUserFriends = async (req, res) => {
    try {

    } catch (e) {

    };
};

export const addRemoveFriend = async (req, res) => {
    try {

    } catch (e) {

    };
};