import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import receipt from "../../assets/document.png";
import { Container } from "./styles";
import ModalPayment from "./components/Modal";
import Card from "./components/Card";
import useApi from "../../hooks/useApi";
import { getHistoySalary } from "../../services/api-user";
import Header from "./components/Header";

export default function HistoryPayment() {
  const { data } = useApi("/request");
  const [allHistory, setAllHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const history = async () => {
    const resp = await getHistoySalary();
    setAllHistory(resp);
    setRefresh(false);
  };

  useEffect(() => {
    if (data) {
      setAllHistory(data);
    }
    // history();
  }, [data]);
  const handleRefresh = () => {
    setRefresh(true);
    history();
  };

  const headerItem = () => <Header />;

  const renderItem = (item: any) => {
    return (
      <Card
        item={item.item}
        isPay={item.item.receipt_location}
        receipt={receipt}
        setImage={setImage}
        setModalVisible={setModalVisible}
      />
    );
  };
  return (
    <Container>
      <ModalPayment
        image={image}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <FlatList
        data={allHistory}
        keyExtractor={(item: any) => String(item.id)}
        renderItem={renderItem}
        ListHeaderComponent={headerItem}
        onRefresh={() => handleRefresh()}
        refreshing={refresh}
        bounces={false}
      />
    </Container>
  );
}
