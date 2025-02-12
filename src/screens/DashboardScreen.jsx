import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import styles from "../styles/DashboardScreenStyles"; 
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  
  const [deliveries, setDeliveries] = useState([]);
  const [tournee, setTournee] = useState(null);
  const navigation = useNavigation(); 

  useEffect(() => {
    const fetchTournee = async () => {
      try {
        const response = await axios.get("http://votre-api.com/api/tournee/1/jour"); // Remplacer par l'URL de votre API
        setTournee(response.data);
        setDeliveries(response.data.livraisons);
      } catch (error) {
        console.error("Erreur lors de la récupération de la tournée :", error);
      }
    };

    fetchTournee();
  }, []);

  return (
    <View style={styles.container}>
      {tournee && (
        <>
          <Text style={styles.title}>📦 Tournée du jour</Text>

          {/* Première livraison mise en avant */}
          <View style={styles.firstDelivery}>
            <Text style={styles.subtitle}>📍 Première livraison</Text>
            <Text style={styles.client}>
              {deliveries[0].client_prenom} {deliveries[0].client_nom}
            </Text>
            <Text>{`${deliveries[0].adresse}, ${deliveries[0].code_postal} ${deliveries[0].ville}`}</Text>
            <Text>🕒 {deliveries[0].creneau}</Text>
          </View>

          {/* Liste des autres livraisons */}
          <FlatList
            data={deliveries}
            keyExtractor={(item) => item.numero}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card} onPress={() => console.log("Détails", item.numero)}>
                <Text style={styles.client}>{item.client_prenom} {item.client_nom}</Text>
                <Text>{`${item.adresse}, ${item.code_postal} ${item.ville}`}</Text>
                <Text>🕒 {item.creneau}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Bouton "Démarrer la tournée" */}
          <TouchableOpacity style={styles.startButton} onPress={() => console.log("Tournée démarrée")}>
            <Text style={styles.startButtonText}>🚚 Démarrer la tournée</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
