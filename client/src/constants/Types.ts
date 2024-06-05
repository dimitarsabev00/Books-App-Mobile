export interface Book {
  image: string;
  title: string;
  authors: string[];
  isbn?: string;
  rating: number;
}

export type BookProviderType = "googleBooksSearch" | "openLibrarySearch";
