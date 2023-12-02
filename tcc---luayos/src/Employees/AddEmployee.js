// AddEmployee.js

import React, { useState, useEffect  } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from './services/api';

const AddEmployee = ({ navigation, onAdd , route}) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cep, setCep] = useState();
  const [endereco, setEndereco] = useState([]);
  const [status, setStatus] = useState(true); // Padrão: Ativo
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [benefits, setBenefits] = useState([]);
  const [selectedBenefits1, setSelectedBenefits1] = useState('');
  const [selectedBenefits2, setSelectedBenefits2] = useState('');

  const logradouro = endereco.logradouro;
  const bairro = endereco.bairro;
  const uf = endereco.uf;

useEffect(() => {
    // Carregue os benefícios ao iniciar o componente
    loadBenefits();
  }, []);

  const loadBenefits = async () => {
    try {
      const benefitsData = await AsyncStorage.getItem('benefits');
      if (benefitsData) {
        const parsedBenefits = JSON.parse(benefitsData);
        setBenefits(parsedBenefits);
      if (parsedBenefits > 0) {
          // Se houver cargos, selecione o primeiro por padrão
          setSelectedJob(parsedBenefits [0].benef);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error);
    }
  };

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

  const consultaCep = async (cep) => {
    const response = await api.get('/' + cep + '/json/');
    setEndereco(response.data)
  }


  const handleAddEmployee = async () => {
    navigation.goBack();

    

    if (name && lastName && cpf && email && logradouro && bairro && uf && phone && cep ) {
      try {
        // Crie um novo funcionário com um ID único
        const newEmployee = {
          id: Date.now(),
          name,
          lastName,
          cpf,
          email,
          logradouro,
          bairro,
          uf,
          phone,
          status,
          cep,
          selectedJob,
          selectedBenefits1,
          selectedBenefits2
        };

        // Obtenha os funcionários existentes
        const employeesData = await AsyncStorage.getItem('employees');
        const existingEmployees = employeesData
          ? JSON.parse(employeesData)
          : [];

        // Adicione o novo funcionário à lista existente
        const updatedEmployees = [...existingEmployees, newEmployee];

        // Atualize o AsyncStorage com a lista atualizada de funcionários
        await AsyncStorage.setItem(
          'employees',
          JSON.stringify(updatedEmployees)
        );

        // Chame a função de atualização passada como prop
        onAdd();

        // Volte para a lista de funcionários
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Funcionário:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Sobrenome:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />

      <Text style={styles.label}>Telefone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />

      <Text style={styles.label}>CPF:</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        onChangeText={(text) => setCPF(text)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Cargo:</Text>
      <Picker
        style={styles.input}
        selectedValue={selectedJob}
        onValueChange={(text) => setSelectedJob(text)}
      >
        <Picker.Item label="Selecione o cargo" value=""/>
        {jobs.map((job) => (
          <Picker.Item key={job.id} label={job.title} value={job.title} />
        ))}
      </Picker>

      <Text style={styles.label}>Beneficio 1:</Text>
      <Picker
        style={styles.input}
        selectedValue={selectedBenefits1}
        onValueChange={(text) => setSelectedBenefits1(text)}
      >
        <Picker.Item label="Selecione o benefício" value=""/>
        {benefits.map((benefit) => (
          <Picker.Item key={benefit.id} label={benefit.benef} value={benefits.benef} />
        ))}
      </Picker>

       <Text style={styles.label}>Beneficio 2:</Text>
      <Picker
        style={styles.input}
        selectedValue={selectedBenefits2}
        onValueChange={(text) => setSelectedBenefits2(text)}
      >
          <Picker.Item label="Selecione o benefício" value=""/>
        {benefits.map((benefit) => (
          <Picker.Item key={benefit.id} label={benefit.benef} value={benefits.benef} />
        ))}
      </Picker>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={styles.label}>CEP:</Text>
        
          <TextInput
            style={styles.inputCep}
            value={cep}
            onChangeText={(text) => setCep(text)}
        />
        </View>
          <View style={{marginTop: 27}}>
          <TouchableOpacity onPress={() => consultaCep(cep)}>
            <Icon style={styles.icon} name="arrow-right" size={25} color="#363636" />
          </TouchableOpacity>
        </View>
      </View>
        
      <Text style={{fontSize: 15, fontWeight:'bold',}}>Endereço:</Text> <Text style={{fontSize: 15, marginBottom: 10}}>{logradouro}, {bairro} - {uf}</Text>

      <Text style={styles.label}>Status: 
    <Text style={{color: 'red'}}> Inativo </Text><Switch style={{marginTop: 10, width: 15, height: 15}} value={status} onValueChange={(value) => setStatus(value)} thumbColor='red'/> <Text style={{color: 'green'}}> Ativo </Text>
     </Text> 
      <TouchableOpacity onPress={handleAddEmployee}>
        <Text style={styles.addButton}>Adicionar Funcionário</Text>
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
  inputCep:{
    height: 40,
    width: 210,
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
  icon:{
    backgroundColor: '#00BFFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#696969',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 7,
    paddingRight: 7
  }
});

export default AddEmployee;