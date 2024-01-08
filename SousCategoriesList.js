// SousCategoriesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SousCategoriesList = ({ route, navigation }) => {
  const { categorie } = route.params;
  const [sousCategories, setSousCategories] = useState([]);
  

  useEffect(() => {
    console.log('Categorie from route params:', categorie);

    const fetchAllSousCategories = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8000/api/sous_categories?page=1`
        );

        setSousCategories(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching all sous-categories', error);
      }
    };

    fetchAllSousCategories();
  }, [categorie]);

  const filteredSousCategories = sousCategories.filter(
    (sousCategorie) =>
      sousCategorie.categorie === `/api/categories/${categorie.id}`
  );

  const handleSousCategoriePress = (sousCategorie) => {
    // Navigate to the ProductsList screen with the selected sousCategorie
    navigation.navigate('Products', { sousCategorie });
  };
  const handleBackPress = () => {
    // Go back to the previous screen
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginBottom: 10 }}>
      <Text>{categorie.nom}</Text>
      {/* <Text>{categorie.id}</Text> */}

      <FlatList
        data={filteredSousCategories}
        keyExtractor={(sousCategorie) => sousCategorie['@id']}
        renderItem={({ item: sousCategorie }) => (
          <TouchableOpacity
            onPress={() => handleSousCategoriePress(sousCategorie)}
          >
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <TouchableOpacity onPress={handleBackPress}>
        <Text>Back</Text>
      </TouchableOpacity>
              <Image
                source={{
                  uri: `http://10.0.2.2:8000/images/${sousCategorie.image}`,
                }}
                style={{ width: 150, height: 150 }}
              />
              <Text>{sousCategorie.nom}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SousCategoriesList;
