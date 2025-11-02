import { MovieResult } from '@domain/model';

export interface SliderProps {
  movies: MovieResult[];
  title?: string;
  isHorizontal?: boolean;
  showAll?: boolean;
  onViewMore?: () => void;
  onLoadMore?: () => void;
}
