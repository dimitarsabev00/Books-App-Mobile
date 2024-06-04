import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useMyBooks } from "@/contexts/MyBooksContext";
import { FlatList } from "react-native";
import BookItem from "@/components/BookItem";

export default function TabTwoScreen() {
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
