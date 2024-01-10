// ProductsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Importez le hook useNavigation
import ProductDetailList from './ProductDetailList';

const ProductsList = ({ route }) => {
  const { sousCategorie } = route.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();  // Utilisez le hook useNavigation pour obtenir l'objet navigation

  useEffect(() => {
    console.log('SousCategorie from route params:', sousCategorie);

    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/api/produits?page=1`
        );

        setProducts(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching all products', error);
      }
    };

    fetchAllProducts();
  }, [sousCategorie]);

  const filteredProducts = products.filter(
    (product) => product.sousCategorie === `/api/sous_categories/${sousCategorie.id}`
  );

  const handleProductPress = (product) => {
    // Navigate to the ProductDetailList screen with the selected product
    navigation.navigate('ProductDetail', { product });
  };
  const handleBackPress = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <TouchableOpacity onPress={handleBackPress}>
        <Text style={{ color: 'white', backgroundColor: 'black', padding: 10 }}>RETOUR SOUS_CATEGORIES</Text>
      </TouchableOpacity>
      <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 20 }}></View>
      <Text style={styles.headerText}>{sousCategorie.nom}</Text>
      <Text>{sousCategorie.id}</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={(product) => product['@id']}
        renderItem={({ item: product }) => (
          <TouchableOpacity onPress={() => handleProductPress(product)}>
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
              {/* <Text>{product.description} {'\n'} {'\n'} {'\n'} </Text> */}
              {/* You can display other product details here */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 34,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    color: 'red', // Couleur rouge
    backgroundColor: 'lime',
  },

});


export default ProductsList;
