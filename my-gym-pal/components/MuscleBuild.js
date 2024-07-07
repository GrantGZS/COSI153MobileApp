import React, { useState, useContext } from 'react';
import { CheckBox, Picker, View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import TrainingPlan from '../backend/models/TrainingPlan';

const MuscleBuild = () => {
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState([]);
  const { authState, updateTrainingPlan } = useContext(AuthContext);
  const { token } = authState;

  const fetchExercises = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/exercise/${muscle}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      setExercises(result.map(exercise => ({ ...exercise, selected: false })));
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleCheckboxChange = (index) => {
    const newExercises = [...exercises];
    newExercises[index].selected = !newExercises[index].selected;
    setExercises(newExercises);
  };

  const handleSaveToPlan = async () => {
    const selectedItems = exercises.filter(exercise => exercise.selected).map(({ selected, ...exercise }) => exercise);
    console.log('Selected Exercises:', selectedItems);
    console.log('will fetch with token: ',authState.token);
    // Save selectedItems to user's training plan in the backend
    try {
      const response = await fetch('http://localhost:8080/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ trainingPlan: selectedItems }),
      });
      
      if (response.ok) {
        updateTrainingPlan(selectedItems);
        console.log('Training Plan Updated', 'Your training plan has been updated successfully.');
        console.log('after update the trainingPlan is ',authState.trainingPlan);
        Alert.alert('Training Plan Updated', 'Your training plan has been updated successfully.');
      } else {
        const result = await response.json();
        Alert.alert('Update Failed', result.message);
      }
    } catch (error) {
      console.error('Error updating training plan:', error);
      Alert.alert('Update Failed', 'An error occurred while updating your training plan.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Target Muscle:</Text>
      <Picker
        selectedValue={muscle}
        style={styles.picker}s
        onValueChange={(itemValue) => setMuscle(itemValue)}
      >
        <Picker.Item label="Biceps" value="biceps" />
        <Picker.Item label="Triceps" value="triceps" />
        <Picker.Item label="Chest" value="chest" />
        <Picker.Item label="Back" value="back" />
        <Picker.Item label="Legs" value="legs" />
        <Picker.Item label="Shoulders" value="shoulders" />
      </Picker>
      <Button title="Get Exercises" onPress={fetchExercises} />
      <FlatList
        data={exercises}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.exerciseContainer}>
            <CheckBox
              value={item.selected}
              onValueChange={() => handleCheckboxChange(index)}
            />
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text>{item.instructions}</Text>
              <Text>Type: {item.type}</Text>
              <Text>Equipment: {item.equipment}</Text>
              <Text>Difficulty: {item.difficulty}</Text>
            </View>
          </View>
        )}
        
        contentContainerStyle={styles.exerciseList}
      />
      <Button title="Save to Plan" onPress={handleSaveToPlan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  exerciseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  exerciseInfo: {
    marginLeft: 10,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseList: {
    height:40,
    paddingBottom: 20,
  },
});

export default MuscleBuild;
