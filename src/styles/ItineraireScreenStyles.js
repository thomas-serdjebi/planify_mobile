import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 10,
  },

  // 🔙 Retour + Titre
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: "#004AAD",
    padding: 10,
    borderRadius: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#003366",
  },

  // 🗺️ Carte Google Maps (WebView)
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },

  // ⏳ Loader
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  startButton: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "#004AAD", // Bleu foncé
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  startButtonDisabled: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    backgroundColor: "#A0A0A0", // Gris désactivé
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8, // Espacement entre l’icône et le texte
  },
  

  // 📦 Carte d’une livraison
  livraisonCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  livraisonHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  livraisonEtape: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#004AAD",
  },
  livraisonNumero: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  livraisonClient: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },
  livraisonAdresse: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },

  // 🚚 Conteneur des boutons
  livraisonActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // 🚚 Boutons Livrée / Reportée
  deliveredButton: {
    backgroundColor: "#40E0D0", // ✅ Turquoise
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  reportButton: {
    backgroundColor: "#FF8C00", // ✅ Orange
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  // 🗺️ Bouton pour afficher la navigation
  mapButton: {
    backgroundColor: "#004AAD",
    padding: 10,
    borderRadius: 50,
  },

  // 🔙 Bouton retour vers la liste des livraisons depuis la carte
  backToListButton: {
    position: "absolute",
    top: 20,
    left: 15,
    backgroundColor: "#004AAD",
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },

  statusButtonSuccess: {
    backgroundColor: "#28A745", // ✅ Vert
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  
  statusButtonWarning: {
    backgroundColor: "#FFC107", // ⚠️ Jaune/Orange
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  
  cancelButton: {
    backgroundColor: "#DC3545", // ❌ Rouge pour annuler
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },

  footer: {
    position: "absolute",
    bottom: 20,
    left: "10%",
    right: "10%",
    alignItems: "center",
  },
  
  closeTourneeButton: {
    backgroundColor: "#28A745", // ✅ Vert
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  
  closeTourneeButtonDisabled: {
    backgroundColor: "#A0A0A0", // ❌ Gris si désactivé
  },
  
  closeTourneeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  itineraryButton: {
    backgroundColor: "#004AAD", // Bleu foncé pour le bouton
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  
  itineraryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8, // Espace entre l'icône et le texte
  },
  
  
});
