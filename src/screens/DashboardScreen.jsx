import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/DashboardScreenStyles";

export default function Dashboard() {
  const [tournees, setTournees] = useState([]);
  const [expandedTournee, setExpandedTournee] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const navigation = useNavigation();
  
  const ipv4 = "192.168.1.21";
  const apiBaseUrl = `http://${ipv4}:8000/api/tournee`;
  const livreurId = 6;
  const today = new Date().toISOString().split('T')[0];

  const formatDate = (dateStr) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  const getTournees = () => {
    setIsLoading(true);
    setMessage("");

    fetch(`${apiBaseUrl}/${livreurId}/${today}/jour`)
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.message || "Erreur inconnue");
          });
        }
        return response.json();
      })
      .then(data => {
        setTournees(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des tournées :", error.message);
        setMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getTournees();
  }, []);

  const toggleTournee = (id) => {
    setExpandedTournee(expandedTournee === id ? null : id);
  };

  const renderTournee = ({ item }) => (
    <View style={styles.tourneeContainer}>
      <TouchableOpacity 
        style={styles.tourneeButton} 
        onPress={() => toggleTournee(item.tournee_id)}>
        <Text style={styles.subtitle}>🚛 Tournée #{item.tournee_id} - {item.creneau === '1' ? "Matin ☀️ (8h-13h)" : "Après-midi 🌙 (14h-18h)"}</Text>
        <Ionicons name={expandedTournee === item.tournee_id ? "chevron-up" : "chevron-down"} size={24} color="black" />
      </TouchableOpacity>

      {expandedTournee === item.tournee_id && (
        <>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>🚚 Démarrer cette tournée</Text>
          </TouchableOpacity>
          {item.livraisons.length > 0 ? (
            <FlatList
              data={item.livraisons}
              keyExtractor={(livraison) => livraison.numero?.toString() || Math.random().toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card}>
                  <Text style={styles.client}>{item.client_prenom} {item.client_nom}</Text>
                  <Text>{`${item.adresse}, ${item.code_postal} ${item.ville}`}</Text>
                  <Text>📦 Livraison #{item.numero}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text style={styles.infoText}>Aucune livraison pour cette tournée.</Text>
          )}
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.dateText}>{formatDate(today)}</Text>
      {message ? <Text style={styles.errorText}>{message}</Text> : null}
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {!isLoading && tournees.length > 0 && (
        <>
          <Text style={styles.title}>📦 Tournées du jour</Text>
          <FlatList
            data={tournees}
            keyExtractor={(tournee) => tournee.tournee_id.toString()}
            renderItem={renderTournee}
          />
        </>
      )}
    </View>
  );
}
