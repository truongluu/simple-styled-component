import React, { useContext } from "react";
import { merge } from "lodash";

const StyledBaseContext = React.createContext();

const SimpleStyledProvider = ({ children, ...restProps }) => {
  return (
    <StyledBaseContext.Provider value={{ ...restProps }}>
      {children}
    </StyledBaseContext.Provider>
  );
};

const useStyledContext = () => useContext(StyledBaseContext);

function StyledBase(strings, restExp, props = {}) {
  if (restExp.length) {
    const processString = strings.map((item, index) => {
      if (restExp[index] && typeof restExp[index] === "function") {
        return strings[index] + restExp[index](props);
      }
      return strings[index];
    });
    return processString.join("");
  }

  return strings.join("");
}

const genClass = (len = 10) => {
  const strings = "abcdefghiklmnopqABCDEFGHIKLMNOPQ";
  const characters = "1234567890abcdefghiklmnopq";
  let genStr = "";
  let chosenStrings = strings;
  for (let i = 0; i < len; i++) {
    if (i === 5) {
      chosenStrings = characters;
      genStr += "_";
      continue;
    }
    genStr += chosenStrings.charAt(
      Math.floor(Math.random() * chosenStrings.length)
    );
  }
  return genStr;
};

StyledBase.Button = (strings, ...restProps) => {
  const buttonClass = genClass(15);

  const ButtonRender = ({ children, ...buttonRestProps }) => {
    const styledProps = useContext(StyledBaseContext);
    const stylesRender = StyledBase(
      strings,
      restProps,
      merge(styledProps, buttonRestProps)
    );
    const stylesString = `\
  .${buttonClass}{\
    ${stylesRender}
  }\
`;
    return (
      <>
        <style>{stylesString}</style>
        <button className={buttonClass} {...buttonRestProps}>
          {children}
        </button>
      </>
    );
  };
  ButtonRender.defaultProps = {
    children: "button"
  };
  return ButtonRender;
};

StyledBase.Input = (strings, ...restProps) => {
  const inputRender = ({ children, ...inputProps }) => {
    return <input {...inputProps} />;
  };
  return inputRender;
};

export { SimpleStyledProvider, useStyledContext, StyledBase as default };
