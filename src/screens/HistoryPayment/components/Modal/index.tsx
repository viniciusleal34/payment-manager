import React from "react";
import { Modal, ModalProps } from "react-native";
import baseUrl from "../../../../config/baseUrl";

import { Container, Button, ButtonText, Image } from "./styles";

interface ModalTypes extends ModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalVisible: boolean;
  image: any;
}

const ModalPayment: React.FC<ModalTypes> = ({
  setModalVisible,
  modalVisible,
  image,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Container>
        <Image source={{ uri: `${baseUrl.URL}/media/${image}` }} />
        <Button onPress={() => setModalVisible(false)}>
          <ButtonText>Fechar</ButtonText>
        </Button>
      </Container>
    </Modal>
  );
};

export default ModalPayment;
