import { styled } from '@mui/system'
import { Box } from '@mui/material';

// style component passing in reusable css properties

const FlexBetween = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
});

export default FlexBetween;