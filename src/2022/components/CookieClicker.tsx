import React, { FC } from 'react';
import cookie from '../assets/img/cookie.png'


interface CookieClickerProps {
  title?: string;
  subtitle?: string;
}

const CookieClicker: FC<CookieClickerProps> = ({ title, subtitle }) => {
  return (
    <>
      <img src={cookie} id='cookie' alt='cookie' unselectable="on" />
    </>
  );
};

export default CookieClicker;