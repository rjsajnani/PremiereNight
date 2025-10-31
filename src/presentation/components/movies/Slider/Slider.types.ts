import { MovieResult } from '@domain/model';

export interface SliderProps {
  movies: MovieResult[];
  title?: string;
  isHorizontal?: boolean;
}
