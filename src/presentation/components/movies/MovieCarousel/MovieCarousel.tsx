import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import MovieCard from '../MovieCard/MovieCard';
import { MovieResult } from '@domain/model';

const window = Dimensions.get('window');

function MovieCarousel({ data }: { data: MovieResult[] }) {
  const progress = useSharedValue<number>(0);
  return (
    <View id="carousel-component">
      <Carousel
        autoPlay
        autoPlayInterval={2500}
        data={data.slice(0, 5)}
        height={500}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={window.width}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 60,
        }}
        onProgressChange={progress}
        renderItem={({ item }) => {
          return <MovieCard movie={item} isCarousel />;
        }}
      />
    </View>
  );
}

export default MovieCarousel;
