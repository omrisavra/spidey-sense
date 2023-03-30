import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import styled from 'styled-components';

const serverAddress = 'http://localhost:3001/notify';

const StyledAlert = styled.div<{isAlerted: boolean}>`
  height: 100vh;
  background-color: ${({isAlerted}) => isAlerted ? "red" : "green"};
  display: flex;  
  justify-content: center; 
  align-items: center;
`

const StyledText = styled.h1`
  
`

const AlertComponent: React.FC<{isAlerted: boolean}> = ({isAlerted}) => {
  useEffect(() => {
    if (!isAlerted) return;
    console.log("sending alert")
    navigator.vibrate([
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
    ]);
  }, [isAlerted])
  return <StyledAlert isAlerted={isAlerted}><StyledText>{isAlerted ? "alertt!!!!!": "okkk!"}</StyledText></StyledAlert>
}

const App = () => {
  const [isAlerted, setIsAlerted] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      const notifyServerResponse = await axios.get(serverAddress);
      const alert = notifyServerResponse.data === "true";
      setIsAlerted(alert);
    }, 100);
  }, [])

  return <AlertComponent isAlerted={isAlerted}/>;
};

export default App;
