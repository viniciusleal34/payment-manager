import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #2e2e2e;
  justify-content: center;
  align-items: center;
  min-width: 100%;
  max-height: 100%;
  padding-bottom: 40px;
`;

export const Image = styled.Image`
  align-self: center;
  width: 150px;
  height: 150px;
  align-content: flex-start;
  resize-mode: contain;
`;

export const Forgot = styled.TouchableOpacity`
  margin-top: 15px;
  background-color: #2e2e2e;
  align-items: center;
`;
export const TxtForgot = styled.Text`
  font-family: "Montserrat_100Thin";
  font-size: 15px;
  line-height: 21px;
  color: #fff;
`;
