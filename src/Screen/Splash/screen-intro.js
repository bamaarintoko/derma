import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux';
import {Container, Content, Text} from "native-base";
import AppIntro from 'react-native-app-intro';
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
});
class ScreenIntro extends Component {
    render() {
        return (
            <Container>
                    <AppIntro
                        onSkipBtnClick={()=>this.props.navigation.dispatch({type: 'HOME'})}
                        onDoneBtnClick={()=>this.props.navigation.dispatch({type: 'HOME'})}
                        doneBtnLabel={<Text style={{color:'#FFF', fontSize:25, paddingLeft:20}}>{'   '}Done</Text>}
                    >
                        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
                            <View level={10}><Text style={styles.text}>Page 1</Text></View>
                            <View level={15}><Text style={styles.text}>Page 1</Text></View>
                            <View level={8}><Text style={styles.text}>Page 1</Text></View>
                        </View>
                        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
                            <View level={-10}><Text style={styles.text}>Page 2</Text></View>
                            <View level={5}><Text style={styles.text}>Page 2</Text></View>
                            <View level={20}><Text style={styles.text}>Page 2</Text></View>
                        </View>
                        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
                            <View level={8}><Text style={styles.text}>Page 3</Text></View>
                            <View level={0}><Text style={styles.text}>Page 3</Text></View>
                            <View level={-10}><Text style={styles.text}>Page 3</Text></View>
                        </View>
                        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
                            <View level={5}><Text style={styles.text}>Page 4</Text></View>
                            <View level={10}><Text style={styles.text}>Page 4</Text></View>
                            <View level={15}><Text style={styles.text}>Page 4</Text></View>
                        </View>
                    </AppIntro>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenIntro);
