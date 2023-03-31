import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import styled from "styled-components";
import { Button } from 'semantic-ui-react';

const serverAddress = "http://10.10.10.81:3001";

const StyledAlert = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 2rem;
  padding-right: 2rem;
  gap: 2rem;
  padding-top: 1.5rem;
`;

const StyledText = styled.h1<{isAlerted: boolean}>`
  font-size: 6rem;
  color: ${({isAlerted}) => isAlerted ? "black" : "white"};
`;

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

const StyledImgSpidey = styled.img`
  height: 15rem;
`

const Alert: React.FC<{ isAlerted: boolean }> = ({ isAlerted }) => {
  return (
    <StyledAlert>
      <StyledText isAlerted={isAlerted}>{isAlerted ? "Threat detected!!!": "Safe!!!!"}</StyledText>
      {isAlerted && <StyledImgSpidey src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5dc41bc1-bbe2-414b-a068-2914cfe22505/d939w9s-43cefff2-ea34-4d9c-a0b7-0286be0b865a.png/v1/fill/w_1024,h_1024,strp/spidey_sense__png__by_retrodevil_d939w9s-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzVkYzQxYmMxLWJiZTItNDE0Yi1hMDY4LTI5MTRjZmUyMjUwNVwvZDkzOXc5cy00M2NlZmZmMi1lYTM0LTRkOWMtYTBiNy0wMjg2YmUwYjg2NWEucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.zsfM6JP2X3Z8jqWMy6HP2KbiiidZp3SI7zN7UxDahj8"/>}
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
      <Alert isAlerted={isAlerted} />
      {isAlerted && <AttackerFeed isAlerted={isAlerted}/>}
    </StyledApp>
  );
};

export default App;
