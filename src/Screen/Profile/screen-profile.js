import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Thumbnail, Text, Container, Content } from 'native-base';
import { StatusBar, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function mapStateToProps(state) {
    return {

    };
}
const styles = StyleSheet.create({

    TrapezoidStyle: {

        width: '100%',
        height: 0,
        borderBottomColor: "#FB8C00",
        borderTopWidth: 50,
        borderTopColor: '#FB8C00',
        borderLeftWidth: 400,
        borderRightWidth: 0,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    TrapezoidStyle_: {

        width: '100%',
        height: 0,
        borderBottomColor: "#FFA726",
        borderTopWidth: 50,
        borderTopColor: '#FFA726',
        borderLeftWidth: 0,
        position: 'absolute',
        borderRightWidth: 400,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    dd: {

        width: '100%',
        height: 120,
        backgroundColor: '#FB8C00'
    }
})

class ScreenProfile extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="book" size={20} color={tintColor} />;
        }
    }
    render() {
        return (
            <Container style={{ backgroundColor: '#FFF' }}>
                <StatusBar backgroundColor="#FFA726" />
                <View style={styles.MainContainer}>

                    <View style={styles.dd} />
                    <View style={styles.TrapezoidStyle} />
                    <View style={styles.TrapezoidStyle_} />
                    <View style={{ position: 'absolute', top: 40, right:10 }}>
                        <Thumbnail large source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_vja0DlupN1SvfONjHucwohNYvoNqKS-KewxhW2BfD4nkcB_XXA' }} />
                    </View>
                    <View style={{ position: 'absolute', top: 120, right:10 }}>
                        <Text style={{color:'#FFF'}}>Maybelle	Cardenas</Text>
                    </View>
                </View>
                <Content style={{marginTop:10}}>

                    <View style={{padding:10}}>
                        <Text>Edit Profile</Text>
                    </View>
                    <View style={{padding:10}}>
                        <Text>Log Out</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenProfile);