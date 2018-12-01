import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {Image, View} from "react-native";
import {Button} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";


export const Header =({statusGet, message})=>{
    return(
        <View style={{
            flexDirection: 'row',
            height: hp('8%'),
            backgroundColor: '#FFF',
            borderBottomColor: '#BDBDBD',
            borderBottomWidth: 1
        }}>
            <View style={{flex: 1,}}>

            </View>
            <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    style={{flex: 1}}
                    width={hp('13%')}
                    source={require('../Assets/head.png')}
                    resizeMode={"contain"}
                />
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {
                    statusGet
                    &&
                    <Button full transparent light onPress={message}>
                        <Icon color={'#000000'} size={20}
                              name="comments"/>
                    </Button>
                }
            </View>
        </View>
    )
}