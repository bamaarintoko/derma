import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import { View, Container,Text,Content } from 'native-base';

function mapStateToProps(state) {
    return {

    };
}

class ScreenNews extends Component {
    render() {
        return (
            <Container>
                <StatusBar backgroundColor="#FFA726" />
                <View style={{flexDirection:'row',height:50, backgroundColor:'#FFF',borderBottomColor:'#BDBDBD', borderBottomWidth:1}}>
                    <View style={{flex:1,}}>

                    </View>
                    <View style={{flex:4, justifyContent:'center',alignItems:'center'}}>
                        <Text>
                            News
                        </Text>
                    </View>
                    <View style={{flex:1,}}>

                    </View>
                </View>
                <Content>

                </Content>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenNews);