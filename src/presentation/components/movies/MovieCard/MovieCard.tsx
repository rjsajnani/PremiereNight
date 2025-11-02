import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MovieCardProps } from './MovieCard.types';

const screenWidth = Dimensions.get('screen').width;

const MovieCard = ({ movie }: MovieCardProps) => {
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('Details', movie)}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 2,
    paddingBottom: 20,
    paddingHorizontal: 7,
    height: 280,
    width: screenWidth / 2,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 10,
    position: 'relative',
  },
  image: {
    flex: 1,
    borderRadius: 15,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default MovieCard;
