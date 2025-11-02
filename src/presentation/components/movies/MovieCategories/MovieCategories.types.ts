import { MovieResult } from '@domain/model';

export interface MovieCategory {
  key: string;
  title: string;
  results: MovieResult[];
}

export interface MovieCategoriesProps {
  movieCategories: MovieCategory[];
  onViewMore?: (categoryKey: MovieCategory['key'], title: string) => void;
}
