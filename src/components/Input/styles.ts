import styled, { css } from "styled-components/native";
import FeatherIcon from "react-native-vector-icons/Feather";

interface InputProps {
  isErrored?: boolean;
  isFocused?: boolean;
  editable?: boolean;
  desc?: boolean;
}

interface IconProps {
  isField?: boolean;
  editable?: boolean;
  isFocused?: boolean;
}

export const Container = styled.View<InputProps>`
  padding: 0 15px;
  height: 50px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  border-bottom-color: #a74f4f;
  border-bottom-width: 1;
  margin-top: 20px;

  ${(props) =>
    props.isErrored &&
    css`
      border-bottom-color: #c53030;
      border-bottom-width: 1;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-width: 1;
      border-bottom-color: #fff;
    `}

    ${(props) =>
    props.editable == false &&
    css`
      border-bottom-width: 0;
    `}

    ${(props) =>
    props.desc &&
    css`
      height: 100px;
    `}
`;

export const TextInput = styled.TextInput.attrs<InputProps>({
  placeholderTextColor: "rgba(255,255,255,0.8)",
})`
  flex: 1;
  height: 100px;
  font-family: "Montserrat_100Thin";
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 5px;
  color: #666360;
  ${(props) =>
    props.isField &&
    css`
      color: #a74f4f;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      color: #fff;
    `}
    ${(props) =>
    props.editable == false &&
    css`
      color: #a74f4f;
    `}
`;
