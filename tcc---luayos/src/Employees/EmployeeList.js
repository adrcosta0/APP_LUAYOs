// EmployeeList.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';



const EmployeeList = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);

  function irShow(employee) {
    navigation.navigate('EmployeeShow', { employee });
  }
  useEffect(() => {
    // Carregue os funcionários ao iniciar o componente
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const employeesData = await AsyncStorage.getItem('employees');
      if (employeesData) {
        const parsedEmployees = JSON.parse(employeesData);
        setEmployees(parsedEmployees);
      }
    } catch (error) {
      console.error('Erro ao carregar funcionários:', error);
    }
  };

  const handleEdit = (employee) => {
    // Navegue para a tela de edição com os detalhes do funcionário
    navigation.navigate('EditEmployee', { employee, onUpdate: loadEmployees });
  };

  const handleDelete = async (employeeId) => {
    try {
      // Remova o funcionário com o ID especificado
      const updatedEmployees = employees.filter((employee) => employee.id !== employeeId);
      await AsyncStorage.setItem('employees', JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  };

  const handleAddEmployee = () => {
    // Navegue para a tela de adição de funcionário
    navigation.navigate('AddEmployee', { onAdd: loadEmployees });
  };

  const handleRefresh = () => {
    // Atualize manualmente a lista de funcionários
    loadEmployees();
  };

  const renderEmployeeItem = ({ item }) => (
    <View style={styles.employeeItem} >
      
      <View >
        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Nome: </Text> <Text style={styles.text}>{item.name} {item.lastName}</Text>
        </Text>

        <Text style={styles.areaTitle}>
          <Text style={styles.title}>CPF: </Text> <Text style={styles.text}>{item.cpf}</Text>
        </Text>

        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Cargo: </Text> <Text style={styles.text}>{item.selectedJob}</Text>
        </Text>

        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Status:</Text> <Text style={{ fontWeight: 'bold', color: item.status ? 'green' : 'red'}}>{item.status ? 'Ativo' : 'Inativo'}</Text>
        </Text>
      </View>

      <View style={styles.areaButton} >
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Icon style={styles.editButton} name="pencil" size={15} color="#363636" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon style={styles.deleteButton} name="trash" size={15} color="#363636" />
        </TouchableOpacity>
      

         <TouchableOpacity onPress={()=> irShow(item)}>
          <Icon style={styles.showButton} name="eye" size={15} color="#363636" />
        </TouchableOpacity>
      </View>
      
    </View>

    
  );

  return (
    <View style={styles.container}>
        <View style={styles.areaTitleButton}>
        <View style={styles.areaEmployee}> 
          <Text style={styles.areaTextEmployee}>Funcionários</Text>
        </View>
          <View style={styles.areaUpdateButton}>
            <TouchableOpacity onPress={handleRefresh}>
              <Icon style={styles.updateButton} name="rotate-right" size={15} color="#363636" />
            </TouchableOpacity>
          </View>
          <View style={styles.areaUpdateButton}>
                <TouchableOpacity onPress={handleAddEmployee}>
                  <Text style={styles.registrationButton}>+</Text>
                </TouchableOpacity>
          </View>
      </View>

    
      <ScrollView showsVerticalScrollIndicator={true}>
      <View style={{marginTop: 35}}> 
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderEmployeeItem}
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
  employeeItem: {  
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
    marginLeft: 7,
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
  showButton:{
    color: 'blue'
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
  areaEmployee:{
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 10
  },
  areaTextEmployee:{
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

export default EmployeeList;
