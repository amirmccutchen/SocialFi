import { Box, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar';
import { FriendsList, MyPost, Posts, User } from './widgets';

const Profile = () => {

  // getting user from url parameters and token from stored state

  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  // grabbing user information

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <NavBar />
      <Box
        width = '100%'
        padding = '2rem 6%'
        display = {isNonMobileScreens ? 'flex' : 'block'}
        gap = '2rem'
        justifyContent = 'center'
      >
        <Box flexBasis = {isNonMobileScreens ? '26%' : undefined}>
          <User userId = {userId} picturePath={user.picturePath} />
          <Box m = '2rem 0' />
          <FriendsList userId = {userId} />
        </Box>
        <Box
          flexBasis = {isNonMobileScreens ? '42%' : undefined}
          mt = {isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPost picturePath = {user.picturePath} />
          <Box m = '2rem 0' />
          <Posts userId = {userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;