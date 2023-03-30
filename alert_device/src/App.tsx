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



//create your forceUpdate hook
function useForceUpdate(){
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // A function that increment 👆🏻 the previous state like here 
  // is better than directly setting `setValue(value + 1)`
}

const StyledImage = styled.img`
  filter: hue-rotate(-45deg);

`

const AttackerFeed: React.FC<{isAlerted: boolean}> = ({isAlerted}) => {
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    forceUpdate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAlerted])
  return <StyledImage src={serverAddress + "/img"} alt="Image" />
}


const AlertComponent: React.FC<{ alertText: string }> = ({ alertText }) => {
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
      <AlertComponent alertText={isAlerted ? "Alertttt": "Ok!!!!"} />
      {isAlerted && <AttackerFeed isAlerted={isAlerted}/>}
    </StyledApp>
  );
};

export default App;
