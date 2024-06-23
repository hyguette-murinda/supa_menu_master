import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import { router } from 'expo-router';
function restaurantSearch() {
  const [showSearchField, toggleSearchField] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://10.5.220.106:5000/api/v1/restaurant/all')
      .then(response => {
        if (response.data && response.data.data) {
          setRestaurants(response.data.data);
        } else {
          console.error('Invalid response structure', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Implement filtering logic here if needed
  };

  return (
    <SafeAreaView className="flex flex-1">
      <View className="flex-row items-center py-2 border-b-1">
        <TouchableOpacity
          onPress={() => toggleSearchField(!showSearchField)}
          className="rounded-2xl bg-gray-200 p-1 mt-2 mx-4"
        >
          <ChevronLeftIcon color="orange" size={25} />
        </TouchableOpacity>
        <View className="flex-row items-center py-5">
          {showSearchField && (
            <TextInput
              placeholder="Search..."
              placeholderTextColor="gray"
              value={searchQuery}
              onChangeText={handleSearchChange}
              className="flex flex-1 text-black px-3 font-bold"
            />
          )}
        </View>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push("/menu")}
          >
            <RestaurantCard
              name={item.name}
              location={item.address}
              imageSource={null} // Placeholder for image source
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

export default restaurantSearch;
