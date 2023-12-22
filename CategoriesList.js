import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';


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
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>COUTELLERIE80</Text>
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCategoriePress(item)}>
            <View style={{ alignItems: 'center', marginVertical:30 }}>
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

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    color: 'red', // Couleur rouge
  },
});

export default CategoriesList;
