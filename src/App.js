import React from "react";
import SimpleStyledComponent, {
  SimpleStyledProvider
} from "./SimpleStyledComponent";
import "./styles.css";

const SimpleButton = SimpleStyledComponent.Button`
  font-weight: bold;
  color: ${(props) => props.theme?.textColor};
  font-size: ${(props) => props.theme?.fontSize};
  font-weight: ${(props) => props.theme?.fontWeight}
`;

const SimpleButton1 = SimpleStyledComponent.Button`
  font-weight: bold;
  color: ${(props) => props.theme?.textColor};
  font-size: ${(props) => props.theme?.fontSize};
  font-weight: ${(props) => props.theme?.fontWeight}
`;

const SimpleInput = SimpleStyledComponent.Input`
`;

export default function App() {
  return (
    <SimpleStyledProvider
      theme={{ textColor: "blue", fontSize: "20px", fontWeight: "bold" }}
    >
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <SimpleButton onClick={() => alert(1)}>Button 1</SimpleButton>
        <br />
        <SimpleButton1 theme={{ fontSize: "35px" }} onClick={() => alert(1)}>
          Button 2
        </SimpleButton1>
        <br />
        <SimpleInput />
      </div>
    </SimpleStyledProvider>
  );
}
