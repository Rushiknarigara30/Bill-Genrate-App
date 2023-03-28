import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {BLACK, GRAY, HEIGHT, THEME_COLOR, WHITE, WIDTH} from '../common/Colors';
import {useNavigation} from '@react-navigation/native';
import ProductItem from '../common/ProductItem';
import {getData, storeData} from '../utils/AsyncStorage/AsyncStorage';

export default function AddNewBill() {
  const [products, setProducts] = useState([]);
  const [productsX, setProductsX] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [namemodalVisible, setNameModalVisible] = useState(false);
  const [addedItem, setAddedItem] = useState([]);
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');

  const navigation = useNavigation();
  const inputRef = useRef();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const result = await fetch('https://fakestoreapi.com/products');
      const res = await result.json();
      res.map(item => {
        item.qty = 1;
      });
      setProducts(res);
      setProductsX(res);
    } catch (e) {
      console.log(e);
    }
  };

  const addItems = ind => {
    let tempData = addedItem;
    if (tempData.length > 0) {
      let isOld = false;
      tempData.map(item => {
        if (item.id === products[ind].id) {
          item.qty = item.qty + 1;
          isOld = true;
        }
      });
      if (!isOld) {
        tempData.push(products[ind]);
      }
    } else {
      tempData.push(products[ind]);
    }
    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setAddedItem(temp);
  };

  const getTotal = () => {
    let total = 0;
    addedItem.map(item => {
      total = total + item.price * item.qty;
    });
    return total.toFixed(2);
  };
  const filterItems = txt => {
    let tempdata = products;
    let newData = tempdata.filter(item => {
      return item.title.toLowerCase().includes(txt.toLowerCase());
    });
    if (newData.length > 0) {
      setProducts(newData);
    } else {
      setProducts(tempdata);
    }
  };
  const saveBill = async () => {
    let data = [];
    let json = await getData('Bills');
    if (json !== null) {
      data = json;
    }
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    data.push({
      data: addedItem,
      billerName: name,
      billDate: '' + day + '/' + month + '/' + year,
      total: getTotal(),
    });
    await storeData('Bills', data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            navigation.navigate('Main');
          }}>
          <Image style={styles.icons} source={require('../img/back.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Image style={styles.icons} source={require('../img/add.png')} />
        </TouchableOpacity>
      </View>
      {addedItem.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={addedItem}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View style={styles.addItem}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View>
                  <Text style={styles.text}>
                    {item.title.length > 20
                      ? item.title.substring(0, 20)
                      : item.title}
                  </Text>
                  <Text style={styles.text}>{'₹ ' + item.price}</Text>
                </View>
                <Text
                  style={[
                    styles.text,
                    {position: 'absolute', bottom: 10, right: 20},
                  ]}>
                  {'qty: ' + item.qty}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.noItems}>
          <Text>No Item Found</Text>
        </View>
      )}
      {addedItem.length > 0 && (
        <View style={styles.bottomView}>
          <Text style={styles.total}>{'Total : ' + getTotal()}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setNameModalVisible(true);
            }}>
            <Text style={styles.txt}>Submit Bill</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal transparent visible={modalVisible}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              setModalVisible(false);
            }}>
            <Image
              style={[styles.icons, {margin: 20}]}
              source={require('../img/back.png')}
            />
          </TouchableOpacity>
          <View style={styles.serchBox}>
            <Image style={styles.icons} source={require('../img/search.png')} />
            <TextInput
              ref={inputRef}
              placeholder="Serch Item By Code"
              style={styles.input}
              value={search}
              onChangeText={txt => {
                setSearch(txt);
                filterItems(txt);
              }}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            renderItem={({item, index}) => {
              return (
                <ProductItem
                  item={item}
                  index={index}
                  onClick={ind => {
                    setSearch('');
                    setProducts(productsX);
                    setModalVisible(false);
                    addItems(ind);
                  }}
                />
              );
            }}
          />
        </View>
      </Modal>
      <Modal visible={namemodalVisible} transparent>
        <View style={styles.nameModalView}>
          <View style={styles.nameView}>
            <TextInput
              placeholder="Biller Name"
              style={styles.input2}
              value={name}
              onChangeText={txt => {
                setName(txt);
              }}
            />
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setNameModalVisible(false);
                }}>
                <Text style={styles.cancelBtnTxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  saveBill();
                  setNameModalVisible(false);
                  navigation.goBack();
                }}>
                <Text style={styles.confirmBtnTxt}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: WHITE,
    width: '100%',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icons: {
    width: 30,
    height: 30,
  },
  bottomView: {
    position: 'absolute',
    height: 100,
    width: '100%',
    bottom: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: WHITE,
    elevation: 5,
  },
  btn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
    color: BLACK,
  },
  txt: {
    fontSize: 18,
    fontWeight: '600',
    color: WHITE,
    letterSpacing: 0.5,
  },
  modalView: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    backgroundColor: WHITE,
  },
  serchBox: {
    width: '80%',
    height: 50,
    backgroundColor: GRAY,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  input: {
    width: '70%',
    marginLeft: 10,
  },
  noItems: {
    width: WIDTH,
    height: HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addItem: {
    width: Dimensions.get('window').width - 20,
    height: 100,
    backgroundColor: WHITE,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 18,
  },
  nameModalView: {
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameView: {
    width: '90%',
    backgroundColor: WHITE,
    borderRadius: 15,
  },
  input2: {
    borderRadius: 5,
    width: '90%',
    height: 50,
    borderWidth: 0.7,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 20,
    textTransform: 'capitalize',
  },
  btnView: {
    borderRadius: 5,
    width: '100%',
    height: 60,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  cancelBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#989898',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: WHITE,
  },
  confirmBtn: {
    width: '40%',
    height: 50,
    borderRadius: 10,
    backgroundColor: THEME_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnTxt: {
    fontSize: 16,
    fontWeight: '700',
    color: WHITE,
  },
});
