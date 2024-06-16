import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PageLabel = ({ labelText }) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{labelText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: '#7CFC00', // Grass green
    borderColor: '#00BFFF', // Sky blue
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000080', // Navy blue for text color
  },
});

export default PageLabel;