import { Button } from '@mui/material';
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons'

interface StoryProps {
  story: string;
  bgColor?: boolean
}

const Story: FC<StoryProps> = ({ story, bgColor }) => {
  return (
    <>
      {story}
      <div>        
        <Button
            size="small"
            variant="contained"
            style={{
                color: "white",
                backgroundColor: bgColor ? '#C30F16' : 'rgb(40, 44, 52)',
            }}>
            <FontAwesomeIcon icon={faArrowRightLong} size="lg" />
        </Button>
        </div>
    </>
  );
};

export default Story;