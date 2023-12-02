// JobList.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


const JobList = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Carregue os cargos ao iniciar o componente
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const jobsData = await AsyncStorage.getItem('jobs');
      if (jobsData) {
        const parsedJobs = JSON.parse(jobsData);
        setJobs(parsedJobs);
      }
    } catch (error) {
      console.error('Erro ao carregar cargos:', error);
    }
  };

  const handleEdit = (job) => {
    // Navegue para a tela de edição com os detalhes do cargo
    navigation.navigate('EditJob', { job, onUpdate: loadJobs });
  };

  const handleDelete = async (jobId) => {
    try {
      // Remova o cargo com o ID especificado
      const updatedJobs = jobs.filter((job) => job.id !== jobId);
      await AsyncStorage.setItem('jobs', JSON.stringify(updatedJobs));
      setJobs(updatedJobs);
    } catch (error) {
      console.error('Erro ao excluir cargo:', error);
    }
  };

  const handleAddJob = () => {
    // Navegue para a tela de adição de cargo
    navigation.navigate('AddJob', { onAdd: loadJobs });
  };

  const handleRefresh = () => {
    // Atualize manualmente a lista de cargos
    loadJobs();
  };

 const renderJobItem = ({ item }) => (
    <View style={styles.jobItem} >
      
      <View >
        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Cargo: </Text> <Text style={styles.text}>{item.title}</Text>
        </Text>

        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Salario: </Text> <Text style={styles.text}>R${item.salary}</Text>
        </Text>
        
      </View>

      <View style={styles.areaButton} >
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon style={styles.editButton} name="pencil" size={15} color="#363636" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon style={styles.deleteButton} name="trash" size={15} color="#363636" />
        </TouchableOpacity>
      </View>
      
    </View>

    
  );

  return (
    <View style={styles.container}>
        <View style={styles.areaTitleButton}>
        <View style={styles.areaJob}> 
          <Text style={styles.areaTextJob}>Cargos</Text>
        </View>
          <View style={styles.areaUpdateButton}>
            <TouchableOpacity onPress={handleRefresh}>
              <Icon style={styles.updateButton} name="rotate-right" size={15} color="#363636" />
            </TouchableOpacity>
          </View>
          <View style={styles.areaUpdateButton}>
                <TouchableOpacity onPress={handleAddJob}>
                  <Text style={styles.registrationButton}>+</Text>
                </TouchableOpacity>
          </View>
      </View>

    
      <ScrollView showsVerticalScrollIndicator={true}>
      <View style={{marginTop: 35}}> 
        <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderJobItem}
      />
      </View>
      </ScrollView>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  jobItem: {  
    borderWidth: 2,
    borderColor: '#C0C0C0',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 13,
    padding: 10,
  },

  areaUpdateButton:{
    alignItems: 'center',
    marginBottom: 7
  },
  updateButton:{
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#696969',
    backgroundColor: '#FFD700',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 7,
    paddingLeft: 7,
    marginTop: 7,
    marginLeft: 72,
    marginRight: 7
  },
    registrationButton:{
   borderWidth: 2,
    borderRadius: 5,
    borderColor: '#363636',
    backgroundColor: '#8B008B',
    color: '#fff',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 7,
    paddingLeft: 7,
    marginTop: 7,
    marginLeft: 11

  },
  areaButton:{
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  editButton: {
    color: '#FFD700',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
  areaTitle:{
    marginBottom: 4,
  },
  title:{
    fontWeight:'bold'
  },
  text:{
    color: '#000'
  },
  areaJob:{
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 20
  },
  areaTextJob:{
    fontSize: 27,
    fontWeight: 'bold'
  },
areaTitleButton: {
  flex: 1,
  flexDirection: 'row',
  position: 'absolute',
  top: 10, 
  justifyContent: 'center',
  backgroundColor: '#eee',
  zIndex: 1,  // Adicione esta linha
}

});

export default JobList;
