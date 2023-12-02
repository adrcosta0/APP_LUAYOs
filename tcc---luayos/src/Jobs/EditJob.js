// EditJob.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const EditJob = ({ route, navigation }) => {
  const { job, onUpdate } = route.params;
  const [title, setTitle] = useState(job.title);
  const [salary, setSalary] = useState(job.salary);


  useEffect(() => {
    navigation.setOptions({ title: `Editar Cargo: ${job.title}` });
  }, [job.title, navigation]);

  const handleUpdateJob = async () => {
    if (title && salary) {
      try {
        // Obtenha os cargos existentes
        const jobsData = await AsyncStorage.getItem('jobs');
        const existingJobs = jobsData ? JSON.parse(jobsData) : [];

        // Atualize o cargo existente
        const updatedJobs = existingJobs.map((emp) =>
          emp.id === job.id ? { ...emp, title, salary } : emp
        );

        // Atualize o AsyncStorage com a lista atualizada de cargos
        await AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));

        // Chame a função de atualização passada como prop
        onUpdate();

        // Volte para a lista de cargos
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao atualizar cargo:', error);
      }
    }
  };

    return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome Cargo:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Salario:</Text>
      <TextInput
        style={styles.input}
        value={salary}
        onChangeText={(text) => setSalary(text)}
      />

      <TouchableOpacity onPress={handleUpdateJob}>
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

export default EditJob;
