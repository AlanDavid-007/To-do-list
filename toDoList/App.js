import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Text} from 'react-native';
//Components
import Home from "./components/Home.js";

//Styled Components
import {Container} from "./styles/appStyles.js";

export default function App() {
  return (
    <Container>
      <Home />
      <Text></Text>
      <StatusBar style="light" />
    </Container>
  );
}

