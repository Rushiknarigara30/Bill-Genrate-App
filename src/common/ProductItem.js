import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {WHITE, WIDTH} from './Colors';

export default function ProductItem({item, index, onClick}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onClick(index);
      }}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View>
        <Text style={styles.text}>
          {item.title.length > 20 ? item.title.substring(0, 20) : item.title}
        </Text>
        <Text style={styles.text}>{'₹ ' + item.price}</Text>
      </View>
      <Text
        style={[styles.text, {position: 'absolute', bottom: 10, right: 20}]}>
        {'Rate: ' + item.rating.rate}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 20,
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
});
