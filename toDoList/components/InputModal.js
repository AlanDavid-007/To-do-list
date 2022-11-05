import React, {useState} from "react";
import {Modal, TextInput, Text, Button, SafeAreaView, StyleSheet, View} from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import DateTimePicker from '@react-native-community/datetimepicker';

import {
    ModalButton,
    ModalContainer,
    ModalView,
    StyledInput,
    ModalAction,
    ModalActionGroup,
    ModalIcon,
    HeaderTitle,
    colors,
    TodoText
} from "./../styles/appStyles.js";
import {AntDesign} from "@expo/vector-icons";

const InputModal = ({
    modalVisible,
    setModalVisible,
    setTodos,
    handleAddTodo,
    todoToBeEdited,
    setTodoToBeEdited,
    handleEditTodo,
    todos
    }) => {

        
    const [todoInputValue, setTodoInputValue] = useState("");
    // const [descriptionInputValue, setDescriptionInputValue] = useState("");

    const local = 'pt-br';
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));
    const [priori, setPriori] = useState(1);
    // const [prioriColor, setPrioriColor] = useState("");
    function showDatePicker() {
        setDatePicker(true);
      };
    
      function showTimePicker() {
        setTimePicker(true);
      };

      function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
      };
    
      function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
      };

      function pad(n) {return n < 10 ? "0"+n : n;}
      var result = pad(date.getDate())+"/"+pad(date.getMonth()+1)+"/"+date.getFullYear();
    //   console.log(result)
        //Date late func
// colocar func para trocar cor para vermelho do card

    // const para prioridade
    const handleCloseModal = () => {
        setModalVisible(false);
        setTodoInputValue("");
        setTodoToBeEdited(null);
    }

// Continuar func de prioridade para trocar de cor - levar texto para listItems

    const handleSubmit = () => {
        if (!todoToBeEdited && todoInputValue !== '') {
            if ( priori == 1) {
                handleAddTodo({
                    "title": todoInputValue,
                    "date": result, //date
                    // description: descriptionInputValue,
                    "priority": priori,
                    "color": "#2BE29C",
                    "key": uuidv4()
                });
            } else {
                if (priori == 2) {
                    handleAddTodo({
                        "title": todoInputValue,
                        "date": result, //date
                        // description: descriptionInputValue,
                        "priority": priori,
                        "color": "#87CEEB",
                        "key": uuidv4()
                    });
                } else {
                    if (priori == 3) {
                        handleAddTodo({
                            "title": todoInputValue,
                            "date": result, //date
                            // description: descriptionInputValue,
                            "priority": priori,
                            "color": "#BDBF20",
                            "key": uuidv4()
                        });
                    } else {
                        if (priori == 4) {
                            handleAddTodo({
                                "title": todoInputValue,
                                "date": result, //date
                                // description: descriptionInputValue,
                                "priority": priori,
                                "color": "#FFA07A",
                                "key": uuidv4()
                            });
                        }
                    }
                }
            };
        } else {
            if ( priori == 1) {
                handleEditTodo({
                    "title": todoInputValue,
                    "date": todoToBeEdited.date, //date
                    // description: descriptionInputValue,
                    "priority": todoToBeEdited.priority,
                    "color": "#2BE29C",
                    "key": todoToBeEdited.key
                });
            } else {
                if (priori == 2) {
                    handleEditTodo({
                        "title": todoInputValue,
                        "date": todoToBeEdited.date, //date
                        // description: descriptionInputValue,
                        "priority": todoToBeEdited.priority,
                        "color": "#87CEEB",
                        "key": todoToBeEdited.key
                    });
                } else {
                    if (priori == 3) {
                        handleEditTodo({
                            "title": todoInputValue,
                            "date": todoToBeEdited.date, //date
                            // description: descriptionInputValue,
                            "priority": todoToBeEdited.priority,
                            "color": "#BDBF20",
                            "key": todoToBeEdited.key
                        });
                    } else {
                        if (priori == 4) {
                            handleEditTodo({
                                "title": todoInputValue,
                                "date": todoToBeEdited.date, //date
                                // description: descriptionInputValue,
                                "priority": todoToBeEdited.priority,
                                "color": "#FFA07A",
                                "key": todoToBeEdited.key
                            });
                        }
                    }
                }
            };
            // console.log(todoInputValue);
        }
        // console.log(priori);
        setTodoInputValue("");
    }
    
    return (
        <>

            <ModalButton onPress={() => {setModalVisible(true)}}>
                <AntDesign name="plus" size={30} color={colors.secondary}/>
            </ModalButton>

            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <ModalContainer>
                    <ModalView>
                    <ModalIcon>
                        <HeaderTitle>Tarefas</HeaderTitle>
                        <AntDesign name="edit" size={15} color={colors.tertiary}/>
                    </ModalIcon>
                    
                    <StyledInput
                        placeholder="Adione uma tarefa"
                        style={{height: 40}}
                        placeholderTextColor={colors.alternative}
                        selectionColor={colors.secondary}
                        autoFocus={true}
                        onChangeText={(text) => setTodoInputValue(text)}
                        value={todoInputValue}
                        onSubmitEditing={handleSubmit}
                        />
                        <Text></Text>
                        {/* <StyledInput 
                         placeholder="Adicione uma descrição"
                         style={{height: 40}}
                         placeholderTextColor={colors.alternative}
                         selectionColor={colors.secondary}
                         autoFocus={true}
                         onChangeText={(text) => setDescriptionInputValue(text)}
                         value={descriptionInputValue}
                         onSubmitEditing={handleSubmit}
                         /> */}
                         <Text></Text>
                         <StyledInput 
                         placeholder="Escolha uma prioridade"
                         style={{height: 40}}
                         placeholderTextColor={colors.alternative}
                         selectionColor={colors.secondary}
                         autoFocus={true}
                         onChangeText={(text) => setPriori(text)}
                         value={priori}
                         onSubmitEditing={handleSubmit}
                         keyboardType='numeric'
                         maxLength={4}  //setting limit of input
                         />
                        <SafeAreaView style={{ flex: 1 }}>
      <View >
 
        {/* <Text>Data = {result}</Text>
 
        <Text>Hora = {time.toLocaleTimeString('pt-br')}</Text>
  */}
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onDateSelected}
          />
        )}
 
        {/* {timePicker && (
          <DateTimePicker
            value={time}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelected}
          />
        )} */}
 
        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Escolher Data"style={styles.button} onPress={showDatePicker} />
          </View>
        )}
 
        {/* {!timePicker && (
          <View style={{ margin: 10 }}>
            <Button title="Show Time Picker" color="#2BE29C" onPress={showTimePicker} />
          </View>
        )} */}
 
      </View>
    </SafeAreaView>
                    <ModalActionGroup>
                        <ModalAction color={colors.primary} onPress={handleCloseModal}>
                        <AntDesign name="close" size={20} color={colors.tertiary}/>
                        </ModalAction>

                        <ModalAction color={colors.tertiary} onPress= {handleSubmit}>
                        <AntDesign name="check" size={20} color={colors.secondary}/>                   
                        </ModalAction>
                    
                    </ModalActionGroup>
                    </ModalView>
                </ModalContainer>
            </Modal>
        </>
    )
}
const styles = StyleSheet.create({
    button: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',

    }
    })
export default InputModal;
