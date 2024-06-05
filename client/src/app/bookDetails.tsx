import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { useRoute } from "@react-navigation/native"
import { Book } from "@/src/constants/Types"

const BookDetails: React.FC = () => {
  const route = useRoute()
  const { book } = route.params as { book: Book }
  return (
    <View style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default BookDetails
