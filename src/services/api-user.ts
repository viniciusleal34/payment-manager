import { AxiosError } from "axios";
import { Alert } from "react-native";
import { mutate } from "swr";
import api from "../factory/api";

export async function postSendSalary(
  amount: number,
  extra_hour: string = "0",
  description: string = "Pagamento Mensal"
) {
  try {
    await api.post("/request", {
      amount,
      extra_hour,
      description,
    });
  } catch (err: AxiosError | any) {
    Alert.alert(err.data.message);
    return err;
  }
}

export async function patchUpdateImage(image: any) {
  try {
    await api.patch("/user/profile/", image);
    Alert.alert("Sucesso", "Atualizado com sucesso!");
    mutate("/user");
    return true;
  } catch (err: AxiosError | any) {
    Alert.alert("Error", "Erro ao alterar imagem");
    return false;
  }
}

export async function putUpdateUser(user:any) {
  try {
    await api.put("/register", user);
    Alert.alert("Sucesso", "Cadastrado com sucesso!");
    return true;
  } catch (err: AxiosError | any) {
    Alert.alert("Error", "Erro ao cadastrar");
    return false;
  }
}

export async function getLoadingUser(image:any) {
  try {
    await api.get("/user", image);
    return true;
  } catch (err: AxiosError | any) {
    Alert.alert("Error", "Erro ao cadastrar");
    return false;
  }
}