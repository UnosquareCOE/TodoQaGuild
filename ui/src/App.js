import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";

const doStuff = async () => {
  const response = await fetch("http://localhost:3000/projects");
  const result = await response.json();
  console.log(result);
};

function App() {
  const [value, setValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);

  const onIncrementClick = () => {
    setValue(value + 1);
  };

  const onSetSecondValue = () => {
    setSecondValue(secondValue + 1);
    doStuff();
  };

  const onDecrementClick = () => {
    setValue(value - 1);
  };

  // useEffect(() => {
  //   doStuff();
  // }, [secondValue]);

  return (
    <div className="App">
      <p>
        Current Value: {value} - {secondValue} .
      </p>
      <button onClick={onIncrementClick}>Increment</button>
      <button onClick={onDecrementClick}>Decrement</button>

      <button onClick={onSetSecondValue}>Do refresh API</button>
    </div>
  );
}

export default App;
