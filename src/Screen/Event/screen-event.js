import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native'
import { View, Text, Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Ticket } from '../../Components/Ticket'
function mapStateToProps(state) {
    return {

    };
}

class ScreenEvent extends Component {
    render() {
        return (
            <Container>
                <View style={{ height: 50 }}>

                </View>
                <Content style={{ backgroundColor: '#FFF' }}>
                    <Ticket
                        data={{ title: 'Reduce, Reuse, Recycle', date: 'Thursday, 12 May 2018', time: '10 PM' }}
                        image={'https://marketplace.canva.com/MAB5W1orBoM/1/0/thumbnail_large/canva-environment-classroom-poster-MAB5W1orBoM.jpg'}
                        bg_color={'#B2FF59'}
                        sec_color={'#CCFF90'} />
                    <Ticket
                        data={{ title: 'Concert For Kid', date: 'Thursday, 12 May 2018', time: '10 PM' }}
                        image={'https://marketplace.canva.com/MAB1GLyFELM/2/0/thumbnail_large/canva-concert-for-kids-fundraising-poster-MAB1GLyFELM.jpg'}
                        bg_color={'#29B6F6'}
                        sec_color={'#B3E5FC'} />
                    <Ticket
                        data={{ title: 'Blood Donation', date: 'Thursday, 12 May 2018', time: '10 PM' }}
                        image={'https://marketplace.canva.com/MACXhzcB8NQ/4/0/thumbnail_large/canva-red-and-pink-blood-donation-poster-MACXhzcB8NQ.jpg'}
                        bg_color={'#EF9A9A'}
                        sec_color={'#FFCDD2'} />
                    <Ticket
                        data={{ title: 'Autumn Movie Marathon', date: 'Thursday, 12 May 2018', time: '10 PM' }}
                        image={'https://marketplace.canva.com/MACGp2rUBsI/2/0/thumbnail_large/canva-burgundy-thanksgiving-movie-marathon-poster-MACGp2rUBsI.jpg'}
                        bg_color={'#B71C1C'}
                        sec_color={'#E65100'} />
                    <Ticket
                        data={{ title: 'Bright Music', date: 'Thursday, 12 May 2018', time: '10 PM' }}
                        image={'https://marketplace.canva.com/MAB00NXwDDk/2/0/thumbnail_large/canva-music-poster-MAB00NXwDDk.jpg'}
                        bg_color={'#80DEEA'}
                        sec_color={'#4DD0E1'} />

                    




                </Content>

            </Container>
        );
    }
}

export default connect(
    mapStateToProps,
)(ScreenEvent);