import { CloseButton, MovieDetails, WishlistButton } from '@components/index';
import { useMovieDetails } from '@hooks/useMovieDetails';
import { RootStackParams } from '@navigation/index';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { selectIsInWishlist, toggleWishlist } from '@state/slice';
import { AppDispatch, RootState } from '@state/store';
import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const screenHeight = Dimensions.get('screen').height;

interface HomeDetailsProps
  extends StackScreenProps<RootStackParams, 'Details'> {}

export function DetailsScreen({ route }: HomeDetailsProps) {
  const movie = route.params;
  const navigation = useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  const isInWishlist = useSelector((state: RootState) =>
    selectIsInWishlist(state, movie.id),
  );

  useLayoutEffect(() => {
    const handleWishlist = () => {
      dispatch(toggleWishlist(movie));
    };
    navigation.setOptions({
      headerLeft: () => <CloseButton onPress={() => navigation.goBack()} />,
      headerRight: () => (
        <WishlistButton isWishlist={isInWishlist} onPress={handleWishlist} />
      ),
    });
  }, [navigation, isInWishlist, dispatch, movie]);

  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, movieDetails } = useMovieDetails(movie.id);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Image Section with Overlay Buttons */}
        <View style={styles.heroSection}>
          <Image source={{ uri }} style={styles.posterImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{movie.original_title}</Text>
          <Text style={styles.title}>{movie.title}</Text>
        </View>
        <View style={styles.detailsContainer}>
          {!isLoading && movieDetails && <MovieDetails {...movieDetails} />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    width: '100%',
    height: screenHeight * 0.7,
    position: 'relative',
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    paddingBottom: 40,
  },
});
