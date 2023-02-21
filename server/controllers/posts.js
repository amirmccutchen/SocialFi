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

// viewing the feed

export const getFeedPosts = async (req, res) => {
    try {

        const post = await Post.find();

        res.status(200).json(post);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};

// viewing user's posts

export const getUserPosts = async (req, res) => {
    try {

        const { userId } = req.params;
        const post = await Post.find({ userId });

        res.status(200).json(post);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};

// updating posts

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        // grabbing post info and whether user has liked it or not

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        // if liked, delete user id from liked list, if not, do the opposite

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        };

        // update post and then pass in new likes

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);

    } catch (e) {
        res.status(404).json({ message: e.message });
    };
};