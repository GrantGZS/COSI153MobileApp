import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import About from './components/About.js';
import Setting from './components/Setting.js';
import PageLabel from './components/Pagelabel.js';
import HomePage from './components/Homepage.js';
import MuscleBuild from './components/MuscleBuild.js';
import Profile from './components/Profile.js'
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HomePage navigation={navigation} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Setting navigation={navigation} />
    </View>
  );
}

function AboutScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <About />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Profile navigation={navigation} />
    </View>
  );
}
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => <PageLabel labelText={route.name} />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="MuscleBuild" component={MuscleBuild} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
