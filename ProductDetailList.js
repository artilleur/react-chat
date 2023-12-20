// ProductDetailList.js
import React from 'react';
import { View, Text, Image } from 'react-native';

const ProductDetailList = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <Image
        source={{
          uri: `http://10.0.2.2:8000/images/${product.image}`,
        }}
        style={{ width: 150, height: 150 }}
      />
      <View style={{ alignItems: 'center', marginBottom: 10 }}></View>
      <Text style={{ color: 'red' }}>NOM</Text>
      <Text>{product.nom} {'\n'} </Text>
      <Text style={{ color: 'red' }}>PRIX {'\n'}</Text>
      <Text>{product.prix}€ {'\n'} {'\n'} {'\n'} </Text>
      <Text>{product.description} {'\n'} {'\n'} {'\n'} </Text>
      {/* You can display other product details here */}
    </View>
  );
};

export default ProductDetailList;
