import Users from '../models/Users.js';

export const getUser = async (req, res) => {
    try {

        // sending user based on id

        const { id } = req.params;
        const user = await Users.findById(id);
        res.status(200).json(user);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => Users.findById(id))
        );
        const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath };
        }
    );
    res.status(200).json(formattedFriends);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};

export const addRemoveFriend = async (req, res) => {
    try {

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};