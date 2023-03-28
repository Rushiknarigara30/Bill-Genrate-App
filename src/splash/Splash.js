import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {THEME_COLOR, WHITE} from '../common/Colors';
import {useNavigation} from '@react-navigation/native';

export default function Splash() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MyBilling App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME_COLOR,
  },
  logo: {
    color: WHITE,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0.7,
  },
});
