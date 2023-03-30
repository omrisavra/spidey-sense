import React, { useEffect, useState } from 'react';
import './App.css';

const serverAddress = "http://localhost:3001/notify";

const App = () => {
  const [isAlerted, setIsAlerted] = useState(false);

  useEffect(() => {
    setInterval(async () => {
      const notifyServerResponse = await fetch(serverAddress);
      console.log(notifyServerResponse.body)
      setIsAlerted(true)
    }, 1_000)
  }, [])

  return (
    <div className="App">
      {isAlerted ? "Alert!!!!!!": "Ok"}
    </div>
  );
}

export default App;
