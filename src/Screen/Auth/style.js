import React from 'react';
import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

export let styles = {
    wrapper: {},
    separatorContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 8
    },
    separatorLine: {
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        height: StyleSheet.hairlineWidth,
        borderColor: '#FFFFFF'
    },
    separatorOr: {
        color: '#BDBDBD',
        marginHorizontal: 8,
        fontSize: hp('1.9%')
    },
    vwRegister: {
        flexDirection: 'row', marginTop: 10, alignItems: 'center'
    },
    vwOnRegister: {
        flexDirection: 'row', flex: 1, alignItems: 'center',
    },
    vwOnForget: {
        flex: 1
    },
    txtFirstTime: {
        color: '#013976', fontSize: hp('1.9%')
    },
    txtSignUp: {color: '#013976', fontWeight: 'bold', fontSize: hp('2%')},
    txtForgetPass: {
        color: '#013976',
        fontWeight: 'bold',
        fontSize: hp('2%'),
        alignSelf: 'flex-end'
    },
    vwBtnLogin: {
        flexDirection: 'row', marginTop: 10, alignItems: 'center', width: '100%'
    },
    btnFacebook: {
        height: hp('6%'),
        width: '50%', backgroundColor: '#3B5998'
    },
    btnGmail: {
        height: hp('6%'),
        width: '50%', backgroundColor: '#c71610'
    },
    veInputFrame: {
        flexDirection: 'row', alignItems: 'center'
    },
    vwInput: {
        width: '80%'
    },
    vwBtn: {
        width: '20%'
    },
    itmEmail: {
        backgroundColor: '#fff',
        borderColor: '#013976',
        borderWidth: 2,
        height: hp('7%')
    },
    itmPass: {
        backgroundColor: '#FFF',
        borderColor: '#FFF',
        borderWidth: 2,
        height: hp('7%')
    },
    vwIcon: {
        width: 30, justifyContent: 'center', alignItems: 'center'
    },
    txtInput: {
        fontSize: hp('2.2%'), color: '#013976'
    },
    header: {
        height: hp('8%'), paddingLeft: 20, justifyContent: 'center'
    },
    txtHeader: {
        fontWeight: 'bold', fontSize: hp('4%'), color: '#013976'
    },
    itmRegister: {
        backgroundColor: '#FFF', borderColor: '#013976', borderWidth: 2,height:hp('7%')
    },
    vwIcn: {
        width: 30, justifyContent: 'center', alignItems: 'center'
    },
    btn:{
        marginTop: 30,
        backgroundColor: '#013976',
        borderColor: '#FFF',
        borderWidth: 2,
        height:hp('6%')
    }
};