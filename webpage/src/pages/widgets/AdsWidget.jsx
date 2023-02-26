import { Typography, useTheme } from '@mui/material';
import { FlexBetween, WidgetWrapper } from 'components';

// widget to display advertisements

const AdsWidget = () => {

  // color themes

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color = {dark} variant = 'h5' fontWeight = '500'>
          Sponsored
        </Typography>
        <Typography color = {medium}>Create Ad</Typography>
      </FlexBetween>
      <img
        width = '100%'
        height = 'auto'
        alt = 'advert'
        src = 'http://localhost:3001/assets/info4.jpeg'
        style = {{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
      />
      <FlexBetween>
        <Typography color = {main}>L'Oréal</Typography>
        <Typography color = {medium}>https://www.loreal.com/en/</Typography>
      </FlexBetween>
      <Typography color = {medium} m = '0.5rem 0'>
        Your pathway to stunning and immaculate beauty.
      </Typography>
    </WidgetWrapper>
  );
};

export default AdsWidget;