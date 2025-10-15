import React from 'react';
import { Stack, Typography } from '@mui/material';

const BodyPart = ({ item, bodyPart, setBodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
        borderTop: isSelected ? '4px solid #FF2625' : '4px solid transparent',
        background: '#fff',
        borderBottomLeftRadius: '20px',
        width: '270px',
        height: '282px',
        cursor: 'pointer',
        gap: '24px',
      }}
      onClick={() => setBodyPart(item)}
      role="button"
    
    >
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
