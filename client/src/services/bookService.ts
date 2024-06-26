import { BookProviderType } from "@/src/constants/Types";

export const parseBook = (item: any, provider: BookProviderType) => {
  if (provider === "googleBooksSearch") {
    return {
      title: item.volumeInfo.title,
      image: item.volumeInfo.imageLinks?.thumbnail,
      authors: item.volumeInfo.authors,
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      rating:item.volumeInfo.averageRating
    };
  } else {
    return {
      title: item.title,
      authors: item.author_name,
      image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
      isbn: item.isbn?.[0],
      rating:item.ratings_average
    };
  }
};
