import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  firstDelivery: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  client: {
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  startButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
