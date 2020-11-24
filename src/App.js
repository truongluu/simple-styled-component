import React from "react";
import SimpleStyledComponent from "./SimpleStyledComponent";
import "./styles.css";

const SimpleButton = SimpleStyledComponent.Button`
  color: ${(props) => props.theme.textColor};
  border: 1px solid red;
  font-style: italic;
`;

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <SimpleButton onClick={() => alert(1)}>Hello fff</SimpleButton>
    </div>
  );
}
