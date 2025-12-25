import { FC, useEffect, useRef, useState } from "react";
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
    zIndex: 3000,
    padding: "8px",
  })
);

const Home: FC = () => {
  const navigate = useNavigate();
  const { stopAllAudio } = useAudio(AUDIO_PATHS);
  const location = useLocation();
  const is2020Route = location.pathname.includes("2020");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onSpotlightUpdate = (
      event: Event
    ) => {
      const custom = event as CustomEvent<{
        active: boolean;
        x: number;
        y: number;
        radius: number;
      }>;
      const detail = custom.detail;
      if (!detail) return;

      if (!detail.active) {
        setIsVisible(true);
        return;
      }

      const el = buttonRef.current;
      if (!el) {
        setIsVisible(false);
        return;
      }

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = detail.x - cx;
      const dy = detail.y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setIsVisible(distance <= detail.radius);
    };

    window.addEventListener("spotlight:update", onSpotlightUpdate);
    return () => {
      window.removeEventListener("spotlight:update", onSpotlightUpdate);
    };
  }, []);

  const handleClick = () => {
    stopAllAudio();
    navigate("/");
  };

  return (
    <HomeIconButton
      ref={buttonRef}
      onClick={handleClick}
      aria-label="Return home"
      is2020route={is2020Route}
      disableRipple
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <FontAwesomeIcon icon={faHouse} />{" "}
    </HomeIconButton>
  );
};

export default Home;
