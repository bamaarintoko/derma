import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, FlatList, TouchableWithoutFeedback, TouchableHighlight} from "react-native"
import {Button, Container, Content, Input, Item, Text, Textarea, View} from "native-base";
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box'
import Api from "../../Utils/Api";
import {InputText, InputSelect} from "../../Components/Input";

const val = [];
const kategori = [
    {
        value: 'Science fiction',
        key: 'science_fiction',
        check: false
    },
    {
        value: 'Satire',
        key: 'satire',
        check: false
    },
    {
        value: 'Drama',
        key: 'drama',
        check: false
    },
    {
        value: 'Action and Adventure',
        key: 'action_and_adventure',
        check: false
    },
    {
        value: 'Romance',
        key: 'romance',
        check: false
    },
    {
        value: 'Mystery',
        key: 'mystery',
        check: false
    },
    {
        value: 'Horror',
        key: 'horror',
        check: false
    },
    {
        value: 'Self help',
        key: 'self_help',
        check: false
    },
    {
        value: 'Health',
        key: 'health',
        check: false
    },
    {
        value: 'Travel',
        key: 'travel',
        check: false
    },
    {
        value: 'Children\'s',
        key: 'children\'s',
        check: false
    },
    {
        value: 'Religion, Spirituality & New Age',
        key: 'religian_spirituality_age',
        check: false
    },
    {
        value: 'Science',
        key: 'science',
        check: false
    },
    {
        value: 'History',
        key: 'history',
        check: false
    },
    {
        value: 'Math',
        key: 'math',
        check: false
    },
    {
        value: 'Anthology',
        key: 'anthology',
        check: false
    }
]

class ScreenCreateReserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            keyword: ''
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
            kategori[idx].check = kategori[idx].check === false
            this.setState({
                data: kategori
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
                        <InputText label={"Title"}/>
                        <InputText label={"Receive"}/>
                        <View>
                            <Text style={{fontSize: 12}}>Kind of book (Click plus button to add book)</Text>
                            {

                                this.state.data.map((v, k) => {
                                    return (
                                        v.check
                                        &&
                                        <TouchableWithoutFeedback key={k} onPress={this.onCheck(v.value, k)}>
                                            <View key={k} style={{marginBottom: 5, flexDirection: 'row'}}>
                                                <View style={{width: '90%'}}>

                                                    <Text>{v.value}</Text>
                                                </View>
                                                <View style={{width: '20%'}}>
                                                    <Icon color={'red'} size={20}
                                                          name="minus-circle"/>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                })
                            }
                            <Button info style={{width: 50, justifyContent: 'center'}} onPress={this.onOpenClick()}>
                                <Icon color={'#FFF'} size={20}
                                      name="plus"/>
                            </Button>
                        </View>
                        <View style={{marginTop: 5}}>
                            <Text style={{fontSize: 12}}>Description</Text>
                            <Textarea rowSpan={5} bordered/>
                        </View>
                        <View style={{marginTop: 5, marginBottom: 5}}>
                            <Text style={{fontSize: 12, marginBottom: 5}}>Image (Click plus button to add image
                                location)</Text>
                            <Button block info style={{justifyContent: 'center', width: 50}}
                                    onPress={this.onPickClick()}>
                                <Icon color={'#FFF'} size={20}
                                      name="picture-o"/>
                            </Button>
                        </View>
                        <InputText label={"Address"}/>
                        <InputSelect label={"Province"} onClick={this.onProvinceClick()}
                                     value={this.state.province_value}/>
                        <InputSelect label={"District"} value={this.state.district_value}
                                     onClick={this.state.province_value.length !== 0 ? this.onDistrictClick() : () => console.log("lala")}/>
                        <InputSelect label={"Sub District"} value={this.state.sub_district_value}
                                     onClick={this.state.province_value.length !== 0 && this.state.district_value.length !== 0 ? this.onSubDistrictClick() : () => console.log("lala")}/>
                        <InputText label={"Location"}/>
                    </View>
                    <Button block info>
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
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenCreateReserve);
