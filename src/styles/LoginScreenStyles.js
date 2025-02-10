import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window'); // Dimensions de l'écran

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1, // Remplir toute la hauteur de l'écran
    backgroundColor: 'white', // Fond blanc global
  },
  background: {
    position: 'absolute', // Permet à l'image de se placer au-dessus du fond blanc
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Centrer l'image verticalement
    alignItems: 'center', // Centrer l'image horizontalement
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Couvre toute la zone avec un overlay
    zIndex: 1, // Le dégradé se superpose à l'image
  },
  container: {
    flex: 1, // Prend tout l'espace disponible
    justifyContent: 'center', // Centre les éléments verticalement
    alignItems: 'center', // Centre les éléments horizontalement
    paddingHorizontal: 20, // Ajoute du padding horizontal
    zIndex: 2, // S'assure que les éléments sont au-dessus de l'overlay
  },
  title: {
    fontSize: 28, // Taille du titre
    color: 'white',
    fontweight: 'bold',
    marginBottom: 30, // Espace avec les autres éléments
  },
  input: {
    width: width * 0.8, // 80% de la largeur de l'écran
    height: 50, // Hauteur des champs
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    width: width * 0.8, // 80% de la largeur de l'écran
    height: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default styles;
