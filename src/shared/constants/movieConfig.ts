export interface MovieCategory {
  key: 'nowPlaying' | 'popular' | 'topRated' | 'upcoming';
  title: string;
  endpoint: string;
}

export type MoveCategoryConfig = {
  nowPlaying: MovieCategory;
  popular: MovieCategory;
  topRated: MovieCategory;
  upcoming: MovieCategory;
};

export const MOVIE_CATEGORY_CONFIG: MoveCategoryConfig = {
  nowPlaying: {
    key: 'nowPlaying',
    title: 'Now Playing',
    endpoint: '/movie/now_playing',
  },
  popular: {
    key: 'popular',
    title: 'Popular',
    endpoint: '/movie/popular',
  },
  topRated: {
    key: 'topRated',
    title: 'Top Rated',
    endpoint: '/movie/top_rated',
  },
  upcoming: {
    key: 'upcoming',
    title: 'Upcoming',
    endpoint: '/movie/upcoming',
  },
} as const;
