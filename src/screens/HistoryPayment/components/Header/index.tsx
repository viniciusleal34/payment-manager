import React from "react";
import mind from "../../../../../assets/mind-logo-comprido-branco.png";

import { Container, Image, Text } from "./styles";

const Header: React.FC = () => {
  return (
    <Container>
      <Image fadeDuration={0} source={mind} />
      <Text> Histórico de pagamento</Text>
    </Container>
  );
};

export default Header;
