import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #2e2e2e;
  justify-content: flex-start;
  align-items: center;
  padding-top: 15%;
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 20px;
  width: 90%;
  height: 50px;
  background-color: #d52247;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: "Montserrat_100Thin";
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 21px;
  color: #ffffff;
`;

export const Image = styled.Image`
  height: 80%;
  width: 90%;
  resize-mode: contain;
`;
