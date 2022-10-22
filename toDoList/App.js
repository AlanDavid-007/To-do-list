import { StatusBar } from 'expo-status-bar';
import React from 'react';

//Components
import Home from "./components/Home.js";

//Styled Components
import {Container} from "./styles/appStyles.js";

export default function App() {
  return (
    <Container>
      <Home />
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="light" />
    </Container>
  );
}

