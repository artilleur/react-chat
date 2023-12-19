// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesList from './CategoriesList';
import SousCategoriesList from './SousCategoriesList';

const Stack = createStackNavigator();

const App = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Assurez-vous de récupérer la liste de vos catégories ici
    // Exemple de structure des catégories : [{ id: 1, nom: 'Catégorie 1' }, { id: 2, nom: 'Catégorie 2' }, ...]
    // Assurez-vous de définir les catégories dans le state
    const fetchCategories = async () => {
      // Ajoutez ici le code pour récupérer la liste de vos catégories
      // Assurez-vous que les catégories sont stockées dans le state
    };

    fetchCategories();
  }, []); // Assurez-vous d'ajuster les dépendances en conséquence

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Categories">
          {(props) => <CategoriesList {...props} categories={categories} />}
        </Stack.Screen>
        {categories.map((category) => (
          <Stack.Screen
            key={category.id}
            name={`SousCategories_${category.id}`}
          >
            {(props) => (
              <SousCategoriesList {...props} category={category} />
            )}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
