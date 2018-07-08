import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Container, Content } from 'native-base';

function mapStateToProps(state) {
    return {

    };
}

class ScreenEvent extends Component {
    render() {
        return (
            <Container>
                <View style={{height:50}}>

                </View>
                <Content style={{backgroundColor:'#FFF'}}>
                    <View style={{ height: 120,backgroundColor:'#FFF' }}>

                        <View style={{ backgroundColor: '#FFECB3', height: 100, marginLeft:10,marginTop:10,marginRight:10, borderStyle:'dashed' }}>
                            <View style={{height:'100%',width:'75%',borderRightWidth:1, borderStyle:'dashed',borderRadius:0.5,borderColor:'#FF9800'}}>

                            </View>
                        </View>
                        <View style={{top:0,left:0,backgroundColor:'#FFF', width:25,height:25,borderRadius:20, position:'absolute'}}>

                        </View>
                        <View style={{left:0,bottom:0,backgroundColor:'#FFF', width:25,height:25,borderRadius:20, position:'absolute'}}>

                        </View>
                        <View style={{right:0,top:0,backgroundColor:'#FFF', width:25,height:25,borderRadius:20, position:'absolute'}}>

                        </View>
                        <View style={{right:0,bottom:0,backgroundColor:'#FFF', width:25,height:25,borderRadius:20, position:'absolute'}}>

                        </View>
                    </View>
                                       
                    
                </Content>
            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenEvent);