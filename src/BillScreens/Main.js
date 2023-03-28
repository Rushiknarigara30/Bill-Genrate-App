import {
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {THEME_COLOR, WHITE, WIDTH} from '../common/Colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getData} from '../utils/AsyncStorage/AsyncStorage';

export default function Main() {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getBills();
  }, [isFocused]);
  const getBills = async () => {
    const json = await getData('Bills');
    setBills(json);
  };
  return (
    <View style={styles.container}>
      {bills !== null ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={bills}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={styles.billItem}
                onPress={() => {
                  navigation.navigate('SingleBill', {item: item, index: index});
                }}>
                <Text style={styles.textStyle}>
                  {'Bill Name :' + item.billerName}
                </Text>
                <Text style={styles.textStyle}>
                  {'Bill Date :' + item.billDate}
                </Text>
                <Text style={styles.textStyle}>
                  {'Total Amount :' + item.total}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View>
          <Image style={styles.nodata} source={require('../img/nodata.png')} />
          <Text>No Bill Found</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => {
          navigation.navigate('AddNewBill');
        }}>
        <Text style={styles.btnTxt}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  addBtn: {
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  btnTxt: {
    fontSize: 32,
    color: WHITE,
    fontWeight: '700',
  },
  nodata: {
    height: 120,
    width: 120,
  },
  billItem: {
    width: WIDTH - 20,
    marginTop: 20,
    height: 100,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: WHITE,
    marginBottom: 10,
    marginLeft: 5,
    margin: 5,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    marginTop: 2,
  },
});
