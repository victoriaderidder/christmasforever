import React, { FC } from 'react';
import Guess from './Guess';
import stone from '../assets/img/stone.png'


interface StoneProps {
  setShowElement: (showList: boolean) => void;
    answer: string[];
}

const Stone: FC<StoneProps> = ({ setShowElement, answer }) => {
  return (
    <>
        <img src={stone} id='stone' alt='stone' />
        <p>{<Guess setShowElement={setShowElement} answer={answer} />}</p>
    </>
  );
};

export default Stone;