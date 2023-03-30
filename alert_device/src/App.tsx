import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";

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
  align-items: center;
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

  return (
    <StyledApp isAlerted={isAlerted}>
      <AlertComponent alertText={isAlerted ? "Alertttt": "Ok!!!!"} />
      {isAlerted && <AttackerFeed isAlerted={isAlerted}/>}
    </StyledApp>
  );
};

export default App;
