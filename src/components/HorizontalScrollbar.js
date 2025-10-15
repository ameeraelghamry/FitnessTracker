import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import BodyPart from './BodyPart';

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <button className="left-arrow" onClick={() => scrollPrev()} aria-label="scroll left">
      <KeyboardArrowLeft fontSize="inherit" />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <button className="right-arrow" onClick={() => scrollNext()} aria-label="scroll right">
      <KeyboardArrowRight fontSize="inherit" />
    </button>
  );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart }) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box key={item} itemId={item} title={item} sx={{ mx: '40px' }}>
          <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;
