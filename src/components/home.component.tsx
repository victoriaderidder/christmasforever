import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useAudio } from "../audio/audio.hooks";
import { AUDIO_PATHS } from "../audio/audio.utils";

const HomeIconButton = styled(IconButton)<{ is2020route?: boolean }>(
  ({ is2020route }) => ({
    position: "fixed",
    top: "5px",
    left: "5px",
    color: is2020route ? "black" : "white",
    zIndex: 100,
    padding: "8px",
  })
);

const Home: FC = () => {
  const navigate = useNavigate();
  const { stopAllAudio } = useAudio(AUDIO_PATHS);
  const location = useLocation();
  const is2020Route = location.pathname.includes("2020");

  const handleClick = () => {
    stopAllAudio();
    navigate("/");
  };

  return (
    <HomeIconButton
      onClick={handleClick}
      aria-label="Return home"
      is2020route={is2020Route}
    >
      <FontAwesomeIcon icon={faHouse} />{" "}
    </HomeIconButton>
  );
};

export default Home;
