import React, { useState, useRef, useContext } from "react";
import { ScrollView, Alert } from "react-native";
import { Container, Image, TxtEdit, Txt } from "./styles";
import InputMasked from "../../components/InputMasked";
import Input from "../../components/Input";
import { Form } from "@unform/mobile";
import Button from "../../components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../../context/UserContext";
import { getValidationMoney } from "../../utils/getValidationMoney";
import * as Yup from "yup";
import { Load } from "../../components/Load";
import loadAnimation from "../../assets/loadinMoney.json";
import getValidationErrors from "../../utils/getValidationError";
import { FormHandles } from "@unform/core";

interface PaymentProps {
  base_salary: any;
  extra_hour: any;
  description: string;
}

export default function Payment() {
  const [money, setMoney] = useState("");
  const [initial, setInitial] = useState<any>(null);
  const [load, setLoad] = useState(false);
  const { userData, sendSalary } = useContext(AuthContext);
  const formRef = useRef<FormHandles | any>(null);

  async function handleSubmit(data:PaymentProps) {
    try {
      setLoad(true);
      data.base_salary = getValidationMoney(data.base_salary);

      if (data.extra_hour)
        data.extra_hour = getValidationMoney(data.extra_hour);

      formRef.current.setErrors({});

      setTimeout(() => {
        setLoad(false);
      }, 4000);

      if (data.base_salary != 0 && data.extra_hour) {
        const resp = await sendSalary(
          parseFloat(data.base_salary) + parseFloat(data.extra_hour),
          data.extra_hour,
          data.description
        );
        if (resp) Alert.alert("Sucesso!", "Sua requisição foi enviada");
      } else {
        const resp = await sendSalary(
          data.base_salary,
          data.extra_hour,
          data.description,
        );
        if (resp) Alert.alert("Sucesso!", "Sua requisição foi enviada");
      }
      setLoad(false);

      setInitial({
        base_salary: userData?.base_salary,
        description: "",
        extra_hour: 0,
      });
    } catch (err) {
      setLoad(false);
      if (err instanceof Yup.ValidationError) {
        const error = getValidationErrors(err);

        formRef.current?.setErrors(error);
        return;
      }

      Alert.alert(
        "Erro na Requisição",
        "Ocorreu um erro ao enviar o Pedido de pagamento"
      );
    }
  }

  return (
    <KeyboardAwareScrollView>
      <Container
      // contentContainerStyle={{ flexGrow: 1 }}
      // keyboardShouldPersistTaps="handled"
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // enabled
      >
        <Load visible={load} svgLoading={loadAnimation} />
        <Image
          source={require("../../../assets/mindpay-logo-tipo-letra-branca.png")}
        />
        <TxtEdit>Insira os seus dados de pagamento!</TxtEdit>

        <Form
          initialData={initial || userData}
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ width: "90%" }}
        >
          <Txt>Altere o salário base em Perfil</Txt>
          <InputMasked
            editable={false}
            type="money"
            name="base_salary"
            placeholder="Seu salário base"
            icon="dollar-sign"
          />
          <InputMasked
            rawText={money}
            setRawText={setMoney}
            type="money"
            name="extra_hour"
            placeholder="Hora-Extra"
            icon="dollar-sign"
          />
          <Input
            desc={true}
            style={{ height: 100 }}
            multiline={true}
            numberOfLines={5}
            maxLength={140}
            name="description"
            placeholder="Ex: Realizei hora extra no projeto..."
          />
          <Button
            onPress={() => formRef.current?.submitForm()}
            title="Enviar"
          />
        </Form>
      </Container>
    </KeyboardAwareScrollView>
  );
}
