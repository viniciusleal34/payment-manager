import { AxiosResponse } from "axios";
import { Alert } from "react-native";
import api from "../factory/api";
import { UserProps } from "../interfaces/User";

interface ResponseProps extends AxiosResponse {
  data: {
    token: string;
    user: UserProps;
  };
}

export async function postSignIn(
  cpf: string,
  password: string,
  token_user: string
) {
  try {
    const response: ResponseProps = await api.post("/login", {
      cpf,
      password,
      token_user,
    });
    return response.data;
  } catch (err) {
    Alert.alert("Credenciais inválidas");
    return false;
  }
}

export async function putUpdatePassword(email: string, password: string) {
  try {
    await api.put("pass/updatePassword", {
      email,
      password,
    });
    Alert.alert("Sucesso", "Alterado com sucesso");
    return true;
  } catch (err) {
    Alert.alert("Não foi possivel atualizar");
    return false;
  }
}

export async function postResetPassword(code: string, email: string) {
  try {
    await api.post("pass/resetPassword", {
      code,
      email,
    });
    Alert.alert("Sucesso", "Alterado com sucesso");
    return true;
  } catch (err) {
    Alert.alert("Credenciais inválidas");
    return false;
  }
}

export async function putLogout(userData: UserProps | null) {
  try {
      await api.put("/register", {
        ...userData,
        expoPushToken: null,
      });
    return true;
  } catch (err) {
    return false;
  }
}


export async function postForgotPassword(email:string) {
  try {
    await api.post("pass/forgotPassword", {
      email: email,
    });
    return true;
  } catch (err) {
    Alert.alert("Ops aconteceu um erro!");
    return false;
  }
}