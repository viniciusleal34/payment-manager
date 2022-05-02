import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "../config/baseUrl";
import React from "react";

const API = () => {
  const api = axios.create({ baseURL: baseUrl.URL });

  api.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem("@CodeApi:token");

    const headerConfig = config;
    if (token) headerConfig.headers["Authorization"] = `${token}`;

    return headerConfig;
  });

  return api;
};

export default API();
