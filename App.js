import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({});
