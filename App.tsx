import React from 'react';
import Routes from './src/routes/stackNavigation';
import { useFonts, Montserrat_100Thin } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/context/UserContext';


export default function App() {
  const [fontsLoaded] = useFonts({ Montserrat_100Thin });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
    <AuthProvider>
      <Routes/>
    </AuthProvider>
    </>
  ) ;
}
