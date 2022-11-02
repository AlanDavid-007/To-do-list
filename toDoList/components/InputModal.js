import React, {useState} from "react";
import {Modal, TextInput, Text} from 'react-native';
//// Arrumar edit input
// Criar input de descrição, data e prioridade com cor
    //Configurar date picker e inputs de descrição e cor
// Criar banco de dados async offline
// Fazer func para trocar cor para vermelho quando a data da task exceder
//// Arrumar texto de todos == 0
import DatePicker from 'react-native-date-picker'

import {
    ModalButton,
    ModalContainer,
    ModalView,
    StyledInput,
    ModalAction,
    ModalActionGroup,
    ModalIcon,
    HeaderTitle,
    colors
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

        
    const [todoInputvalue, setTodoInputValue] = useState("");
    const [descriptionInputValue, setDescriptionInputValue] = useState("");
    const [date, setDate] = useState('01-11-2022');
    // const para prioridade
    const handleCloseModal = () => {
        setModalVisible(false);
        setTodoInputValue("");
        setTodoToBeEdited(null);
    }
    const handleSubmit = () => {
        if (!todoToBeEdited) {
            handleAddTodo({
                title: todoInputvalue,
                date: new Date().toUTCString(), //date
                description: descriptionInputValue,
                // priority: priorityInputValue,
                key: `${(todos[todos.lenght-1] && parseInt(todos[todos.length -1].key) + 1 || 1)}`
            });
        } else {
            handleEditTodo({
                title: todoInputvalue,
                date: todoToBeEdited.date, //date
                description: descriptionInputValue,
                // priority: todoToBeEdited.priority,
                key: todoToBeEdited.key
            });
        }

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
                        <AntDesign name="edit" size={30} color={colors.tertiary}/>
                    </ModalIcon>
                    
                    <StyledInput
                        placeholder="Adione uma tarefa"
                        placeholderTextColor={colors.alternative}
                        selectionColor={colors.secondary}
                        autoFocus={true}
                        onChangeText={(text) => setTodoInputValue(text)}
                        value={todoInputvalue}
                        onSubmitEditing={handleSubmit}
                        />
                        {/* <Text>Welcome: {todoInputvalue}</Text> */}
                        <StyledInput 
                         placeholder="Adicione uma descrição"
                         placeholderTextColor={colors.alternative}
                         selectionColor={colors.secondary}
                         autoFocus={true}
                         onChangeText={(text) => setDescriptionInputValue(text)}
                         value={descriptionInputValue}
                         onSubmitEditing={handleSubmit}
                         />
                        <DatePicker
                            date={date} // Initial date from state
                            mode="date" // The enum of date, datetime and time
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            minDate="01-01-2016"
                            maxDate="01-01-2019"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                    dateIcon: {
                                    //display: 'none',
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0,
                                    },
                                    dateInput: {
                                    marginLeft: 36,
                                    },
                            }}
                            onDateChange={(date) => {
                                setDate(date);
                            }}
                        />
                    <ModalActionGroup>
                        <ModalAction color={colors.primary} onPress={handleCloseModal}>
                        <AntDesign name="close" size={28} color={colors.tertiary}/>
                        </ModalAction>

                        <ModalAction color={colors.tertiary} onPress={handleSubmit}>
                        <AntDesign name="check" size={28} color={colors.secondary}/>                   
                        </ModalAction>
                    
                    </ModalActionGroup>
                    </ModalView>
                </ModalContainer>
            </Modal>
        </>
    )
}

export default InputModal;