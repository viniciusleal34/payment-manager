import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Profile from "../screens/Profile";
import Payment from "../screens/Payment";
import HistoryPayment from "../screens/HistoryPayment";

const TabBarComponent = (props:any) => (<BottomTabBar {...props} />);

const TabNavigator = createBottomTabNavigator({
  'Perfil': Profile,
  Pagamento: Payment,
  'Histórico': HistoryPayment,
  
}, {
  tabBarOptions: {
    activeTintColor: '#B87979',
    inactiveTintColor:'#fff',
    labelStyle: {
      fontSize: 12
  
    },
    style: {
      backgroundColor: '#2E2E2E',
      justifyContent: 'flex-start'
    },
    tabStyle: {
      paddingBottom:15    
    },
  }
});




export default createAppContainer(TabNavigator);