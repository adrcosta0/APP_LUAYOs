// AddJob.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddJob = ({ navigation, onAdd }) => {
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState(0);

  
  const handleAddJob = async () => {
    navigation.goBack();

    

    if (title && salary) {
      try {
        // Crie um novo cargo com um ID único
        const newJob = {
          id: Date.now(),
          title, 
          salary,
        };

        // Obtenha os cargos existentes
        const jobData = await AsyncStorage.getItem('jobs');
        const existingJobs = jobData
          ? JSON.parse(jobData)
          : [];

        // Adicione o novo cargo à lista existente
        const updatedJobs = [...existingJobs, newJob];

        // Atualize o AsyncStorage com a lista atualizada de cargos
        await AsyncStorage.setItem(
          'jobs',
          JSON.stringify(updatedJobs)
        );

        // Chame a função de atualização passada como prop
        onAdd();

        // Volte para a lista de cargos
      } catch (error) {
        console.error('Erro ao adicionar cargo:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cargo:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Salário:</Text>
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />

      <TouchableOpacity onPress={handleAddJob}>
        <Text style={styles.addButton}>Adicionar Cargo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
  },
  addButton: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#696969',
    backgroundColor: '#00FF7F',
    paddingBottom: 5,
    paddingTop: 5
  },
});
export default AddJob;
