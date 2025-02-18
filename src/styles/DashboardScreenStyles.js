import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: "#003366",
  },
  /* 📌 STYLE DE LA DATE */
  dateSection: {
    backgroundColor: "#004AAD", // Bleu foncé
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "flex-start",
    marginTop: 15, // Ajout de margin top
    marginBottom: 10, // Ajout de margin bottom
  },
  tourneeDate: {
    fontSize: 18, // Réduction de la taille
    fontWeight: "bold",
    color: "#FFFFFF", // Blanc pour bien ressortir sur le fond bleu
  },
  /* 📌 STYLE DES TOURNEES */
  tourneeCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  tourneeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  tourneeCreneau: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  tourneeNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 5,
  },
  /* 📌 BOUTON DÉMARRER */
  startButton: {
    backgroundColor: "#40E0D0",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  /* 📌 STYLE DES LIVRAISONS */
  livraisonCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  livraisonClient: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  livraisonAdresse: {
    fontSize: 14,
    color: "#555",
  },
  livraisonNumero: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#007AFF",
  },
  livraisonStatut: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  /* 📌 STYLE DU BOUTON HISTORIQUE */
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#004AAD',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  itineraryButton: {
    backgroundColor: "#40E0D0", // Turquoise/vert d'eau
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  itineraryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Centre le texte et l'icône
    marginBottom: 10,
  },
  
  pageTitle: {
    fontSize: 20, // 📌 Taille réduite
    fontWeight: 'bold',
    color: "#003366",
  },
  
  calendarIcon: {
    marginRight: 10, // 📌 Espacement avec le texte
    padding: 8, // 📌 Rendre le bouton plus cliquable
    backgroundColor: "#E0E8F9", // 📌 Fond bleu clair pour mieux ressortir
    borderRadius: 10, // 📌 Bords arrondis
  },
  resetDateButton: {
    backgroundColor: 'red', // Fond rouge
    width: 30,
    height: 30,
    borderRadius: 5, // Coin arrondi
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, // Espacement entre la date et la croix
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Fond gris clair
    padding: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10, // Espacement sous la date sélectionnée
  },
  datePickerContainer: {
    flexDirection: 'row', // 📌 Aligner l'icône et la date en ligne
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Fond gris clair
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 10, // 📌 Espacement entre l'icône et la date
  },
  
  selectedDateText: {
    fontSize: 16,
    color: "#003366",
    marginRight: 8, // 📌 Espacement avec la croix
  },
  
  resetDateButton: {
    backgroundColor: 'red',
    width: 25,
    height: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  
  
  
  
});
