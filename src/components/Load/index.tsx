import React from "react";
import { Modal } from "react-native";
import { Container, Animation } from "./styles";

interface LoadProps {
  visible: boolean;
  svgLoading: any;
}

export function Load({ visible, svgLoading }: LoadProps) {
  return (
    <Modal visible={visible}>
      <Container>
        <Animation source={svgLoading} autoPlay loop />
      </Container>
    </Modal>
  );
}
