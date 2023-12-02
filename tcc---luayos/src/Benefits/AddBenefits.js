// AddBenefit.js
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
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AddBenefit = ({ navigation, onAdd }) => {
  const [benef, setBenef] = useState('');
  const [type, setType] = useState('');
  const [valueBenef, setValueBenef] = useState(0);

  
  const handleAddBenefit = async () => {
    navigation.goBack();

    

    if (benef && type && valueBenef) {
      try {
        // Crie um novo benefício com um ID único
        const newBenefit = {
          id: Date.now(),
          benef, 
          type,
          valueBenef
        };

        // Obtenha os benefícios existentes
        const benefitData = await AsyncStorage.getItem('benefits');
        const existingBenefits = benefitData
          ? JSON.parse(benefitData)
          : [];

        // Adicione o novo benefício à lista existente
        const updatedBenefits = [...existingBenefits, newBenefit];

        // Atualize o AsyncStorage com a lista atualizada de benefícios
        await AsyncStorage.setItem(
          'benefits',
          JSON.stringify(updatedBenefits)
        );

        // Chame a função de atualização passada como prop
        onAdd();

        // Volte para a lista de benefícios
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
      }
    }
  };

    return (
    <View style={styles.container}>
      <Text style={styles.label}>Beneficio:</Text>
      <TextInput
        style={styles.input}
        value={benef}
        onChangeText={(text) => setBenef(text)}
      />

      <Text style={styles.label}>Tipo:</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={(text) => setType(text)}
      />

      <Text style={styles.label}> Valor: </Text>
        <View style={styles.slider}>
              <Slider
                value={valueBenef}
                onValueChange={(value) => setValueBenef(value)}
                minimumValue={0}
                maximumValue={1000}
                step={0.01}
              />
        </View>
      <Text style={styles.label}>R$ {valueBenef.toFixed(0)}</Text>

      <TouchableOpacity onPress={handleAddBenefit}>
        <Text style={styles.addButton}>Adicionar Benefício</Text>
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
  slider:{
    
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

export default AddBenefit;
