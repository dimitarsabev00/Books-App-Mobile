import { StyleSheet } from "react-native";

import { useMyBooks } from "@/src/contexts/MyBooksContext";
import { FlatList } from "react-native";
import { View } from "@/src/components/Themed";
import BookItem from "@/src/components/BookItem";

export default function MyBooks() {
  const { savedBooks } = useMyBooks();
  return (
    <View style={styles.container}>
      <FlatList
        data={savedBooks}
        renderItem={({ item }) => <BookItem book={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
