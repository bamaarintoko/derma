import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Platform,
    StyleSheet,
    Text,
    View, FlatList, StatusBar, Dimensions, Image
} from 'react-native';
export const Donate = () => {
    return (
        <View style={{ height: 100, marginTop: 5 }}>
            <View style={{
                borderRadius: 5,
                height: 90,
                backgroundColor: '#1565C0', marginRight: 5, marginLeft: 15, marginTop: 10
            }}>
                <Text>aaaa</Text>

            </View>
            <View style={{ overflow: 'hidden', left: 5, width: 70, height: 70, borderWidth: 2, borderStyle: 'solid', borderColor: '#013976', backgroundColor: '#FFF', borderRadius: 50, position: 'absolute' }}>
            </View>
        </View>
    )
}