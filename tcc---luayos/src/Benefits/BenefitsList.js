// BenefitList.js

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const BenefitList = ({ navigation }) => {
  const [benefits, setBenefits] = useState([]);

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
      }
    } catch (error) {
      console.error('Erro ao carregar benefícios:', error);
    }
  };

  const handleEdit = (benefit) => {
    // Navegue para a tela de edição com os detalhes do benefício
    navigation.navigate('EditBenefit', { benefit, onUpdate: loadBenefits });
  };

  const handleDelete = async (benefitId) => {
    try {
      // Remova o benefício com o ID especificado
      const updatedBenefits = benefits.filter((benefit) => benefit.id !== benefitId);
      await AsyncStorage.setItem('benefits', JSON.stringify(updatedBenefits));
      setBenefits(updatedBenefits);
    } catch (error) {
      console.error('Erro ao excluir benefício:', error);
    }
  };

  const handleAddBenefit = () => {
    // Navegue para a tela de adição de benefício
    navigation.navigate('AddBenefit', { onAdd: loadBenefits });
  };

  const handleRefresh = () => {
    // Atualize manualmente a lista de benefícios
    loadBenefits();
  };

  const renderBenefitItem = ({ item }) => (
    <View style={styles.benefitItem} >
      
      <View >
        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Beneficio: </Text> <Text style={styles.text}>{item.benef}</Text>
        </Text>

        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Tipo: </Text> <Text style={styles.text}>{item.type}</Text>
        </Text>

        <Text style={styles.areaTitle}>
          <Text style={styles.title}>Valor: </Text> <Text style={styles.text}>R${item.valueBenef}</Text>
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
        <View style={styles.areaBenefit}> 
          <Text style={styles.areaTextBenefit}>Benefícios</Text>
        </View>
          <View style={styles.areaUpdateButton}>
            <TouchableOpacity onPress={handleRefresh}>
              <Icon style={styles.updateButton} name="rotate-right" size={15} color="#363636" />
            </TouchableOpacity>
          </View>
          <View style={styles.areaUpdateButton}>
                <TouchableOpacity onPress={handleAddBenefit}>
                  <Text style={styles.registrationButton}>+</Text>
                </TouchableOpacity>
          </View>
      </View>

    
      <ScrollView showsVerticalScrollIndicator={true}>
      <View style={{marginTop: 35}}> 
        <FlatList
        data={benefits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBenefitItem}
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
  benefitItem: {  
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
    marginLeft: 30,
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
  areaBenefit:{
    alignItems: 'center',
    marginBottom: 5,
    marginRight: 20
  },
  areaTextBenefit:{
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

export default BenefitList;
