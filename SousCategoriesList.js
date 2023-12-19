// SousCategoriesList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, Image } from 'react-native';

const SousCategoriesList = ({ route }) => {
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
    (sousCategorie) => sousCategorie.categorie === `/api/categories/${categorie.id}`
  );

  return (
    <View style={{ alignItems: 'center', marginBottom: 10 }}>
      <Text>{categorie.nom}</Text>
      <Text>{categorie.id}</Text>

      <FlatList
        data={filteredSousCategories}
        keyExtractor={(sousCategorie) => sousCategorie['@id']}
        renderItem={({ item: sousCategorie }) => (
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Image
              source={{
                uri: `http://10.0.2.2:8000/images/${sousCategorie.image}`,
              }}
              style={{ width: 150, height: 150 }}
            />
            <Text>{sousCategorie.nom}</Text>
            {/* <Text>{sousCategorie.categorie}</Text> */}
          </View>
        )}
      />
    </View>
  );
};

export default SousCategoriesList;
