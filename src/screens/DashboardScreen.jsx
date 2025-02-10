import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/HomeScreenStyles"; // Import du fichier de styles

// Génération de 10 livraisons fictives
const generateDeliveries = () => {
  const today = new Date().toISOString().split("T")[0]; // Date du jour
  return Array.from({ length: 10 }, (_, i) => ({
    numero_livraison: `LIV-${1000 + i}`,
    adresse: `Rue ${i + 1} des Champs`,
    adresse_code_postal: "75000",
    adresse_ville: "Paris",
    adresse_info: `Étage ${i % 5 + 1}, Interphone ${i}`,
    client_nom: `Client${i}`,
    client_prenom: `Prénom${i}`,
    client_email: `client${i}@planify.com`,
    client_telephone: `06 00 00 0${i}`,
    date_prevue: today,
    creneau: `${9 + (i % 3)}:00 - ${10 + (i % 3)}:00`,
    statut: "attribuée",
  }));
};

export default function Dashboard() {
  const router = useRouter();
  const [deliveries] = useState(generateDeliveries());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Tournée du jour</Text>

      {/* Première livraison mise en avant */}
      <View style={styles.firstDelivery}>
        <Text style={styles.subtitle}>📍 Première livraison</Text>
        <Text style={styles.client}>
          {deliveries[0].client_prenom} {deliveries[0].client_nom}
        </Text>
        <Text>{`${deliveries[0].adresse}, ${deliveries[0].adresse_code_postal} ${deliveries[0].adresse_ville}`}</Text>
        <Text>🕒 {deliveries[0].creneau}</Text>
      </View>

      {/* Liste des autres livraisons */}
      <FlatList
        data={deliveries}
        keyExtractor={(item) => item.numero_livraison}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => console.log("Détails", item.numero_livraison)}>
            <Text style={styles.client}>{item.client_prenom} {item.client_nom}</Text>
            <Text>{`${item.adresse}, ${item.adresse_code_postal} ${item.adresse_ville}`}</Text>
            <Text>🕒 {item.creneau}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bouton "Démarrer la tournée" */}
      <TouchableOpacity style={styles.startButton} onPress={() => console.log("Tournée démarrée")}>
        <Text style={styles.startButtonText}>🚚 Démarrer la tournée</Text>
      </TouchableOpacity>
    </View>
  );
}
