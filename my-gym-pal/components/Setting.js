import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MuscleBuild from './MuscleBuild.js';

import { AuthContext } from './AuthContext';

const Setting = ({ navigation }) => {
  const { authState, logout } = useContext(AuthContext);
  const { isLoggedIn, username, token } = authState;
  const [mode, setMode] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('Home');
    }
  }, [isLoggedIn]);

  const handleModify = () => {
    // Here you would send the modified data to the backend
    console.log('Modifying user data:', { height, weight, mode });
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.greeting}>Hello, {username}</Text>
          <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Choose your mode:</Text>
          <Picker
            selectedValue={mode}
            style={styles.picker}
            onValueChange={(itemValue) => setMode(itemValue)}
          >
            <Picker.Item label="Lose Weight" value="lose weight" />
            <Picker.Item label="Build Muscle" value="build muscle" />
            <Picker.Item label="Stay Fit" value="stay fit" />
          </Picker>
          <Button title="Modify" onPress={handleModify} />
          <Button title="Get Your Exercise" onPress={() => navigation.navigate(MuscleBuild)} />
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <View style={styles.unauthContainer}>
          <Text style={styles.unauthMessage}>
            You are not logged in. Please{' '}
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text style={styles.linkText}>go back to the homepage</Text>
            </TouchableOpacity>{' '}
            to login or register.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  greeting: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: '80%',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '80%',
    marginBottom: 16,
  },
  unauthContainer: {
    alignItems: 'center',
  },
  unauthMessage: {
    fontSize: 18,
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Setting;
