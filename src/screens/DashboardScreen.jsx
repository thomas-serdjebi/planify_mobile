import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../styles/DashboardScreenStyles';

const apiBaseUrl = 'http://192.168.2.130:8000/api/tournees';
const livreurId = 1;

const Dashboard = () => {
  const [tournees, setTournees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historiqueVisible, setHistoriqueVisible] = useState(false);
  const [expandedTournees, setExpandedTournees] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // 📌 Fetch les tournées
  const fetchTournees = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/all/${livreurId}`);
      if (!response.ok) throw new Error(`Erreur ${response.status}`);
      const data = await response.json();

      const sortedTournees = data.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB || a.creneau.localeCompare(b.creneau);
      });

      setTournees(sortedTournees);
    } catch (error) {
      console.error(`❌ Erreur lors du fetch:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournees();
  }, []);

  const toggleExpand = (id) => {
    setExpandedTournees((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isFutureOrToday = (tournee) => tournee.date >= today;

  // 📅 Gestion de la sélection de date
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const formattedDate = date.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
    }
  };

  // 📌 Réinitialiser la sélection de date
  const resetDateSelection = () => {
    setSelectedDate(null);
  };

  // 📌 Filtrage des tournées selon historique / future et date choisie
  const displayedTournees = historiqueVisible
    ? tournees
        .filter(t => t.date < today)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) 
    : tournees.filter(isFutureOrToday);

  // Appliquer le filtre de date si une date est sélectionnée
  const filteredTournees = selectedDate
    ? displayedTournees.filter(t => t.date === selectedDate)
    : displayedTournees;

  // Grouper les tournées par date
  const groupedTournees = filteredTournees.reduce((acc, tournee) => {
    if (!acc[tournee.date]) acc[tournee.date] = [];
    acc[tournee.date].push(tournee);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* 📌 Titre centré */}
      <Text style={styles.pageTitle}>
        {historiqueVisible ? "Historique" : "Tournées attribuées"}
      </Text>

      {/* 📌 Sélecteur de date avec icône et date sur la même ligne */}
      <View style={styles.datePickerContainer}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.calendarIcon}>
          <AntDesign name="calendar" size={22} color="#004AAD" />
        </TouchableOpacity>

        {selectedDate && (
          <View style={styles.selectedDateContainer}>
            <Text style={styles.selectedDateText}>{selectedDate}</Text>
            <TouchableOpacity onPress={resetDateSelection} style={styles.resetDateButton}>
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate ? new Date(selectedDate) : new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) {
                setSelectedDate(date.toISOString().split('T')[0]);
              }
            }}
          />
        )}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={Object.keys(groupedTournees)}
          keyExtractor={(date) => date}
          renderItem={({ item: date }) => (
            <View>
              {/* 📌 Date Section */}
              <View style={styles.dateSection}>
                <Text style={styles.tourneeDate}>{date}</Text>
              </View>

              {/* 📌 Tournées du jour */}
              {groupedTournees[date].map((tournee) => (
                <View key={tournee.id} style={styles.tourneeCard}>
                  <View style={styles.tourneeHeader}>
                    <Text style={styles.tourneeCreneau}>
                      Créneau {tournee.creneau} ({tournee.creneau === '1' ? '8h-13h' : '14h-18h'})
                    </Text>

                    {/* 📌 Bouton Itinéraire */}
                    {isFutureOrToday(tournee) && (
                      <TouchableOpacity style={styles.itineraryButton}>
                        <MaterialIcons name="directions" size={20} color="white" />
                        <Text style={styles.itineraryButtonText}>Itinéraire</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <Text style={styles.tourneeNumber}>Tournée #{tournee.id}</Text>

                  {/* 📌 Bouton Voir les livraisons pour TOUTES les tournées */}
                  <TouchableOpacity onPress={() => toggleExpand(tournee.id)} style={styles.expandButton}>
                    <Text style={styles.expandButtonText}>
                      {expandedTournees[tournee.id] ? "▼ Masquer les livraisons" : "▶ Voir les livraisons"}
                    </Text>
                  </TouchableOpacity>

                  {/* 📌 Affichage des livraisons */}
                  {expandedTournees[tournee.id] && (
                    <FlatList
                      data={tournee.livraisons}
                      keyExtractor={(livraison) => livraison.id.toString()}
                      renderItem={({ item: livraison }) => (
                        <View style={styles.livraisonCard}>
                          <Text style={styles.livraisonClient}>
                            {livraison.client_prenom} {livraison.client_nom}
                          </Text>
                          <Text style={styles.livraisonAdresse}>
                            {livraison.adresse}, {livraison.code_postal} {livraison.ville}
                          </Text>
                          <Text style={styles.livraisonNumero}>📦 Livraison #{livraison.numero}</Text>
                          <Text style={styles.livraisonStatut}>📅 {livraison.statut}</Text>
                        </View>
                      )}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchTournees} />}
        />
      )}

      {/* 📌 Bouton flottant pour afficher l'historique */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setHistoriqueVisible(!historiqueVisible)}
      >
        <AntDesign name="clockcircleo" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
