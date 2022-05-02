import React from "react";
import { ImageSourcePropType } from "react-native";

import { Container, Image, Circule, Text } from "./styles";

interface CardProps {
  item: any;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: any;
  receipt: ImageSourcePropType;
  isPay: boolean;
}

const Card: React.FC<CardProps> = ({
  item,
  setImage,
  setModalVisible,
  receipt,
  isPay,
}) => {
  return (
    <Container
      onPress={() => {
        if (item.receipt_location != null) {
          setModalVisible(true);
          setImage(item.item.receipt_location);
        }
      }}
    >
      <Image
        fadeDuration={0}
        style={{ height: 30, width: 30, marginLeft: "10%" }}
        source={receipt}
      />
      <Text>{item.created_at}</Text>
      <Circule isPay={isPay} />
    </Container>
  );
};

export default Card;
