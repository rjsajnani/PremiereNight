import { MovieDetails as MovieDetailsType } from '@domain/model';
import Ionicons from '@react-native-vector-icons/ionicons';
import currencyFormatter from 'currency-formatter';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MovieDetails = (movieDetails: MovieDetailsType) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.rateContainer}>
          <Ionicons name="star" color="yellow" size={16} style={styles.star} />
          <Text style={styles.voteAverage}>{movieDetails.vote_average}</Text>
        </View>
        <View>
          <Text style={styles.genresText}>
            {movieDetails.genres.map(genre => genre.name).join('     ')}
          </Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Synopsis</Text>
      <Text style={styles.overview}>{movieDetails.overview}</Text>
      {movieDetails.budget > 0 && (
        <>
          <Text style={styles.subtitle}>Budget</Text>
          <Text style={styles.budgetAmount}>
            {currencyFormatter.format(movieDetails.budget, { code: 'USD' })} USD
          </Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7A93AC',
    padding: 7.5,
    borderRadius: 10,
  },
  star: {
    marginRight: 5,
  },
  voteAverage: {
    color: 'black',
    fontSize: 14,
  },
  genresText: {
    marginLeft: 15,
    color: 'white',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 25,
    marginTop: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  overview: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  budgetAmount: {
    color: 'white',
    fontSize: 16,
  },
});

export default MovieDetails;
