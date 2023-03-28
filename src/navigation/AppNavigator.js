import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from '../splash/Splash';
import Main from '../BillScreens/Main';
import AddNewBill from '../BillScreens/AddNewBill';
import SingleBill from '../BillScreens/SingleBill';
import {THEME_COLOR, WHITE} from '../common/Colors';
const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewBill"
          component={AddNewBill}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SingleBill"
          component={SingleBill}
          options={{
            headerTitle: 'Final Bill',
            headerStyle: {
              backgroundColor: THEME_COLOR,
            },
            headerTintColor: WHITE,
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
