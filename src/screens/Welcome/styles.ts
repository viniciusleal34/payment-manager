import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #2e2e2e;
  justify-content: flex-start;
  align-items: center;
`;

export const Image = styled.Image`
  margin-top: 100px;
  align-self: center;
  width: 150px;
  height: 150px;
  align-content: flex-start;
`;

export const Main = styled.View`
  margin-bottom: 90;
`;

export const Title = styled.Text`
  font-size: 40px;
  line-height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  align-self: center;
  align-content: center;
`;

export const Text = styled.Text`
  font-family: "Montserrat_100Thin";
  font-size: 20px;
  line-height: 27px;
  margin-left: 20px;
  color: #fff;
  align-self: flex-start;
`;
