import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Container, Content, Input, Item, Text, Thumbnail} from "native-base";
import {
    Dimensions, FlatList, Image, StatusBar, StyleSheet, TouchableHighlight, TouchableWithoutFeedback,
    View
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Api from "../../Utils/Api";
import moment from "moment/moment";
import {InputSelect, InputText, InputTextArea} from "../../Components/Input";
import CheckBox from "react-native-check-box";
import Modal from 'react-native-modalbox';

const errors = {}
const width = (Dimensions.get('window').width - 50);
const val = [];
import Spinner from 'react-native-spinkit';

class ScreenMyReserveDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_title: '',
            value_address: '',
            data: [],
            value_description: '',
            value_note: '',
            value_reserve_name: '',
            value_reserve_cp: '',
            value_province: '',
            value_district: '',
            value_sub_district: '',
            value_end_date: '',
            par_key_word: '',
            province: [],
            district: [],
            sub_district: [],
            image_preview: [],
            isEdit: false,
            isOpen: false,
            isProvinceOpen: false,
            isDistrictModalOpen: false,
            isSubDistrictModalOpen: false,
            isLoading: true

        }
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('reserve_id'))
        let params = {
            par_reserve_id: this.props.navigation.getParam('reserve_id')
        }
        Api._POST('reserve/detail_reserve', params)
            .then((response) => {
                this.setState({
                    isLoading: false
                })
                if (response.data.status) {
                    this.setState({
                        value_title: response.data.result.reserve.reserve_title,
                        value_address: response.data.result.reserve.reserve_address,
                        data: JSON.parse(response.data.result.reserve.reserve_category),
                        value_description: response.data.result.reserve.reserve_description,
                        value_note: response.data.result.reserve.reserve_note,
                        value_reserve_name: response.data.result.reserve.reserve_pic,
                        value_reserve_cp: response.data.result.reserve.reserve_contact,
                        value_province: response.data.result.reserve.reserve_province,
                        value_district: response.data.result.reserve.reserve_district,
                        value_sub_district: response.data.result.reserve.reserve_sub_district,
                        value_end_date: response.data.result.reserve.reserve_end_date,
                        image_preview: response.data.result.image
                    })
                }
                console.log(response)
            }).catch((err) => {
            this.setState({
                isLoading: false
            })
            console.log(err.message)
        })
        Api._POST('location/province', params).then((response) => {
            this.setState({
                province: response.data
            })
        })
    }

    onValidate = (key) => {
        return (e) => {
            if (this.state[key].length < 1) {
                errors[key] = {error: true, error_message: 'required'}
            } else {
                errors[key] = false
            }
            this.setState({input_error: errors})
            // console.log('----->e', this.state[key].length)
        }
    }
    onOpenClick = () => {
        return () => {
            this.setState({
                isOpen: true
            })
        }
    }
    onProvinceClick = () => {
        return () => {
            this.setState({
                isProvinceOpen: true,
            })
        }
    }
    onDistrictClick = () => {
        return () => {
            let params = {
                par_province_name: this.state.value_province
            }
            Api._POST('location/district', params).then((response) => {
                // console.log(response)
                this.setState({
                    district: response.data
                })
            })
            this.setState({
                isDistrictModalOpen: true,
            })
        }
    }
    onSubDistrictClick = () => {
        return () => {
            let params = {
                par_district_name: this.state.value_district
            }
            Api._POST('location/sub_district', params).then((response) => {
                // console.log(response)
                this.setState({
                    sub_district: response.data
                })
            })
            this.setState({
                isSubDistrictModalOpen: true,
            })
        }
    }
    onPickClick = () => {
        return () => {

            this.setState({
                isOpen: false,
                data_kat: val
            })
        }
    }
    onChangeText = (key) => {
        return (e) => {
            let state = {}
            state[key] = e
            this.setState(state);
            // console.log(e)
        }
    }
    onCheck = (key, idx) => {
        return () => {
            this.state.data[idx].check = this.state.data[idx].check === false
            this.setState({
                data: this.state.data
            })
        }
    }
    onUp = (key, idx) => {
        return () => {
            this.state.data[idx].count = parseInt(this.state.data[idx].count) + 1
            this.setState({
                data: this.state.data
            })
        }
    }
    onChangeNumber = (key, idx) => {
        return (e) => {
            console.log(parseInt(e))
            this.state.data[idx].count = parseInt(e)
            this.setState({
                data: this.state.data
            })
        }
    }
    onDown = (key, idx) => {
        return () => {
            if (this.state.data[idx].count > 0) {

                this.state.data[idx].count = parseInt(this.state.data[idx].count) - 1
                this.setState({
                    data: this.state.data
                })
            }
        }
    }
    onSelectChangeText = (key) => {
        return (e) => {
            this.setState({
                keyword: e
            })
            let params = {
                par_key_word: e
            }
            Api._POST('location/province', params).then((response) => {
                this.setState({
                    province: response.data
                })
            })
        }
    }
    onPress = (key, val) => {
        return () => {
            let state = {};
            state[key] = val
            this.setState(state)
            this.setState({
                isProvinceOpen: false,
                isDistrictModalOpen: false,
                isSubDistrictModalOpen: false,
                value_district: '',
                value_sub_district: ''
            })
            if (key === 'value_province') {
                this.setState({
                    value_district: '',
                    value_sub_district: ''
                })
            }
        }
    }
    onClose = () => {
        return () => {
            this.setState({
                isProvinceOpen: false,
                isDistrictModalOpen: false,
                isSubDistrictModalOpen: false,
            })
        }
    }

    render() {
        console.log(this.state.image_preview)
        return <Container>
            <StatusBar backgroundColor="#013976"/>
            <View style={{
                flexDirection: 'row',
                height: 50,
                backgroundColor: '#FFF',
                borderBottomColor: '#BDBDBD',
                borderBottomWidth: 1
            }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Button full transparent light onPress={() => this.props.navigation.goBack()}>
                        <Icon color={'#000000'} size={20}
                              name="arrow-left"/>
                    </Button>
                </View>
                <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>

                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    {
                        !this.state.isEdit
                            ?
                            <Button full transparent light
                                    onPress={() => this.setState({isEdit: !this.state.isEdit})}>
                                <Icon color={'#000000'} size={20}
                                      name="pencil-square-o"/>
                            </Button>
                            :
                            <Button full transparent light onPress={() => {
                                this.componentDidMount();
                                this.setState({isEdit: !this.state.isEdit})
                            }

                            }>
                                <Icon color={'#000000'} size={20}
                                      name="times"/>
                            </Button>

                    }

                </View>
            </View>

            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'row'}}>
                    <Button transparent
                            style={{justifyContent: 'center', width: 50, position: 'absolute', right: 0}}
                            onPress={this.onPickClick()}>
                        <Icon color={'#E0E0E0'} size={20}
                              name="times"/>
                    </Button>
                </View>
                <View style={{padding: 5, marginTop: 30, marginBottom:50}}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => '' + index}
                        renderItem={({item, index}) =>
                            <CheckBox
                                style={{flex: 1, padding: 10}}
                                onClick={this.onCheck(item.value, index)}
                                isChecked={item.check}
                                leftText={item.value}
                            />
                        }
                    />
                </View>
                <View style={{position: 'absolute', bottom: 0, width: '100%', padding: 5, flexDirection: 'row', marginTop:30}}>
                    <Button block info style={{justifyContent: 'center', width: '100%'}}
                            onPress={this.onPickClick()}>
                        <Icon color={'#FFF'} size={20}
                              name="plus"/>
                    </Button>
                </View>
            </Modal>
            {/*province modal*/}
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isProvinceOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'column', padding: 5}}>
                    <View style={{width: '100%'}}>
                        <Item regular style={{height: 40}}>
                            <Input value={this.state.keyword}
                                   onChangeText={this.onSelectChangeText('par_key_word')}/>
                        </Item>
                    </View>
                    <View style={{width: '100%'}}>
                        <FlatList
                            data={this.state.province}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item, index}) =>
                                <TouchableHighlight onPress={this.onPress('value_province', item.province)}>
                                    <View style={{padding: 10}}>
                                        <Text>{item.province}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />

                    </View>


                </View>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <Button block info style={{width: '100%'}} onPress={this.onClose()}>
                        <Text>Ok</Text>
                    </Button>
                </View>

            </Modal>
            {/*District Modal*/}
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isDistrictModalOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'column', padding: 5}}>
                    <View style={{width: '100%'}}>
                        <FlatList
                            data={this.state.district}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item, index}) =>
                                <TouchableHighlight onPress={this.onPress('value_district', item.district)}>
                                    <View style={{padding: 10}}>
                                        <Text>{item.district}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />

                    </View>


                </View>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <Button block info style={{width: '100%'}} onPress={this.onClose()}>
                        <Text>Ok</Text>
                    </Button>
                </View>

            </Modal>
            {/*subdistrict*/}
            <Modal position={"center"}
                   style={[styles.modal, styles.modal3]}
                   swipeToClose={false}
                   isOpen={this.state.isSubDistrictModalOpen}
                   backdropPressToClose={false}>
                <View style={{flexDirection: 'column', padding: 5}}>
                    <View style={{width: '100%'}}>
                        <FlatList
                            data={this.state.sub_district}
                            keyExtractor={(item, index) => '' + index}
                            renderItem={({item, index}) =>
                                <TouchableHighlight onPress={this.onPress('value_sub_district', item.subdistrict)}>
                                    <View style={{padding: 10}}>
                                        <Text>{item.subdistrict}</Text>
                                    </View>
                                </TouchableHighlight>
                            }
                        />

                    </View>


                </View>
                <View style={{width: '100%', position: 'absolute', bottom: 0}}>
                    <Button block info style={{width: '100%'}} onPress={this.onClose()}>
                        <Text>Ok</Text>
                    </Button>
                </View>

            </Modal>
            {
                this.state.isLoading
                    ?
                    <Content style={{backgroundColor: '#FFF'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Spinner type={'ChasingDots'} color={"#013976"}/>
                            <Text>Please wait</Text>
                        </View>
                    </Content>
                    :
                    <Content style={{backgroundColor: '#FFF'}}>
                        {
                            !this.state.isEdit
                                ?
                                <View style={{margin: 10}}>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Title</Text>
                                        <Item regular style={{width: '100%', height: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_title}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Kategori</Text>
                                        {
                                            this.state.data.map((v, k) => {
                                                return (
                                                    <View key={k} style={{
                                                        marginBottom: 5,
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={{
                                                            width: '100%',
                                                            flexDirection: 'row',
                                                            paddingLeft: 5
                                                        }}>
                                                            <View style={{width: '10%'}}>

                                                                <Text style={{fontSize: 12}}>{v.count}</Text>
                                                            </View>
                                                            <View style={{width: '90%'}}>

                                                                <Text style={{fontSize: 12}}>{v.value}</Text>
                                                            </View>
                                                            {/*<View style={{width: '10%'}}>*/}
                                                            {/*<Icon color={'red'} size={20}*/}
                                                            {/*name="minus-circle"/>*/}
                                                            {/*</View>*/}
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                        {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Description</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_description}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Note</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_note}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Reserve name</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_reserve_name}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Reserve contact person</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_reserve_cp}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Image</Text>
                                        <View style={{
                                            marginBottom: 10, flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <FlatList
                                                data={this.state.image_preview}
                                                numColumns={3}
                                                keyExtractor={(item, index) => '' + index}
                                                renderItem={({item}) =>
                                                    <View style={{
                                                        margin: 5,
                                                        height: width / 3,
                                                        overflow: 'hidden',
                                                        borderRadius: 5,
                                                        width: width / 3,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E3F2FD'
                                                    }}>
                                                        <Image

                                                            style={{width: width / 3, height: width / 3}}
                                                            source={{isStatic: true, uri: item.media_value}}/>
                                                    </View>
                                                }
                                            />
                                        </View>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Reserve address</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_address}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Province</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_province}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>District</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_district}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>Sub district</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text style={{fontSize: 14}}> {this.state.value_sub_district}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                    <View style={{marginBottom: 10}}>
                                        <Text style={{fontSize: 12}}>End date</Text>
                                        <Item regular style={{width: '100%', minHeight: 40, borderColor: '#FFF'}}>
                                            <Text
                                                style={{fontSize: 14}}>{moment(this.state.value_end_date).format('LL')}</Text>
                                            {/*<Input onBlur={onBlur} style={{fontSize: 14}} value={value} onChangeText={onChangeText}/>*/}
                                        </Item>
                                    </View>
                                </View>
                                :
                                <View style={{margin: 10}}>
                                    <InputText
                                        onBlur={this.onValidate('value_title')}
                                        // isError={this.state.input_error.value_title}
                                        label={"Title"}
                                        value={this.state.value_title}
                                        onChangeText={this.onChangeText('value_title')}/>
                                    <View>
                                        {

                                            this.state.data.map((v, k) => {
                                                return (
                                                    v.check
                                                    &&
                                                    <View key={k} style={{
                                                        marginBottom: 5,
                                                        flexDirection: 'row',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <View style={{width: '30%', flexDirection: 'row'}}>
                                                            <View style={{width: '30%'}}>
                                                                <Button full info style={{height: 30}}
                                                                        onPress={this.onUp(v.key, k)}>
                                                                    <Icon color={'#FFF'} size={12}
                                                                          name="chevron-up"/>
                                                                </Button>
                                                            </View>
                                                            <View style={{width: '40%'}}>
                                                                <Item regular
                                                                      style={{height: 30, borderColor: '#FFF'}}>
                                                                    <Input keyboardType="numeric"
                                                                           style={{fontSize: 12}}
                                                                           onChangeText={this.onChangeNumber(v.key, k)}
                                                                           value={v.count.toString()}/>
                                                                </Item>
                                                            </View>
                                                            <View style={{width: '30%'}}>
                                                                <Button full info style={{height: 30}}
                                                                        onPress={this.onDown(v.key, k)}>
                                                                    <Icon color={'#FFF'} size={12}
                                                                          name="chevron-down"/>
                                                                </Button>
                                                            </View>
                                                        </View>
                                                        <TouchableWithoutFeedback key={k}
                                                                                  onPress={this.onCheck(v.value, k)}>
                                                            <View style={{
                                                                width: '70%',
                                                                flexDirection: 'row',
                                                                paddingLeft: 5
                                                            }}>
                                                                <View style={{width: '90%'}}>

                                                                    <Text style={{fontSize: 12}}>{v.value}</Text>
                                                                </View>
                                                                <View style={{width: '10%'}}>
                                                                    <Icon color={'red'} size={20}
                                                                          name="minus-circle"/>
                                                                </View>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                )
                                            })
                                        }
                                        <Button info style={{width: 50, justifyContent: 'center'}}
                                                onPress={this.onOpenClick()}>
                                            <Icon color={'#FFF'} size={20}
                                                  name="plus"/>
                                        </Button>
                                    </View>
                                    <InputTextArea
                                        onBlur={this.onValidate('value_description')}
                                        value={this.state.value_description}
                                        onChangeText={this.onChangeText('value_description')}
                                        // isError={this.state.input_error.value_description}
                                        label={'Description'}
                                    />
                                    <InputText
                                        value={this.state.value_note}
                                        onChangeText={this.onChangeText('value_note')}
                                        label={"Note"}/>
                                    <InputText
                                        onBlur={this.onValidate('value_reserve_name')}
                                        // isError={this.state.input_error.value_reserve_name}
                                        value={this.state.value_reserve_name}
                                        onChangeText={this.onChangeText('value_reserve_name')}
                                        label={"Reserve name"}/>
                                    <InputText
                                        onBlur={this.onValidate('value_reserve_cp')}
                                        // isError={this.state.input_error.value_reserve_cp}
                                        value={this.state.value_reserve_cp}
                                        onChangeText={this.onChangeText('value_reserve_cp')}
                                        label={"Reserve Contact Person"}/>
                                    <View style={{marginTop: 5, marginBottom: 5}}>
                                        <Text style={{fontSize: 12, marginBottom: 5}}>Image (Click plus button to
                                            add
                                            image)</Text>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        </View>
                                    </View>
                                    <InputTextArea
                                        onBlur={this.onValidate('value_address')}
                                        value={this.state.value_address}
                                        onChangeText={this.onChangeText('value_address')}
                                        // isError={this.state.input_error.value_address}
                                        label={'Address'}
                                    />
                                    <InputSelect
                                        // isError={cek_p}
                                        label={"Province"} onClick={this.onProvinceClick()}
                                        value={this.state.value_province}/>
                                    <InputSelect
                                        // isError={cek_d}
                                        label={"District"} value={this.state.value_district}
                                        onClick={this.state.value_province.length !== 0 ? this.onDistrictClick() : () => console.log("lala")}/>
                                    <InputSelect
                                        // isError={cek_s}
                                        label={"Sub District"} value={this.state.value_sub_district}
                                        onClick={this.state.value_province.length !== 0 && this.state.value_district.length !== 0 ? this.onSubDistrictClick() : () => console.log("lala")}/>
                                </View>

                        }

                    </Content>
            }


        </Container>;
    }
}

const styles = StyleSheet.create({

    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        flex: 1
    },

    modal2: {
        height: 230,
        backgroundColor: "#3B5998"
    },

    modal3: {
        height: 300,
        width: 300
    },

    modal4: {
        height: 300
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

});

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenMyReserveDetail);
