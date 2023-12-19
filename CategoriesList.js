import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const CategoriesList = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/categories?page=1');
        setCategories(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoriePress = (categorie) => {
    navigation.navigate('SousCategories', { categorie });
  };
  
  return (
    <View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoriePress(item)}>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Image source={{ uri: `http://10.0.2.2:8000/images/${item.image}` }} style={{ width: 150, height: 150 }} />
              <Text>{item.nom}</Text>
              <Text>{item.id}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CategoriesList;