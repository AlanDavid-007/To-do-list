import React from 'react';

//Styled Components
import {
    HeaderView,
    HeaderTitle,
    HeaderButton,
    colors
} from "./../styles/appStyles.js";

//Icons
import {Entypo} from "@expo/vector-icons";

const Header = ({handleClearTodos}) => {
    return (
        <HeaderView>
            <HeaderTitle>To-do List</HeaderTitle>
            <HeaderButton
                onPress={handleClearTodos}>
                <Entypo name="trash" size={25} color={colors.tertiary} />
            </HeaderButton>
        </HeaderView>
    )
}

export default Header;