import styled from "styled-components/native";

interface CirculeProps {
  isPay: boolean;
}

export const Container = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  width: 96%;
  height: 50px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
  border-color: #fff;
  border-width: 1px;
`;

export const Image = styled.Image`
  height: 30px;
  width: 30px;
  margin-left: 10%;
`;

export const Text = styled.Text`
  color: #ffffff;
`;

export const Circule = styled.View<CirculeProps>`
  width: 7px;
  height: 7px;
  background-color: ${(props) => (props.isPay ? "#00FF19" : "#ff0000")};
  border-radius: 100px;
`;
