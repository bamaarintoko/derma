import React  from 'react';
import {
    Text,
    View, TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export const Category = ({book_name}) => {
    return (
        <TouchableWithoutFeedback onPress={() => console.log("adasd")}>
            <View style={{
                paddingTop: 10,
                height: 40,
                paddingBottom: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <View style={{width: '90%'}}>
                    <Text>{book_name}</Text>
                </View>
                <View>
                    <Icon color={'#E0E0E0'} size={20}
                          name="square-o"/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}