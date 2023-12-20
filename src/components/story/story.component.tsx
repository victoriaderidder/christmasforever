import { Button } from "@mui/material";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

interface StoryProps {
  story: string;
}

const Story: FC<StoryProps> = ({ story }) => {
  return (
    <>
      {story}
      <div>
        <Button
          size="small"
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "inherit",
          }}
        >
          <FontAwesomeIcon icon={faArrowRightLong} size="lg" />
        </Button>
      </div>
    </>
  );
};

export default Story;
