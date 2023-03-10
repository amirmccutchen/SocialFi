import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined, } from '@mui/icons-material';
import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import { FlexBetween, Friend, WidgetWrapper } from 'components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'state';

// props consist of post data model keys
  
const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);

    /* checking to see if the user has liked post or not

    likes are stored as a map of users that have liked the post, 
    so we just get the length of the keys of the map to get the amount of likes a post has. */

    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    // api call to add/remove a like to a post, also keeping track of whether or not the user has liked the post or not
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:5001/posts/${postId}/like`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });

      // parsing the response body as JSON data

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };
  
    return (
      <WidgetWrapper m = '2rem 0'>
        <Friend
          friendId = {postUserId}
          name = {name}
          subtitle = {location}
          userPicturePath = {userPicturePath}
        />
        <Typography color = {main} sx = {{ mt: '1rem' }}>
          {description}
        </Typography>
        {picturePath && (
          <img
            width = '100%'
            height = 'auto'
            alt = 'post'
            style = {{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
            src = {`http://localhost:5001/assets/${picturePath}`}
          />
        )}
        <FlexBetween mt = '0.25rem'>
          <FlexBetween gap = '1rem'>
            <FlexBetween gap = '0.3rem'>
              <IconButton onClick = {patchLike}>

                {/* icon displayed based on whether or not user has liked post */}

                {isLiked ? (
                  <FavoriteOutlined sx = {{ color: primary }} />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              <Typography>{likeCount}</Typography>
            </FlexBetween>
  
            <FlexBetween gap = '0.3rem'>
              <IconButton onClick = {() => setIsComments(!isComments)}>
                <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography>{comments.length}</Typography>
            </FlexBetween>
          </FlexBetween>
  
          <IconButton>
            <ShareOutlined />
          </IconButton>
        </FlexBetween>

        {/* displaying comments */}
        
        {isComments && (
          <Box mt = '0.5rem'>
            {comments.map((comment, i) => (
              <Box key = {`${name}-${i}`}>
                <Divider />
                <Typography sx = {{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                  {comment}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Box>
        )}
      </WidgetWrapper>
    );
  };
  
export default PostWidget;