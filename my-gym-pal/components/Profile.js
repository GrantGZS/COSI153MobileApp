import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from './AuthContext';

const Profile = () => {
  const { authState, updateTrainingPlan } = useContext(AuthContext);
  const { token, trainingPlan } = authState;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      console.log('Fetching profile with token:', token);
      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
        console.log('in fetchProfile trainingPlan ',data.trainingPlan);
        //updateTrainingPlan(data.trainingPlan); 
        console.log('in fetchProfile at the end trainingPlan', trainingPlan);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
    console.log(' after fetchprofile called in fetchProfile at the end trainingPlan', trainingPlan);
  }, [token]);

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Username: {profile.username}</Text>
      <Text>Height: {profile.height}</Text>
      <Text>Weight: {profile.weight}</Text>
      <Text>Mode: {profile.mode}</Text>
      <Text>Training Plan:</Text>
      <FlatList
        data={trainingPlan}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text>{item.instructions}</Text>
            <Text>Type: {item.type}</Text>
            <Text>Equipment: {item.equipment}</Text>
            <Text>Difficulty: {item.difficulty}</Text>
          </View>
        )}
        style={styles.exerciseList}
      />
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
  exerciseContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseList: {
    width: '100%',
  },
});

export default Profile;
