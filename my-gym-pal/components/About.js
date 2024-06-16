import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

const About=()=>{
    return(
        <View style={styles.container}>
        <Text style={{fontFamily:'Arial' ,fontWeight:'bold',fontSize:40, color:'#52b2bf'}}>My Gym Pal</Text> 
        <Text style={styles.intro}>Welcome to our Training Plan App, your ultimate companion in achieving your fitness goals! 
            Our app is designed to create personalized daily training plans based on your unique body metrics and desired outcomes.
             Whether you're aiming to lose weight, build muscle, or simply stay fit, our app will guide you every step of the way.

        </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingLeft:150,
        paddingRight:150,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    intro:{
        fontFamily:'Arial',
        fontSize:25,
        fontStyle:'italic',
        color:'#228c22'
    }
});

export default About;