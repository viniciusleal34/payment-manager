import React from "react";
import { Modal } from "react-native";
import { Container, Animation } from "./styles";
import loadAnimation from "../../../assets/bear.json";

interface loadingProps {
  visible: boolean;
}

const Load: React.FC<loadingProps> = ({ visible }) => {
  return (
    <Modal visible={visible}>
      <Container>
        <Animation source={loadAnimation} autoPlay loop />
      </Container>
    </Modal>
  );
};

export default Load;
