import React from 'react';
import {
    View,
} from 'react-native';
import Placeholder from 'rn-placeholder';
export const Ph = () => {
    return (
        <View
            style={{marginRight: 5}}>
            <View style={{ marginLeft: 15, marginTop:10}}>
                <Placeholder.Box
                    animate="fade"
                    height={90}
                    width={'100%'}
                    radius={5}
                    color="#FAFAFA"
                />
            </View>
            <View style={{left:5,position: 'absolute', backgroundColor:'#FFF', borderColor:'#FFF', borderRadius:50, borderWidth:3}}>
                <Placeholder.Box
                    animate="fade"
                    height={70}
                    width={70}
                    radius={50}
                    color="#FAFAFA"
                />
            </View>
        </View>
    )
}