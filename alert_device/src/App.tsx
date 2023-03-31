import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";
import { Button } from 'semantic-ui-react';

const serverAddress = "http://10.10.10.49:3001";

const StyledAlert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.h1``;

const StyledApp = styled.div<{ isAlerted: boolean }>`
  height: 100vh;
  width: 100vw;
  background-color: ${({ isAlerted }) => (isAlerted ? "red" : "green")};
  display: flex;
  flex-direction: column;
`

const StyledImage = styled.img`
  filter: hue-rotate(-45deg);

`

const AttackerFeed: React.FC<{isAlerted: boolean}> = ({isAlerted}) => {
  const [randomNumber, setRandomNumber] = useState(0)
  setInterval(async () => {
    setRandomNumber(Math.floor(Math.random() * 1000) + 1)
  }, 1_000)
  return <StyledImage src={serverAddress + "/img?generated=" + randomNumber} alt="Image" />
}


const Alert: React.FC<{ alertText: string }> = ({ alertText }) => {
  return (
    <StyledAlert>
      <StyledText>{alertText}</StyledText>
    </StyledAlert>
  );
};

const App = () => {
  const [isAlerted, setIsAlerted] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      const notifyServerResponse = await axios.get(serverAddress + "/notify");
      const alert = notifyServerResponse.data === "true";
      setIsAlerted(alert);
    }, 100);
  }, []);

  useEffect(() => {
    if (isAlerted) {
      setTimeout(() => {
        navigator.vibrate([
          100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100,
          30, 100,
        ]);
      }, 50);
    }
  }, [isAlerted]);
  
  return (
    <StyledApp isAlerted={isAlerted}>
    {false && (
        <Button
          onClick={() => {
            navigator.vibrate([
              100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30,
              100, 30, 100,
            ]);
          }}
        />
      )}
      <Alert alertText={isAlerted ? "Spideyyyy sense something!!!": "Safe!!!!"} />
      {isAlerted && <AttackerFeed isAlerted={isAlerted}/>}
    </StyledApp>
  );
};

export default App;
