import React from "react";
import { Container, ButtonText } from "./styles";
import { RectButtonProperties } from "react-native-gesture-handler";

interface ButtonProps extends RectButtonProperties {
  secondary: boolean;
  title: string;
}

const Button: React.FC<ButtonProps | any> = ({ title, secondary, ...rest }) => (
  <Container secondary={secondary} {...rest}>
    <ButtonText>{title}</ButtonText>
  </Container>
);

export default Button;
