import React, { FC } from 'react';
import Guess from './Guess';
import captcha from '../assets/img/captcha.jpeg'


interface CaptchaProps {
  setShowElement: (showList: boolean) => void;
  answer: string[];
}

const Captcha: FC<CaptchaProps> = ({ setShowElement, answer }) => {
  return (
    <>
    <p>"What's wrong with this picture?"</p>
      <img src={captcha} id='captcha' alt='captcha' />

    <p>{<Guess setShowElement={setShowElement} answer={answer} />}</p>
    </>
  );
};

export default Captcha;