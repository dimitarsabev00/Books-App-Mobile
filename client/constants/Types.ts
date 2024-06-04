export interface Book {
  image: string;
  title: string;
  authors: string[];
  isbn?: string;
}

export type BookProviderType = "googleBooksSearch" | "openLibrarySearch"