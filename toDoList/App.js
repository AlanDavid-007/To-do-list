import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import {Text} from 'react-native';
//Components
import Home from "./components/Home.js";

//Styled Components
import {Container} from "./styles/appStyles.js";
//Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';


export default function App({todos, setTodos}) {

  //Acabar de configurar async storage
  
  const [ready, setReady] = useState(false);


    const loadTodos = () => {
      AsyncStorage.getItem("storedTodos").then(data => {
        if (data !== null) {
          setTodos(JSON.parse(data))
        }
      }).catch((error) => console.log(error));
    }

    if (!ready) {
      return (
        <AppLoading
          startAsync={loadTodos}
          onFinish={() => setReady(true)}
          onError={console.warn}
        />
      )
    }

    
  return (
    <Container todos={todos} setTodos={setTodos}>
      <Home />
      <Text></Text>
      <StatusBar style="light" />
    </Container>
  );
}

