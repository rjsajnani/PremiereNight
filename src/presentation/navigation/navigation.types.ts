import { MovieCategory } from '@constants/constants';
import { MovieResult } from '@domain/model';

export type RootStackParams = {
  HomeScreen: undefined;
  Details: MovieResult;
  MovieCategories: {
    categoryKey: MovieCategory['key'];
    title: string;
  };
};
