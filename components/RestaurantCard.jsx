import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RestaurantCard = ({ name, location, imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#e6e6e6',
    marginBottom: 15,
    marginLeft:15,
    elevation: 2,
  },
  image: {
    width: '30%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    padding: 10,
  },
  name: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  location: {
    fontSize: 14,
    color:"gray"
  },
});

export default RestaurantCard;