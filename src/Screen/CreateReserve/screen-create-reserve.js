import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from "native-base";

class ScreenCreateReserve extends Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenCreateReserve);
