import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import { User, MyPost, Posts, FriendsList, Ads } from './widgets';

const Home = () => {
  // checking device depending on screen size
  const isNonMobileScreens = useMediaQuery('(min-width:1000px)');

  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    <Box>
      <NavBar />
      <Box
        width = '100%'
        padding = '2rem 6%'
        display = {isNonMobileScreens ? 'flex' : 'block'}
        gap = '0.5rem'
        justifyContent = 'space-between'
      >
        <Box flexBasis = {isNonMobileScreens ? '26%' : undefined}>
          <User userId = {_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis = {isNonMobileScreens ? '42%' : undefined}
          mt = {isNonMobileScreens ? undefined : '2rem'}
        >
          <MyPost picturePath = {picturePath} />
          <Posts userId = {_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis = '26%'>
            <Ads />
            <Box m = '2rem 0' />
            <FriendsList userId = {_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;