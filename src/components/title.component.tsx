import React, { FC } from "react";

interface TitleProps {
  title: string;
  plain?: boolean;
}

const Title: FC<TitleProps> = ({ title, plain = false }) => {
  const clean = plain ? title.replace(/^>\s*/, "") : title;
  const h1Style: React.CSSProperties = {
    cursor: "pointer",
    fontSize: "2.6rem",
    margin: "0 0 12px 0",
    textAlign: "center",
    fontWeight: 700,
    lineHeight: 1.05,
  };

  return (
    <>
      <h1 style={h1Style}>{plain ? clean : <u>{title}</u>}</h1>
    </>
  );
};

export default Title;
