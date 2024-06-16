import React,{useState} from 'react';
import {StyleSheet, Text, View, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const Setting=()=>{
    const [Mode, setMode] = useState('');
    return( 
        <View style={styles.container}> 
        <Text style={styles.model}>Choose your mode:</Text>
        <Picker
        mode={Mode}
        style={styles.picker}
        onValueChange={(Mode) => setMode(Mode)}
        >
        <Picker.Item label="Lose Weight" value="lose weight" />
        <Picker.Item label="Build Muscle" value="build muscle" />
        <Picker.Item label="Stay Fit" value="stay fit" />
      </Picker>
      <Text style={styles.model}>Selected Mode: {Mode}</Text>
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
    model:{
        fontFamily:'Arial' ,
        
        fontWeight:'bold',
        fontSize:30,
        color:'#228c22'
    }
    
});

export default Setting;