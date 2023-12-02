// EditBenefit.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditBenefit = ({ route, navigation }) => {
  const { benefit, onUpdate } = route.params;
  const [benef, setBenef] = useState(benefit.benef);
  const [type, setType] = useState(benefit.type);
  const [valueBenef, setValueBenef] = useState(benefit.valueBenef);


  useEffect(() => {
    navigation.setOptions({ title: `Editar Benefício: ${benefit.benef}` });
  }, [benefit.benef, navigation]);

  const handleUpdateBenefit = async () => {
    if (benef && type && valueBenef) {
      try {
        // Obtenha os benefícios existentes
        const benefitsData = await AsyncStorage.getItem('benefits');
        const existingBenefits = benefitsData ? JSON.parse(benefitsData) : [];

        // Atualize o benefício existente
        const updatedBenefits = existingBenefits.map((emp) =>
          emp.id === benefit.id ? { ...emp, benef, type, valueBenef } : emp
        );

        // Atualize o AsyncStorage com a lista atualizada de benefícios
        await AsyncStorage.setItem('benefits', JSON.stringify(updatedBenefits));

        // Chame a função de atualização passada como prop
        onUpdate();

        // Volte para a lista de benefícios
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao atualizar benefício:', error);
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

      <TouchableOpacity onPress={handleUpdateBenefit}>
        <Text style={styles.addButton}>Atualizar Benefício</Text>
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

export default EditBenefit;
