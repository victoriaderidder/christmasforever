import { Button } from "@mui/material";
import { FC } from "react";

interface HomeProps {
  setShowElement: (showList: boolean) => void;
  setShowMain: (showList: boolean) => void;
  //   answer: string[];
  //   songHandling?: any;
  //   song1?: any;
  //   song2?: any;
}

// const style = {
//   "& .MuiInputLabel-root": {
//     color: "white",
//     marginLeft: "4px",
//     opacity: "40%",
//   },

//   "& label.Mui-focused:not(.Mui-error)": {
//     color: "white",
//   },
//   "& .Mui-error": {
//     color: "#8B0000 !important",
//   },
//   "& .MuiOutlinedInput-root:not(.Mui-error)": {
//     "& fieldset": {
//       borderColor: "white",
//     },
//     "&:hover fieldset": {
//       borderColor: "white",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "white",
//     },
//   },
//   "& .Mui-error .MuiOutlinedInput-notchedOutline": {
//     borderColor: "#8B0000 !important",
//     "& fieldset": {
//       borderColor: "#8B0000 !important",
//     },
//     "&:hover fieldset": {
//       borderColor: "#8B0000 !important",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#8B0000 !important",
//     },
//   },
//   "& .MuiOutlinedInput-root:(.Mui-error)": {
//     "& fieldset": {
//       borderColor: "#8B0000 !important",
//     },
//     "&:hover fieldset": {
//       borderColor: "#8B0000 !important",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#8B0000 !important",
//     },
//   },
//   input: { color: "white" },
// };

const Home: FC<HomeProps> = ({
  setShowElement,
  setShowMain,
  //   answer,
  //   songHandling,
  //   song1,
  //   song2,
}) => {
  const handleClick = () => {
    setShowElement(false);
    setShowMain(true);
  };
  return (
    <>
      {
        <Button
          variant="text"
          //   style={{
          //     backgroundColor: "inherit",
          //     marginTop: "10px",
          //     marginLeft: "20px",
          //   }}
          onClick={handleClick}
        >
          Home
        </Button>
      }
    </>
  );
};

export default Home;
