import styled from "styled-components";
import React from "react";
import { colors } from "@/utils/ThemeConfig";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement> {
  textColor?: string;
  isUnderlined?: boolean;
  isTextButton?: boolean;
}

const Button = ({ ...props }: ButtonProps) => {
  if (props.isTextButton) {
    return (
      <TextButtonStyled
        onClick={props.onClick}
        textColor={props.textColor}
        isUnderlined={props.isUnderlined}
      >
        {props.children}
      </TextButtonStyled>
    );
  }
  return <ButtonStyled {...props}>{props.children}</ButtonStyled>;
};

const ButtonStyled = styled.button`
  padding: 8px 0px;
  background-color: ${colors.blue};
  color: ${colors.white};
  font-family: MarkPro;
  font-size: 16px;
  border-radius: 4px;
  border: solid 1px;
  width: 100%;
`;

const TextButtonStyled = styled.div<{
  isUnderlined?: boolean;
  textColor?: string;
}>`
  color: ${(props) => (props.textColor ? props.textColor : colors.dark)};
  text-decoration: ${(props) => (props.isUnderlined ? "underline" : "")};
  font-family: MarkPro;
  font-size: 14px;
  cursor: pointer;
`;

export default Button;
