import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Alert } from "react-native";
import { Container, Forgot, TxtForgot, Image } from "./styles";
import InputMasked from "../../components/InputMasked";
import Input from "../../components/Input";
import { Form } from "@unform/mobile";
import Button from "../../components/Button";
import getValidationError from "../../utils/getValidationError";
import { getValidationCpf } from "../../utils/getValidationCpf";
import * as Yup from "yup";
import { AuthContext } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Subscription } from "expo-modules-core";
import { Platform } from "react-native";
import { FormHandles } from "@unform/core";

interface SignProps {
  cpf: string;
  password: string;
}

export default function Login({ navigation }: GlobalProps) {
  const formRef = useRef<FormHandles | any>(null);
  const inputRef = useRef(null);
  const [rawText, setRawText] = useState();

  const { signIn } = useContext(AuthContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  const register = useCallback(async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();

        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }

        const token = (await Notifications.getExpoPushTokenAsync()).data;

        setExpoPushToken(token);
      } else {
        alert("Must use physical device for Push Notifications");
      }

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [expoPushToken]);

  useEffect(() => {
    register();
    const notificationListenerResponse =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });
    notificationListener.current = notificationListenerResponse;
    const responseListenerResponse =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    responseListener.current = responseListenerResponse;

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListenerResponse
      );
      Notifications.removeNotificationSubscription(responseListenerResponse);
    };
  }, []);

  async function handleSubmit(data: SignProps) {
    try {
      data.cpf = getValidationCpf(data.cpf);
      // Remove all previous errors
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        cpf: Yup.string().required("CPF Obrigatório").min(11, "CPF Inválido"),
        password: Yup.string().required("Senha é Obrigatória"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const resp = await signIn(data.cpf, data.password, expoPushToken);

      if (resp === 0) {
        navigation.navigate("Bem-Vindo");
      } else if (resp === 1) {
        navigation.navigate("TabBars");
      }

      // Validation passed
    } catch (err) {
      console.log(err);

      if (err instanceof Yup.ValidationError) {
        const error = getValidationError(err);
        formRef.current.setErrors(error);

        return;
      }
      Alert.alert(
        "Erro na autenticação",
        "Ocorreu um erro ao fazer login, cheque as credenciais"
      );
    }
  }

  async function loadingScreen() {
    const token = await AsyncStorage.getItem("@CodeApi:token");
    if (token) navigation.navigate("TabBars");
  }

  useEffect(() => {
    loadingScreen();
  }, []);

  return (
    <Container>
      <Image
        source={require("../../../assets/mindpay-logo-tipo-letra-branca.png")}
      />

      <Form ref={formRef} onSubmit={handleSubmit} style={{ width: "90%" }}>
        <InputMasked
          rawText={rawText}
          setRawText={setRawText}
          name="cpf"
          type="cpf"
          placeholder="Insira seu CPF"
          icon="key"
          keyboardType="numeric"
        />
        <Input
          maxLength={20}
          name="password"
          placeholder="Senha"
          secureTextEntry={true}
          icon="lock"
          password
        />
      </Form>

      <Button onPress={() => formRef.current?.submitForm()} title="LOGIN" />

      <Forgot onPress={() => navigation.navigate("Forgot")}>
        <TxtForgot>Esqueci minha senha</TxtForgot>
      </Forgot>
    </Container>
  );
}
