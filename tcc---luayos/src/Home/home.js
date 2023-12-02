// home.js

import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation();

function IrDashbord(){
      navigation.navigate('Dashbord');
  }

  return (
    <View style={styles.container}>

      <View style={styles.areaImg}>
        <Image 
        style={styles.img}
        source={require('./assets/image/logo-LUAYOS.png')}
        />
      </View>
      <View style={styles.areaImg}>
        <TouchableOpacity onPress={IrDashbord}>
          <Text style={styles.button}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#D8BFD8',
    padding: 20,
  },
  areaImg:{   
    alignItems: 'center'
  },
  img: {

    width: 200,
    height: 220
  },
  button:{
    fontSize: 20,
    color: '#ddd',
    fontWeight: 'bold',
    backgroundColor: '#A020F0',
    marginTop: 20,
    borderRadius: 5,
    borderColor: '#4F4F4F',
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
});