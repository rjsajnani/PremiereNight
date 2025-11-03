import { MovieResult } from '@domain/model';

export interface MovieCardProps {
  movie: MovieResult;
  isHorizontal?: boolean;
  isCarousel?: boolean;
}
