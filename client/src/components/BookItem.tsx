import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Book } from "@/src/constants/Types";
import { useMyBooks } from "@/src/contexts/MyBooksContext";
import Colors from "@/src/constants/Colors";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

type BookItemProps = {
  book: Book;
};

type RootStackParamList = {
  bookDetails: { book: Book };
  // other routes can be added here
};

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const { onToggleSaved, isBookSaved } = useMyBooks();
  const saved = isBookSaved(book);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handlePressBook = () => {
    navigation.navigate("bookDetails", { book });
  };
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesome
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={20}
          color="gold"
        />
      );
    }
    return stars;
  };

  return (
    <Pressable onPress={handlePressBook} style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text>by {book.authors?.join(", ")}</Text>
        <View style={styles.ratingContainer}>{renderStars(book.rating)}</View>
        <Pressable
          style={[
            styles.saveButton,
            saved ? { backgroundColor: "lightgray" } : {},
          ]}
          onPress={() => onToggleSaved(book)}
        >
          <Text style={styles.saveButtonText}>
            {saved ? "Remove" : "Want to Read"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: Colors.light.tint,
    alignSelf: "flex-start",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default BookItem;
