// EmployeeShow.js

import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';



const EmployeeShow = ({ route }) => {

  
  const { employee } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Funcionário</Text>

      <View style={styles.details}>
        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Nome:</Text> {employee.name} {employee.lastName}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Telefone:</Text> {employee.phone}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>CPF:</Text> {employee.cpf}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>E-mail:</Text> {employee.email}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Cargo:</Text> {employee.selectedJob}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Benefício 1:</Text> {employee.selectedBenefits1}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Benefício 2:</Text> {employee.selectedBenefits2}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>CEP: </Text> {employee.cep} 
        </Text>
        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Endereço:</Text> {employee.logradouro}, {employee.bairro} - {employee.uf}
        </Text>

        <Text style={styles.areaLabel}>
          <Text style={styles.label}>Status:</Text>{' '}
          <Text style={{ fontWeight: 'bold', color: employee.status ? 'green' : 'red' }}>
            {employee.status ? 'Ativo' : 'Inativo'}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  details: {
    borderWidth: 2,
    borderColor: '#C0C0C0',
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
  },
  areaLabel:{
    marginBottom: 10,
    fontSize: 17
  },
  label: {
    fontWeight: 'bold',
    fontSize: 17
  },
});

export default EmployeeShow;
