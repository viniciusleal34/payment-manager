import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Login from ".././screens/Login";
import ForgotPass from ".././screens/Forgot";
import Reset from ".././screens/Reset";
import Welcome from ".././screens/Welcome";
import Register from ".././screens//Register";
import TabBars from "./TabNavigations";

const MainNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: false,
      },
    },
    TabBars: {
      screen: TabBars,
      navigationOptions: {
        header: false,
      },
    },
    "Bem-Vindo": {
      screen: Welcome,
      navigationOptions: {
        header: false,
      },
    },
    Register: {
      screen: Register,
      navigationOptions: {
        header: false,
      },
    },
    Forgot: {
      screen: ForgotPass,
      navigationOptions: {
        headerTitle: "",
        headerTintColor: "#ca375e",
        headerTransparent: true,
        headerStyle: { backgroundColor: "#2e2e2e" },
      },
    },
    Reset: {
      screen: Reset,
      navigationOptions: {
        headerTitle: "",
        headerTintColor: "#ca375e",
        headerTransparent: true,
        headerStyle: { backgroundColor: "#2e2e2e" },
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
      gestureDirection: "vertical",
      headerTintColor: "#ca375e",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#161616",
      },
    },
  }
);

const Routes = createAppContainer(MainNavigator);
export default Routes;
