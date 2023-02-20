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

// adding and removing friends

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await Users.findById(id);
        const friend = await Users.findById(friendId);

        if (user.friends.includes(friendId)) {

            /* removing a friend

            removing user that is already present on the users friends list and that user from the other user's list */

            user.friends = user.friends.filter(id => id != friendId);
            friend.friends = friend.friends.filter(id => id != id);

        } else {

            /* adding a friend

            if they aren't already present, add them to the friends list of both users */

            user.friends.push(friendId);
            friend.friends.push(id);


        };

        await user.save();
        await friend.save();

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