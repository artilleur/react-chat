// ProductsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

const ProductsList = ({ route }) => {
  const { sousCategorie } = route.params;
  const [products, setProducts] = useState([]);

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
    // Handle the press on a product, e.g., navigate to a product details screen
    console.log('Product pressed:', product);
  };

  return (
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <Text>{sousCategorie.nom}</Text>
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
              <Text>{product.nom}</Text>
              {/* You can display other product details here */}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductsList;
