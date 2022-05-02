import React, { useRef, useContext, useState } from "react";
import { Container, TxtBtn } from "./styles";
import Button from "../../components/Button";
import { Alert } from "react-native";
import { Form } from "@unform/mobile";
import Input from "../../components/Input";
import { AuthContext } from "../../context/UserContext";
import loadAnimation from "../../assets/reset.json";
import { Load } from "../../components/Load";
import { FormHandles } from "@unform/core";

interface ResetPassProps {
  token: string;
  confirm: string;
}

export default function ResetPass({ navigation }: GlobalProps) {
  const formRef = useRef<FormHandles | any>(null);
  const [load, setLoad] = useState(false);
  const { reset, updatePassword } = useContext(AuthContext);

  const emailUser = navigation.getParam("Email");

  async function handleSubmit(data: ResetPassProps) {
    try {
      setLoad(true);

      const resp = await reset(emailUser, data.token);

      if (resp === true) {
        const response = await updatePassword(emailUser, data.confirm);
        if (response == true) {
          Alert.alert("Nova Senha Criada");
          navigation.navigate("Login");
        }
      }
      setLoad(false);

      // Validation passed
    } catch (err) {
      setLoad(false);

      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao recuperar a senha"
      );
    }
  }

  return (
    <Container>
      <Load visible={load} svgLoading={loadAnimation} />
      <TxtBtn>Insira as Informações</TxtBtn>

      <Form onSubmit={handleSubmit} ref={formRef} style={{ width: "90%" }}>
        <Input name="token" placeholder="Código de recuperação" icon="key" />
        <Input
          name="confirm"
          placeholder="Nova Senha"
          password
          secureTextEntry={true}
          icon="lock"
        />
      </Form>

      <Button onPress={() => formRef.current?.submitForm()}>Criar Senha</Button>
    </Container>
  );
}
