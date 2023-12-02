import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/Home/home';
import Dashbord from './src/Dashbord/dashbord';
import EmployeeList from './src/Employees/EmployeeList';
import AddEmployee from './src/Employees/AddEmployee';
import EditEmployee from './src/Employees/EditEmployee';
import EmployeeShow from './src/Employees/EmployeeShow'
import JobList from './src/Jobs/JobList';
import AddJob from './src/Jobs/AddJob';
import EditJob from './src/Jobs/EditJob';
import BenefitList from './src/Benefits/BenefitsList';
import AddBenefit from './src/Benefits/AddBenefits';
import EditBenefit from './src/Benefits/EditBenefits'

const Stack = createStackNavigator();

export default function App() {


  return (

   <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
                      options={{
                      headerShown: false
                    }}/>
      <Stack.Screen name="Dashbord" component={Dashbord} 
                      options={{
                      title:'Dashbord',
                      headerStyle:{
                        backgroundColor: '#953bbe',
                      },
                        headerTintColor: '#fff',}}/>
      
      <Stack.Screen name="EmployeeList" component={EmployeeList}/>

      <Stack.Screen name="AddEmployee" component={AddEmployee} 
                      options={{
                      title:'Cadastrar Funcionário',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>

      <Stack.Screen name="EditEmployee" component={EditEmployee} 
                      options={{
                      title:'EditEmployee',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>

<Stack.Screen name="EmployeeShow" component={EmployeeShow} 
                      options={{
                      title:'Visualizar Funcionário',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>              
                        
      <Stack.Screen name="JobList" component={JobList}/>

      <Stack.Screen name="AddJob" component={AddJob} 
                      options={{
                      title:'Cadastar Cargo',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>

     <Stack.Screen name="EditJob" component={EditJob} 
                      options={{
                      title:'EditJob',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>

    <Stack.Screen name="BenefitList" component={BenefitList}/>      

    <Stack.Screen name="AddBenefit" component={AddBenefit} 
                      options={{
                      title:'Cadastrar Benefício',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>   

    <Stack.Screen name="EditBenefit" component={EditBenefit} 
                      options={{
                      title:'EditBenefit',
                      headerStyle:{
                        backgroundColor: '#953bbe'
                      },
                        headerTintColor: '#fff',}}/>                                                               

      </Stack.Navigator>
    </NavigationContainer>
  );
}


