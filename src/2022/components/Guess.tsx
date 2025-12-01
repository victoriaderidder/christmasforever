import { Button, TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

interface GuessProps {
    setShowElement: (showList: boolean) => void;
    answer: string[];
}

const style = {
    "& .MuiInputLabel-root": {color: 'white'},
    "& .MuiInput-underline:not(.Mui-error):after": {
        borderBottomColor: '#00873E'
    },
    "& label.Mui-focused:not(.Mui-error)": {
        color: '#00873E'
    },
    "& .MuiFormLabel-root.Mui-error": {
        color: "#D32F2F"
    },
    "& .MuiInput-underline:not(.Mui-error):before": {
        borderBottomColor: '#00873E',
    },
    "& .MuiInput-underline:hover:not(.Mui-error):before": {
        borderBottomColor: '#00873E',
    },
    "& .MuiInput-underline:hover:not(.Mui-error):after": {
        borderBottomColor: '#00873E',
    },
   "&.MuiInput-root:hover:not(.Mui-error):before" : {
    borderBottomColor: '#00873E',
   },
    input: { color: 'white' }
  }    

const Guess: FC<GuessProps> = ({ setShowElement, answer }) => {
    const [theGuess, setTheGuess] = useState('')
    const [error, setError] = useState(false);

    const compareValues = () =>  {
        const answerMap = answer.map((answer: string) => answer.toLowerCase());
        return answerMap.includes(theGuess.toLowerCase()) || theGuess.toLowerCase() === 'skip'
    }

    const handleGuess = () => {
        compareValues() ? setShowElement(false) : setError(true)
    }

    useEffect(() => {
        window.addEventListener('keydown', e => {
            e.code === "Enter" ? handleGuess() : setError(false)
        })
    })
       
    return (
        <>
        {<TextField
            id="standard"
            label="Guess"
            variant="standard"
            sx={style}
            onChange={(e) => {setTheGuess(e.target.value)}} helperText={error && 'THAT IS WRONG YOU FOOL'}
            error={error} 
        />}
        {<Button
            type="submit"
            variant="contained"
            style={{
                backgroundColor: "#00873E",
                marginLeft: "20px"
            }}
            onClick={handleGuess}>
            Guess
        </Button>}
        </>
    );
};

export default Guess;