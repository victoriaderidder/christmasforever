import * as React from "react";
import Button from "@mui/material/Button";
import { default as MUIMenu } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect } from "react";
import { useAudio } from "../../audio/audio.hooks";
import { AUDIO_PATHS } from "../../audio/audio.utils";

interface MenuProps {
  bgColor: string;
  items: any[];
  setIndex: any;
  showStory: any;
  setBgColor: any;
}

const Menu: FC<MenuProps> = ({
  bgColor,
  items,
  setIndex,
  showStory,
  setBgColor,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [clickedMenu, setClickedMenu] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { stopAllAudio, audioRefs, playSong } = useAudio(AUDIO_PATHS);

  const style = {
    "& .MuiPaper-root": {
      backgroundColor: bgColor,
      color: "white",
      width: "180px",
      marginLeft: "-15px",
      "& :hover": {
        fontWeight: "bold",
        backgroundColor: bgColor,
      },
    },
  };

  const handleItemClick = (index: number) => {
    showStory();
    setBgColor("#282c34");
    setIndex(items[index]);
    setClickedMenu(true);
    handleClose();
  };

  useEffect(() => {
    const cleanup = async () => {
      await stopAllAudio();
      await playSong(audioRefs.krampus.current);
    };
    if (audioRefs.krampus.current.paused && !clickedMenu) {
      cleanup();
    }
  }, [clickedMenu]);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ float: "left", marginLeft: "50px", marginTop: "3px" }}
        disableRipple
      >
        <FontAwesomeIcon icon={faBars} color="white" fontSize={"2rem"} />
      </Button>
      <MUIMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={style}
      >
        <MenuItem onClick={() => handleItemClick(0)}>Beginnings</MenuItem>
        <MenuItem onClick={() => handleItemClick(1)}>* Shopping List</MenuItem>
        <MenuItem onClick={() => handleItemClick(2)}>Stone Cypher</MenuItem>
        <MenuItem onClick={() => handleItemClick(3)}>Captcha</MenuItem>
        <MenuItem onClick={() => handleItemClick(4)}>* Riddles Three</MenuItem>
        <MenuItem onClick={() => handleItemClick(5)}>Cookie Clicker</MenuItem>
        <MenuItem onClick={() => handleItemClick(6)}>
          * Cookie Clicker 2.0
        </MenuItem>
        <MenuItem onClick={() => handleItemClick(7)}>
          Final Combination
        </MenuItem>
        <MenuItem onClick={() => handleItemClick(8)}>The End</MenuItem>
      </MUIMenu>
    </div>
  );
};

export default Menu;
