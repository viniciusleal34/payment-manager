import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View, StyleSheet, Text } from "react-native";
import bear from "../../../assets/bear.png";
import Button from "../../components/Button";

export default function Welcome({ navigation }: GlobalProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image style={styles.image} source={bear} />

      <Text style={styles.textTitulo}> Bem vindo Minder!</Text>
      <View style={styles.containerText}>
        <Text style={styles.text}>Teremos que realizar</Text>
        <Text style={styles.text}>o primeiro cadastro.</Text>
        <Text style={styles.text}>Preencha as informações e</Text>
        <Text style={styles.text}>pressione em atualizar.</Text>
      </View>
      <Button
        title="Continuar"
        onPress={() => {
          navigation.navigate("NewRegister");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2E2E2E",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    marginTop: 100,
    alignSelf: "center",
    width: 150,
    height: 150,
    alignContent: "flex-start",
  },
  textTitulo: {
    fontSize: 40,
    lineHeight: 40,
    marginTop: 20,
    marginBottom: 20,
    color: "#FFF",
    alignSelf: "center",
    alignContent: "center",
  },
  text: {
    fontFamily: "Montserrat_100Thin",
    fontSize: 20,
    lineHeight: 27,
    marginLeft: 20,
    color: "#FFF",
    alignSelf: "flex-start",
  },
  containerText: {
    marginBottom: 90,
  },
});
