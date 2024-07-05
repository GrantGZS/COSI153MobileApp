import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from './AuthContext';

const Profile = ({ navigation }) => {
  const { authState } = useContext(AuthContext);
  const { token } = authState;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
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
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
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
        data={profile.trainingPlan.exercises}
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
