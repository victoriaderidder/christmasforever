import { Button, TextField } from "@mui/material";
import { FC, useEffect, useRef, useState } from "react";
import { useAudio } from "../audio/audio.hooks";
import { AUDIO_PATHS } from "../audio/audio.utils";

interface GuessProps {
  setShowElement: (showList: boolean) => void;
  answer: string[];
  song?: any;
  previousSong?: any;
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

const Guess: FC<GuessProps> = ({
  setShowElement,
  answer,
  song,
  previousSong,
}) => {
  const [theGuess, setTheGuess] = useState("");
  const [error, setError] = useState(false);
  const { playSong } = useAudio(AUDIO_PATHS);
  const theGuessRef = useRef(theGuess);
  const answerRef = useRef(answer);
  const songRef = useRef(song);
  const previousSongRef = useRef(previousSong);
  const setShowElementRef = useRef(setShowElement);
  const playSongRef = useRef(playSong);

  const compareValues = () => {
    const answerMap = answer.map((answer: string) => answer.toLowerCase());
    return (
      answerMap.includes(theGuess.toLowerCase()) ||
      theGuess.toLowerCase() === "skip"
    );
  };

  const handleEnd = () => {
    song && previousSong && playSong(song, previousSong);
    setShowElement(true);
  };

  const handleGuess = () => {
    compareValues() === true ? handleEnd() : setError(true);
  };

  useEffect(() => {
    theGuessRef.current = theGuess;
  }, [theGuess]);

  useEffect(() => {
    answerRef.current = answer;
  }, [answer]);

  useEffect(() => {
    songRef.current = song;
    previousSongRef.current = previousSong;
  }, [song, previousSong]);

  useEffect(() => {
    setShowElementRef.current = setShowElement;
  }, [setShowElement]);

  useEffect(() => {
    playSongRef.current = playSong;
  }, [playSong]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Enter") {
        const normalizedAnswers = answerRef.current.map((a) => a.toLowerCase());
        const guess = theGuessRef.current.toLowerCase();
        const isCorrect = normalizedAnswers.includes(guess) || guess === "skip";

        if (isCorrect) {
          const nextSong = songRef.current;
          const prevSong = previousSongRef.current;
          nextSong && prevSong && playSongRef.current(nextSong, prevSong);
          setShowElementRef.current(true);
        } else {
          setError(true);
        }

        return;
      }

      setError(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

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
