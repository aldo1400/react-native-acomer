import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'

import Swiper from 'react-native-swiper'

const {width,height} = Dimensions.get('window')

const Slider = props => ( <View style={styles.container}>
        <Image style={styles.image} source={props.uri}/>
    </View>
)

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        height:height
    },
    image: {
        flex: 1,
        height:height,
        width
    }
}

export default class extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            imagesSlider: [
                require('../images/sl.jpg'),
                require('../images/sl.jpg'),
               
                require('../images/sl.jpg')
            ]
        }
    }
    render(){
        return (
            <View style={{flex:0.4}}>
            
                <Swiper
                    autoplay
                    height={150}
                    dotColor="white"
                    showsButtons={true}
                    // dot={{}}
                >
                
                {
                    this.state.imagesSlider.map((item, i) => <Slider 
                        uri={item}
                        key={i}
                    />)
                }

                </Swiper>
            </View>
        )
    }
}