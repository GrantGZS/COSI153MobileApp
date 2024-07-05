import React, { useState } from 'react';
import { CheckBox, Picker, View, Text, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';


const MuscleBuild = () => {
  const [muscle, setMuscle] = useState('');
  const [exercises, setExercises] = useState([]);

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

  const handleSaveToPlan = () => {
    const selectedItems = exercises.filter(exercise => exercise.selected);
    console.log('Selected Exercises:', selectedItems);
    // Save selectedItems to user's training plan in the backend
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Target Muscle:</Text>
      <Picker
        selectedValue={muscle}
        style={styles.picker}
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
