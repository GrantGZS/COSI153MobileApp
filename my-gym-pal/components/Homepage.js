import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from './AuthContext';

const HomePage = ({ navigation }) => {
  const { authState, login, logout } = useContext(AuthContext);
  const { isLoggedIn, username, token } = authState;
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [mode, setMode] = useState('');

  const handleLogin = async () => {
    try {
      console.log('handleLogin in Homepage hit');
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('handleLogin successful:', result);
        login(loginUsername, result.token, result.trainingPlan); // Call login with token and training plan
        Alert.alert('Login Successful', 'You have successfully logged in');
      } else {
        console.log('handleLogin failed:', result.message);
        Alert.alert('Login Failed', result.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Login Failed', 'An error occurred while logging in');
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: registerUsername, password: registerPassword, height, weight, mode }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Registration Successful', 'You have successfully registered');
      } else {
        Alert.alert('Registration Failed', result.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Registration Failed', 'An error occurred while registering');
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <>
          <Text style={styles.greeting}>Hello, {username}</Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={loginUsername}
            onChangeText={setLoginUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={loginPassword}
            onChangeText={setLoginPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />

          <Text style={styles.title}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={registerUsername}
            onChangeText={setRegisterUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={registerPassword}
            onChangeText={setRegisterPassword}
            secureTextEntry
          />
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
          <TextInput
            style={styles.input}
            placeholder="Mode"
            value={mode}
            onChangeText={setMode}
          />
          <Button title="Register" onPress={handleRegister} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
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
  greeting: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default HomePage;
