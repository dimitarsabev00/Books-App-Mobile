import { ActivityIndicator, Button, StyleSheet, TextInput } from "react-native";
import { useLazyQuery } from "@apollo/client";
import { FlatList } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { parseBook } from "@/src/services/bookService";
import { Text, View } from "@/src/components/Themed";
import BookItem from "@/src/components/BookItem";
import { searchQuery } from "./queries";

export default function Search() {
  const [search, setSearch] = useState("");
  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);

  const mergeBooks = () => {
    const googleBooks =
      data?.googleBooksSearch?.items.map((item: any) =>
        parseBook(item, "googleBooksSearch")
      ) || [];
    const openLibraryBooks =
      data?.openLibrarySearch?.docs.map((item: any) =>
        parseBook(item, "openLibrarySearch")
      ) || [];
    return [...googleBooks, ...openLibraryBooks];
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.searchInput}
        />
        <Button
          title="Search"
          onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>
      {loading && <ActivityIndicator />}
      {error && (
        <View style={styles.container}>
          <Text style={styles.title}>Error fetching books</Text>
          <Text>{error.message}</Text>
        </View>
      )}
      <FlatList
        data={mergeBooks()}
        renderItem={({ item }) => <BookItem book={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
