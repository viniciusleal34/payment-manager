import styled from "styled-components/native";
import LottieView from "lottie-react-native";


export const Container = styled.Modal`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #2e2e2e;
`;

export const Animation = styled(LottieView)`
    background-color: transparent;
    width: 200px;
    height: 200px
`;