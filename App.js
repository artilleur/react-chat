// App.js
import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoriesList from './CategoriesList';
import SousCategoriesList from './SousCategoriesList';
import ProductsList from './ProductsList';
import ProductDetailList from './ProductDetailList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Categories" component={CategoriesList} />
        <Stack.Screen name="SousCategories" component={SousCategoriesList} />
        <Stack.Screen name="Products" component={ProductsList} />
        <Stack.Screen name="ProductDetail" component={ProductDetailList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
