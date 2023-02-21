import Post from '../models/Post.js';
import Users from '../models/Users.js';

// create a post

export const createPost = async (req, res) => {
    try {

        // grabbing userid, caption, and post photo from the front end's request, then adding a new post to the db based on what the user provided

        const { userId, description, picturePath } = req.body;
        const user = await Users.findById(userId);
        const newPost = new Post ({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });

        await newPost.save();

        // sending front end updated list of all posts, so that the new post will be included on their feed

        const post = await Post.find();

        res.status(201).json(post);

    } catch (e) {

        res.status(409).json({ message: e.message });

    };
};