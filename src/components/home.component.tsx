import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useAudio } from "../audio/audio.hooks";
import { AUDIO_PATHS } from "../audio/audio.utils";

const HomeIconButton = styled(IconButton)({
  position: "fixed",
  top: "5px",
  left: "5px",
  color: "white",
  // backgroundColor: "rgba(255, 255, 255, 0.1)",
  // "&:hover": {
  //   backgroundColor: "rgba(255, 255, 255, 0.2)",
  // },
  zIndex: 100,
  padding: "8px",
});

const Home: FC = () => {
  const navigate = useNavigate();
  const { stopAllAudio } = useAudio(AUDIO_PATHS);

  const handleClick = () => {
    stopAllAudio();
    navigate("/");
  };

  return (
    <HomeIconButton onClick={handleClick} aria-label="Return home">
      <FontAwesomeIcon icon={faHouse} />{" "}
    </HomeIconButton>
  );
};

export default Home;
