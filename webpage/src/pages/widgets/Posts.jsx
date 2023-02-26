import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from 'state';
import { Post } from '.';

const PostsWidget = ({ userId, isProfile = false }) => {

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  // api call to get posts for main feed (by default as when you log in, you won't be directly sent to a user's profile)

  const getPosts = async () => {
    const response = await fetch('http://localhost:5001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  // api call to get a specific user's post if we are headed to that userid's page 

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:5001/posts/${userId}/posts`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  return (
    // sending key values from api call to the postwidget component
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <Post
            key = {_id}
            postId = {_id}
            postUserId = {userId}
            name = {`${firstName} ${lastName}`}
            description = {description}
            location = {location}
            picturePath = {picturePath}
            userPicturePath = {userPicturePath}
            likes = {likes}
            comments = {comments}
          />
        )
      ).reverse()}
    </>
  );
};

export default PostsWidget;