import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFriends } from 'state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';

// manage your friends list with this component

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // grabbing userid, token, and user friends from stored state

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // color themes

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  // checking if user is a friend

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {

    // sending a request to the server to update _id's friends list with friendId added or removed

    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // specifying that json data is being sent in the request body
        },
      }
    );
    const data = await response.json();

     // Update the list of friends in the store with new data

    dispatch(setFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap = '1rem'>
        <UserImage image = {userPicturePath} size = '55px' />
        <Box
          onClick = {() => {
            navigate(`/profile/${friendId}`);

            /* fixes a bug: when going from user to user page, the components don't rerender,
            navigate 0 will refresh the page so that components re render when switching from user to user */

            navigate(0);
          }}
        >
          <Typography
            color = {main}
            variant = 'h5'
            fontWeight = '500'
            sx = {{
              '&:hover': {
                color: palette.primary.light,
                cursor: 'pointer',
              },
            }}
          >
            {name}
          </Typography>
          <Typography color = {medium} fontSize = '0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick = {() => patchFriend()}
        sx = {{ backgroundColor: primaryLight, p: '0.6rem' }}
      >

        {/* if user is a friend display remove friend icon, show add friend icon otherwise */}

        {isFriend ? (
          <PersonRemoveOutlined sx = {{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx = {{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;