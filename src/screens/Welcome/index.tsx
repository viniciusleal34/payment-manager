import { StatusBar } from "expo-status-bar";
import React from "react";
import bear from "../../../assets/bear.png";
import Button from "../../components/Button";
import { Container, Image, Main, Title, Text } from "./styles";

export default function Welcome({ navigation }: GlobalProps) {
  return (
    <Container>
      <StatusBar style="light" />
      <Image source={bear} />

      <Title> Bem vindo Minder!</Title>
      <Main>
        <Text>Teremos que realizar</Text>
        <Text>o primeiro cadastro.</Text>
        <Text>Preencha as informações e</Text>
        <Text>pressione em atualizar.</Text>
      </Main>
      <Button
        title="Continuar"
        onPress={() => {
          navigation.navigate("NewRegister");
        }}
      />
    </Container>
  );
}
