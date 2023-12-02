//dashbord.js

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

  
import EmployeeList from '../Employees/EmployeeList';
import JobList from '../Jobs/JobList';
import BenefitList from '../Benefits/BenefitsList'

const Tab = createBottomTabNavigator();

export default function Dashbord() {

  return (
      
      <Tab.Navigator
      screenOptions={{
          tabBarStyle:{
              backgroundColor: '#9370DB'
          },
          tabBarShowLabel: false
          
        }}
      >
        <Tab.Screen name='EmployeeList' component={EmployeeList} 
                    options={{
                      headerShown: false,
                      tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={'#fff'} size={size} />
            ),
          }}/>
        <Tab.Screen name='JobList' component={JobList} 
                    options={{headerShown: false ,
                    tabBarIcon: ({ color, size }) => (
              <Icon name="briefcase" color={'#fff'} size={size} />
            ),}}/>
        <Tab.Screen name='BenefitList' component={BenefitList} 
                    options={{headerShown: false,
                    tabBarIcon: ({ color, size }) => (
              <Icon name="credit-card" color={'#fff'} size={size} />
            ), }}/>            
      </Tab.Navigator>
       
  );
}