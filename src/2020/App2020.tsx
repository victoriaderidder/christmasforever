import { FC, useState } from "react";
import styled from "@emotion/styled";
import ScavengeGrid from "./scavenge.component";

/*
 * The original implementation can be found here:
 * https://victoriaderidder.github.io/achristmaschallenge/V1%20(2020)/page1.html
 * This component is a React recreation.
 */

const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  text-align: center;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 250px;
`;

const StyledText = styled.div`
  font-size: 2.5em;
  font-weight: bold;
`;

const Arrow = styled.span`
  cursor: pointer;
`;

const App2020: FC = () => {
  const [index, setIndex] = useState(0);

  const storyArray: string[] = [
    "hello, lizzy.",
    "i suppose you're wondering why i've called you here today.",
    "well,",
    "i think you'll find",
    "that there's a perfectly good reason for that.",
    "you see,",
    "today just so happens",
    "to be christmas.",
    "and you are on",
    "...",
    "..........",
    "..........................................................................",
    "...a journey...",
    "...of a sort.",
    "so this christmas,",
    "let's make this scavenger hunt",
    "just a little bit more",
    "virtual.",
    "good luck!",
    "you'll need it.",
  ];

  const increment = () => {
    index <= storyArray?.length - 1 && setIndex(index + 1);
  };

  return (
    <main className="main2020">
      <PageContainer>
        {index <= storyArray?.length - 1 ? (
          <ContentWrapper>
            <StyledText>
              <div className="story">{storyArray[index]}</div>{" "}
              <Arrow onClick={increment}>==&gt;</Arrow>
            </StyledText>
          </ContentWrapper>
        ) : (
          <ScavengeGrid />
        )}
      </PageContainer>
    </main>
  );
};

export default App2020;
