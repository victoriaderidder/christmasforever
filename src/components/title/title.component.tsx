import React, { FC } from "react";

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return (
    <>
      <h1 style={{ cursor: "pointer" }}>
        <u>{title}</u>
      </h1>
    </>
  );
};

export default Title;
