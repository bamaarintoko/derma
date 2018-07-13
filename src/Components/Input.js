import {View, TouchableWithoutFeedback} from "react-native";
import {Input, Item, Text} from "native-base";
import React from 'react';

export const InputText = ({label}) => {
    return (
        <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 12}}>{label}</Text>
            <Item regular style={{width: '100%', height: 40}}>
                <Input/>
            </Item>
        </View>
    )

}

export const InputSelect = ({label, onClick,value}) => {
    return (
        <TouchableWithoutFeedback onPress={onClick}>
            <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 12}}>{label}</Text>
                <View style={{width: '100%', height: 40, borderColor:'#E0E0E0',borderWidth:1,borderStyle:'solid', justifyContent:'center',paddingLeft:5}}>
                    <Text>{value}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )

}