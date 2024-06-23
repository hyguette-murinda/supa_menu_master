import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CheckIcon, ChevronRightIcon, WalletIcon } from 'react-native-heroicons/outline';
import axios from 'axios';

function CartScreen({ route }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  const categories = ['Food', 'Drinks'];

  const restaurantId = route.params?.restaurantId;

  useEffect(() => {
    const fetchMenu = async () => {
      if (restaurantId) {
        try {
          const response = await axios.get(`http://10.11.74.97:5000/api/v1/restaurant/${restaurantId}/menus`);
          if (response.data && response.data.data) {
            const menu = response.data.data[0];
            handleCategorySelect(categories[0]); // Select first category by default
          }
        } catch (error) {
          console.error('Error fetching menu:', error);
        }
      }
    };

    fetchMenu();
  }, [restaurantId]);

  const handleCategorySelect = async (category) => {
    try {
      const response = await axios.get(`http://10.11.74.97:5000/api/v1/restaurant/${restaurantId}/menus`);
      if (response.data && response.data.data) {
        const menu = response.data.data[0];
        const categoryItems = menu.categories[category.toLowerCase()];
        setItems(categoryItems);
        setSelectedCategory(category);
      }
    } catch (error) {
      console.error('Error fetching category items:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20, backgroundColor: 'black' }}>
      <Text style={{ textAlign: 'center', color: 'orange', fontWeight: 'bold', fontSize: 24, paddingBottom: 20 }}>
        Choose Kigali
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        <TouchableOpacity onPress={() => handleCategorySelect('Food')} style={{ alignItems: 'center' }}>
          <CheckIcon color={selectedCategory === 'Food' ? 'orange' : 'white'} size={32} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategorySelect('Drinks')} style={{ alignItems: 'center' }}>
          <CheckIcon color={selectedCategory === 'Drinks' ? 'orange' : 'white'} size={32} />
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Drinks</Text>
        </TouchableOpacity>
      </View>
      {selectedCategory && (
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: 'bold', color: 'orange', fontSize: 24, textAlign: 'center', paddingBottom: 20 }}>
            {selectedCategory} Items
          </Text>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>{item.name}</Text>
                <Text style={{ color: 'orange', fontSize: 18 }}>{item.price} RWF</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default CartScreen;
