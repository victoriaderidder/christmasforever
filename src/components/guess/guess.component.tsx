import { Button, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface GuessProps {
  setShowElement: (showList: boolean) => void;
  answer: string[];
}

const style = {
  "& .MuiInputLabel-root": {
    color: "white",
    marginLeft: "4px",
    opacity: "40%",
  },

  "& label.Mui-focused:not(.Mui-error)": {
    color: "white",
  },
  "& .Mui-error": {
    color: "#8B0000 !important",
  },
  "& .MuiOutlinedInput-root:not(.Mui-error)": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "& .Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#8B0000 !important",
    "& fieldset": {
      borderColor: "#8B0000 !important",
    },
    "&:hover fieldset": {
      borderColor: "#8B0000 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8B0000 !important",
    },
  },
  "& .MuiOutlinedInput-root:(.Mui-error)": {
    "& fieldset": {
      borderColor: "#8B0000 !important",
    },
    "&:hover fieldset": {
      borderColor: "#8B0000 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8B0000 !important",
    },
  },
  input: { color: "white" },
};

const Guess: FC<GuessProps> = ({ setShowElement, answer }) => {
  const [theGuess, setTheGuess] = useState("");
  const [error, setError] = useState(false);

  const compareValues = () => {
    const answerMap = answer.map((answer: string) => answer.toLowerCase());
    return (
      answerMap.includes(theGuess.toLowerCase()) ||
      theGuess.toLowerCase() === "skip"
    );
  };

  const handleGuess = () => {
    compareValues() ? setShowElement(true) : setError(true);
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e.code === "Enter" ? handleGuess() : setError(false);
    });
  });

  return (
    <>
      {
        <TextField
          id="standard"
          label="Guess"
          variant="outlined"
          sx={style}
          onChange={(e) => {
            setTheGuess(e.target.value);
          }}
          helperText={error && "THAT IS WRONG YOU FOOL"}
          error={error}
          autoComplete="off"
        />
      }
      {
        <Button
          type="submit"
          variant="contained"
          style={{
            backgroundColor: "inherit",
            marginTop: "10px",
            marginLeft: "20px",
          }}
          onClick={handleGuess}
        >
          Guess
        </Button>
      }
    </>
  );
};

export default Guess;
