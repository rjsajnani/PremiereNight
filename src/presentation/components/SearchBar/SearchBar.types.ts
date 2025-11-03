import { SetStateAction, Dispatch } from 'react';

export interface SearchBarProps {
  searchQuery: string;
  onChangeSearchQuery: Dispatch<SetStateAction<string>>;
  onSearch: (query: any) => Promise<void>;
  onClear: false | (() => void);
}
