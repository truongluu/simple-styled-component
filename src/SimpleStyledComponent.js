import React, { useContext } from "react";

const StyledBaseContext = React.createContext();

const SimpleStyledProvider = ({ children, props = {} }) => {
  return (
    <StyledBaseContext.Provider value={{ ...props }}>
      {{ children }}
    </StyledBaseContext.Provider>
  );
};

const useStyledContext = () => useContext(StyledBaseContext);

const withStyled = (Component) => {
  const ButtonWithStyled = function (props) {
    console.log("props outside consumer", props);
    return (
      <StyledBaseContext.Consumer>
        {(propsFromStyledProvider) => {
          console.log("props inside consumer", propsFromStyledProvider);
          return <Component {...props} {...propsFromStyledProvider} />;
        }}
      </StyledBaseContext.Consumer>
    );
  };
  return ButtonWithStyled;
};

function StyledBase(strings, restExp) {
  const props = {
    theme: { textColor: "#fff", bgColor: "#000", fontStyle: "italic" }
  };
  if (restExp.length) {
    let chosenArr = restExp;
    if (restExp.length < strings.length) {
      chosenArr = strings;
    }
    const processString = chosenArr.map((item, index) => {
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
    if (len === 5) {
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
  const stylesRender = StyledBase(strings, restProps);

  const stylesString = `\
  .${buttonClass}{\
    ${stylesRender}
  }\
`;

  const ButtonRender = ({ children, ...buttonRestProps }) => {
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
  return withStyled(ButtonRender);
};

StyledBase.Input = ({ children }) => {
  const renderHtml = <input />;
  return renderHtml;
};

export { SimpleStyledProvider, useStyledContext, StyledBase as default };
