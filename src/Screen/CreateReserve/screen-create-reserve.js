import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Dimensions,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ImageStore,
    Image, TouchableOpacity
} from "react-native"
import {Button, Container, Content, Input, Item, Text, Textarea, View} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box'
import Api from "../../Utils/Api";
import {InputText, InputSelect, InputDate, InputTextArea} from "../../Components/Input";
import ImagePicker from "react-native-image-picker";
import ImageResizer from 'react-native-image-resizer'
import DateTimePicker from 'react-native-modal-datetime-picker';
import {jsDateToSqlD} from "../../Utils/func";
import moment from 'moment';
import "moment/locale/en-au";
import {actAddReserve} from "./action";

const errors = {}
const width = (Dimensions.get('window').width - 50);
const val = [];
const img = [];
let options = {
    title: 'Select Image',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 7)

class ScreenCreateReserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgPreview0: '',
            imgPreview1: '',
            imgPreview2: '',
            imgPreview3: '',
            imgPreview4: '',
            imgPreview5: '',
            imgValue0: '',
            imgValue1: '',
            imgValue2: '',
            imgValue3: '',
            imgValue4: '',
            imgValue5: '',
            isOpen: false,
            isProvinceOpen: false,
            isDistrictModalOpen: false,
            isSubDistrictModalOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,
            data: [],
            data_kat: [],
            province: [],
            district: [],
            sub_district: [],
            province_value: '',
            district_value: '',
            sub_district_value: '',
            keyword: '',
            data_image: [],
            isDateTimePickerVisible: false,
            endDatePreview: '',
            endDateSave: '',
            value_title: '',
            value_reserve_name: '',
            value_description: '',
            value_note: '',
            value_reserve_cp: '',
            value_address: '',
            input_error: []
        }
    }

    componentDidMount() {
        let params = {}
        Api._POST('category/category_book', params).then((response) => {
            if (response.data.status) {
                this.setState({
                    data: response.data.result
                })
            }
        })

        Api._POST('location/province', params).then((response) => {
            this.setState({
                province: response.data
            })
        })
    }

    _showDateTimePicker = () => this.setState({isDateTimePickerVisible: true});

    _hideDateTimePicker = () => this.setState({isDateTimePickerVisible: false});

    _handleDatePicked = (date) => {
        this.setState({
            endDatePreview: moment(date).format('LL'),
            endDateSave: jsDateToSqlD(date.toISOString())
        })
        // console.log('A date has been picked: --->', jsDateToSqlD(date.toISOString()));
        // console.log('A date has been picked: --->', moment(date).format('LL'));
        this._hideDateTimePicker();
    };
    onOpenClick = () => {
        return () => {
            this.setState({
                isOpen: true
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
            this.state.data[idx].count = this.state.data[idx].count + 1
            this.setState({
                data: this.state.data
            })
        }
    }
    onDown = (key, idx) => {
        return () => {
            if (this.state.data[idx].count > 0) {

                this.state.data[idx].count = this.state.data[idx].count - 1
                this.setState({
                    data: this.state.data
                })
            }
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
                par_province_name: this.state.province_value
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
                par_district_name: this.state.district_value
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
    onClose = () => {
        return () => {
            this.setState({
                isProvinceOpen: false,
                isDistrictModalOpen: false,
                isSubDistrictModalOpen: false,
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
            })
        }
    }
    onPickImage = (key, val) => {
        return () => {
            ImagePicker.showImagePicker(options, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                    console.log('User cancelled image picker');
                }
                else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    // console.log('data:image/png;base64,' + response.data)
                    ImageResizer.createResizedImage('data:image/png;base64,' + response.data, 200, 200, 'JPEG', 80)
                        .then(({uri}) => {
                            ImageStore.getBase64ForTag(uri, (data) => {
                                let source = 'data:image/png;base64,' + data;
                                let state = {};
                                state[key] = source;
                                state[val] = response.data;
                                this.setState(state)
                            }, (e) => {
                                console.log('getBase64ForTag-error', e);
                            });
                        }).catch((err) => {
                    });
                }
            });
        }
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
    onCreate = () => {
        return () => {
            let words = this.state.data;
            const result = words.filter(word => word.check);
            // console.log(JSON.stringify(words))
            let params = {
                par_title: this.state.value_title,
                par_kategory: JSON.stringify(result),
                par_description : this.state.value_description,
                par_note : this.state.value_note,
                par_reserve_name : this.state.value_reserve_name,
                par_reserve_cp : this.state.value_reserve_cp,
                par_address : this.state.value_address,
                par_province : this.state.province_value,
                par_district : this.state.district_value,
                par_sub_district : this.state.sub_district_value,
                par_end_date : this.state.endDateSave,
                par_create_by : this.props.redAuth.data.profile.user_id
            }
            this.props.dispatch(actAddReserve(params));
            console.log("create", params)
        }
    }

    render() {
        return (
            <Container>
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
                        <Text>
                            Create Reserve
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button full transparent light>
                            <Icon color={'#000000'} size={20}
                                  name="check"/>
                        </Button>
                    </View>
                    {/*{console.log("=>",this.state.data)}*/}
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
                    <View style={{padding: 5, marginTop: 30}}>
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
                    <View style={{position: 'absolute', bottom: 0, width: '100%', padding: 5, flexDirection: 'row'}}>
                        <Button block info style={{justifyContent: 'center', width: '100%'}}
                                onPress={this.onPickClick()}>
                            <Icon color={'#FFF'} size={20}
                                  name="plus"/>
                        </Button>
                    </View>
                </Modal>
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
                                    <TouchableHighlight onPress={this.onPress('province_value', item.province)}>
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
                                    <TouchableHighlight onPress={this.onPress('district_value', item.district)}>
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
                                    <TouchableHighlight onPress={this.onPress('sub_district_value', item.subdistrict)}>
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
                <Content style={{backgroundColor: '#FFF'}}>

                    <View style={{margin: 10}}>
                        <InputText
                            onBlur={this.onValidate('value_title')}
                            isError={this.state.input_error.value_title}
                            label={"Title"}
                            value={this.state.value_title}
                            onChangeText={this.onChangeText('value_title')}/>
                        <View>
                            <Text style={{fontSize: 12}}>Kind of book (Click plus button to add book)</Text>
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
                                                    <Item regular style={{height: 30, borderColor: '#FFF'}}>
                                                        <Input keyboardType="numeric" style={{fontSize: 12}} value={v.count.toString()}/>
                                                    </Item>
                                                </View>
                                                <View style={{width: '30%'}}>
                                                    <Button full info style={{height: 30}} onPress={this.onDown(v.key, k)}>
                                                        <Icon color={'#FFF'} size={12}
                                                              name="chevron-down"/>
                                                    </Button>
                                                </View>
                                            </View>
                                            <TouchableWithoutFeedback key={k} onPress={this.onCheck(v.value, k)}>
                                                <View style={{width: '70%', flexDirection: 'row', paddingLeft: 5}}>
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
                            <Button info style={{width: 50, justifyContent: 'center'}} onPress={this.onOpenClick()}>
                                <Icon color={'#FFF'} size={20}
                                      name="plus"/>
                            </Button>
                        </View>
                        <InputTextArea
                            onBlur={this.onValidate('value_description')}
                            value={this.state.value_description}
                            onChangeText={this.onChangeText('value_description')}
                            isError={this.state.input_error.value_description}
                            label={'Description'}
                        />
                        <InputText
                            value={this.state.value_note}
                            onChangeText={this.onChangeText('value_note')}
                            label={"Note"}/>
                        <InputText
                            onBlur={this.onValidate('value_reserve_name')}
                            isError={this.state.input_error.value_reserve_name}
                            value={this.state.value_reserve_name}
                            onChangeText={this.onChangeText('value_reserve_name')}
                            label={"Reserve name"}/>
                        <InputText
                            onBlur={this.onValidate('value_reserve_cp')}
                            isError={this.state.input_error.value_reserve_cp}
                            value={this.state.value_reserve_cp}
                            onChangeText={this.onChangeText('value_reserve_cp')}
                            label={"Reserve Contact Person"}/>
                        <View style={{marginTop: 5, marginBottom: 5}}>
                            <Text style={{fontSize: 12, marginBottom: 5}}>Image (Click plus button to add image)</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview0', 'imgValue0')}>
                                    <View style={{
                                        height: width / 3,
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                        width: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E3F2FD'
                                    }}>
                                        {
                                            this.state.imgPreview0.length > 0
                                                ?
                                                <Image

                                                    style={{width: width / 3, height: width / 3}}
                                                    source={{isStatic: true, uri: this.state.imgPreview0}}/>
                                                :
                                                <Icon color={'#FFF'} size={20}
                                                      name="picture-o"/>
                                        }


                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview1', 'imgValue1')}>
                                    <View style={{
                                        height: width / 3,
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                        width: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E3F2FD'
                                    }}>
                                        {
                                            this.state.imgPreview1.length > 0
                                                ?
                                                <Image

                                                    style={{width: width / 3, height: width / 3}}
                                                    source={{isStatic: true, uri: this.state.imgPreview1}}/>
                                                :
                                                <Icon color={'#FFF'} size={20}
                                                      name="picture-o"/>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview2', 'imgValue2')}>
                                    <View style={{
                                        height: width / 3,
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                        width: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E3F2FD'
                                    }}>
                                        {
                                            this.state.imgPreview2.length > 0
                                                ?
                                                <Image

                                                    style={{width: width / 3, height: width / 3}}
                                                    source={{isStatic: true, uri: this.state.imgPreview2}}/>
                                                :
                                                <Icon color={'#FFF'} size={20}
                                                      name="picture-o"/>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview3', 'imgValue3')}>
                                    <View style={{
                                        height: width / 3,
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                        width: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E3F2FD'
                                    }}>
                                        {
                                            this.state.imgPreview3.length > 0
                                                ?
                                                <Image

                                                    style={{width: width / 3, height: width / 3}}
                                                    source={{isStatic: true, uri: this.state.imgPreview3}}/>
                                                :
                                                <Icon color={'#FFF'} size={20}
                                                      name="picture-o"/>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview4', 'imgValue4')}>
                                    <View style={{
                                        height: width / 3,
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                        width: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E3F2FD'
                                    }}>
                                        {
                                            this.state.imgPreview4.length > 0
                                                ?
                                                <Image

                                                    style={{width: width / 3, height: width / 3}}
                                                    source={{isStatic: true, uri: this.state.imgPreview4}}/>
                                                :
                                                <Icon color={'#FFF'} size={20}
                                                      name="picture-o"/>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={this.onPickImage('imgPreview5', 'imgValue5')}>
                                    <View style={{
                                        height: width / 3,
                                        overflow: 'hidden',
                                        borderRadius: 5,
                                        width: width / 3,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#E3F2FD'
                                    }}>
                                        {
                                            this.state.imgPreview5.length > 0
                                                ?
                                                <Image

                                                    style={{width: width / 3, height: width / 3}}
                                                    source={{isStatic: true, uri: this.state.imgPreview5}}/>
                                                :
                                                <Icon color={'#FFF'} size={20}
                                                      name="picture-o"/>
                                        }
                                    </View>
                                </TouchableWithoutFeedback>

                            </View>

                        </View>
                        <InputTextArea
                            onBlur={this.onValidate('value_address')}
                            value={this.state.value_address}
                            onChangeText={this.onChangeText('value_address')}
                            isError={this.state.input_error.value_address}
                            label={'Address'}
                        />
                        <InputSelect label={"Province"} onClick={this.onProvinceClick()}
                                     value={this.state.province_value}/>
                        <InputSelect label={"District"} value={this.state.district_value}
                                     onClick={this.state.province_value.length !== 0 ? this.onDistrictClick() : () => console.log("lala")}/>
                        <InputSelect label={"Sub District"} value={this.state.sub_district_value}
                                     onClick={this.state.province_value.length !== 0 && this.state.district_value.length !== 0 ? this.onSubDistrictClick() : () => console.log("lala")}/>
                        {/*<InputText label={"Location"}/>*/}
                        <InputDate label={"Donation end date"} onClick={this._showDateTimePicker}
                                   value={this.state.endDatePreview}/>
                        <View style={{flex: 1}}>
                            <DateTimePicker
                                minimumDate={tomorrow}
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                            />
                        </View>
                    </View>
                    <Button block info onPress={this.onCreate()}>
                        <Text>Create</Text>
                    </Button>
                </Content>
            </Container>
        );
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
    return {
        redAuth: state.redAuth
    };
}

export default connect(
    mapStateToProps,
)(ScreenCreateReserve);
