import React from "react";
import SimpleStyledComponent, {
  SimpleStyledProvider
} from "./SimpleStyledComponent";
import "./styles.css";

const SimpleButton = SimpleStyledComponent.Button`
  color: ${(props) => props.theme?.textColor};
  border: 1px solid red;
  font-style: italic;
`;

const SimpleInput = SimpleStyledComponent.Input`
`;

export default function App() {
  return (
    <SimpleStyledProvider theme={{ textColor: "red" }}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <SimpleButton onClick={() => alert(1)}>Hello fff</SimpleButton>
        <br />
        <SimpleInput />
      </div>
    </SimpleStyledProvider>
  );
}
