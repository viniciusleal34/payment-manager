import React, { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useApi from "../hooks/useApi";
import { mutate } from "swr";
import {
  getLoadingUser,
  patchUpdateImage,
  postSendSalary,
  putUpdateUser,
} from "../services/api-user";
import {
  postForgotPassword,
  postResetPassword,
  postSignIn,
  putLogout,
  putUpdatePassword,
} from "../services/api-auth";
import { UserProps } from "../interfaces/User";



interface AuthContextData {
  userData: UserProps | null;
  setUserData: React.Dispatch<React.SetStateAction<UserProps | null>>;
  sendSalary(
    amount: number,
    extra_hour: string,
    description: string
  ): Promise<boolean>;
  updateImage(image: any): Promise<boolean>;
  updateUser(data: UserProps): Promise<boolean>;
  signIn(
    cpf: string,
    password: string,
    expoPushToken: string
  ): Promise<number | boolean>;
  forgot(email: string): Promise<boolean>;
  reset(email: string, token: string): Promise<boolean>;
  loadingUser(image: any): Promise<boolean>;
  updatePassword(email: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProvider {
  children: any;
}

const AuthProvider = ({ children }: AuthProvider) => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  const { data } = useApi("/user");

  const signIn = useCallback(
    async ({ cpf, password, expoPushToken }) => {
      const response = await postSignIn(cpf, password, expoPushToken);
      if (response != false) {
        const { token, user } = response;

        await AsyncStorage.multiSet([["@CodeApi:token", token]]);
        delete user.password;

        setUserData(user);
        if (!user.finished_registration) return 0;
        return 1;
      }
      return false;
    },
    [userData]
  );

  const updateUser = useCallback(
    async (data: UserProps) => {
      if (data.password == "") {
        delete data.password;
      }
      setUserData({ ...userData, ...data });
      const resp = await putUpdateUser(data);
      return resp;
    },
    [userData]
  );

  const updateImage = useCallback(async (image) => {
    const resp = await patchUpdateImage(image);
    return resp;
  }, []);

  useEffect(() => {
    if (data) {
      delete data.password;
      setUserData(data);
    }
  }, [data]);

  const loadingUser = useCallback(async (image) => {
    const resp = await getLoadingUser(image);
    return resp;
  }, []);

  const sendSalary = useCallback(
    async (
      amount,
      extra_hour: string = "0",
      description: string = "Pagamento Mensal"
    ) => {
      await postSendSalary(amount, extra_hour, description);
      return true;
    },
    []
  );

  const logout = useCallback(async () => {
    await putLogout(userData);
    await AsyncStorage.removeItem("@CodeApi:token");
  }, []);

  const forgot = useCallback(async ({ email }) => {
    if (email) {
      const resp = await postForgotPassword(email);
      return resp;
    }

    return false;
  }, []);

  const reset = useCallback(async ({ email, token }) => {
    const resp = await postResetPassword(token, email);
    return resp;
  }, []);

  const updatePassword = useCallback(async ({ email, password }) => {
    const resp = await putUpdatePassword(email, password);
    return resp;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        updatePassword,
        reset,
        forgot,
        signIn,
        updateUser,
        updateImage,
        loadingUser,
        sendSalary,
        logout,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
