import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList} from 'react-native-gesture-handler';
import {BLACK, GRAY, THEME_COLOR, WHITE} from '../common/Colors';

export default function SingleBill() {
  const navigation = useNavigation();
  const [mainBill, setMainBill] = useState();
  const {params} = useRoute();
  const {index, item} = params;
  const {total, billDate, billerName, data} = item;
  console.log(data);
  useEffect(() => {
    bills();
  }, []);
  const bills = () => {
    setMainBill(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Name : {billerName}</Text>
        <Text style={styles.name}>Date : {billDate}</Text>
      </View>
      <FlatList
        style={styles.flatContainer}
        data={mainBill}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View>
              <View style={styles.itemcontainer}>
                <Image style={styles.img} source={{uri: item.image}} />
                <View style={{marginLeft: 3}}>
                  <View style={styles.categoryView}>
                    <Text style={styles.categorytxt}>
                      {'Item Type : ' + item.category}
                    </Text>
                    <Text style={styles.categorytxt}>
                      {'Rating : ' + item.rating.rate}
                    </Text>
                  </View>
                  <View style={styles.priceView}>
                    <Text style={styles.pricetxt}>
                      {'Price : ' + '₹' + item.price}
                    </Text>
                    <Text style={styles.pricetxt}>{'Qty : ' + item.qty}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.totalView}>
        <Text style={styles.totaltxt}>{'Total : ' + '₹' + item.total}</Text>
        <TouchableOpacity style={{marginRight: 50}}>
          <Image
            style={{width: 50, height: 50}}
            source={require('../img/printer.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 30,
  },
  name: {
    fontSize: 20,
    color: THEME_COLOR,
    textDecorationLine: 'underline',
  },
  itemcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginHorizontal: 10,
  },
  flatContainer: {},
  img: {
    width: 130,
    height: 130,
  },
  categoryView: {
    marginTop: 10,
    marginLeft: 3,
  },
  categorytxt: {
    fontSize: 16,
    color: BLACK,
    fontWeight: '500',
  },
  priceView: {
    marginTop: 10,
  },
  pricetxt: {
    paddingTop: 3,
    fontSize: 14,
    color: BLACK,
    fontWeight: '400',
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
  },
  totaltxt: {
    fontSize: 20,
    color: WHITE,
    paddingLeft: 30,
    paddingVertical: 20,
  },
});
