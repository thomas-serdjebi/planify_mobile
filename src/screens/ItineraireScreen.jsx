import React, { useEffect, useState } from "react";
import { 
  View, Text, ActivityIndicator, TouchableOpacity, Alert, FlatList, Linking
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { AntDesign, MaterialIcons } from "react-native-vector-icons";
import styles from "../styles/ItineraireScreenStyles";

const GOOGLE_MAPS_API_KEY = "AIzaSyDkEFuJ9c8CkTiJ4kDvoXd7atS8LqWBrvE";

const ItineraireScreen = ({ route, navigation }) => {
  const { tournee } = route.params;
  const [livraisons, setLivraisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [tourneeDemarree, setTourneeDemarree] = useState(tournee.statut === "en cours");
  const [canCloseTournee, setCanCloseTournee] = useState(false);
  const isTodayTournee = tournee.date === new Date().toISOString().split('T')[0];



  useEffect(() => {
    (async () => {
      await getCurrentLocation();
      await fetchItineraire();
    })();
  }, []);

  useEffect(() => {
    if (livraisons.length > 0) {
      const allCompleted = livraisons.every(livraison => 
        livraison.statut === "livrée" || livraison.statut === "reportée"
      );
      setCanCloseTournee(allCompleted);
    }
  }, [livraisons]);
  

  const fetchItineraire = async () => {
    try {
      const response = await fetch(`http://192.168.0.11:8000/api/tournees/${tournee.id}/livraisons`);
      const data = await response.json();
      if (!data.livraisons || !Array.isArray(data.livraisons)) {
        console.error("❌ Erreur: données invalides.");
        return;
      }
      const sortedLivraisons = data.livraisons
        .sort((a, b) => (a.trajet?.ordre ?? 0) - (b.trajet?.ordre ?? 0))
        .filter(l => l.latitude && l.longitude);
      setLivraisons(sortedLivraisons);
    } catch (error) {
      console.error("❌ Erreur chargement livraisons:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("❌ Permission de localisation refusée !");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
  };

  const handleStartTournee = async () => {
    try {
      const requestBody = JSON.stringify({ statut: "en cours" });
      const response = await fetch(`http://192.168.0.11:8000/api/tournees/${tournee.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
          "Accept": "application/ld+json"
        },
        body: requestBody,
      });
      if (!response.ok) throw new Error("❌ Impossible de démarrer la tournée.");
      Alert.alert("🚀 Tournée démarrée !");
      setTourneeDemarree(true);
      openGoogleMaps();
    } catch (error) {
      console.error("❌ Erreur:", error.message);
      Alert.alert("Erreur", error.message);
    }
  };

  const updateLivraisonStatut = async (livraisonId, statut) => {
    try {
      const requestBody = JSON.stringify({ statut });
  
      const response = await fetch(`http://192.168.0.11:8000/api/livraisons/${livraisonId}`, {  // <-- CORRECTION : Utilisation des backticks `
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
          "Accept": "application/ld+json"
        },
        body: requestBody,
      });
  
      if (!response.ok) {
        throw new Error("❌ Impossible de mettre à jour la livraison.");
      }
  
      Alert.alert("✅ Livraison mise à jour !");
  
      // Met à jour l'UI après la mise à jour de l'API
      fetchItineraire();
    } catch (error) {
      console.error("❌ Erreur:", error.message);
      Alert.alert("Erreur", error.message);
    }
  };

  const getGoogleMapsURL = () => {

    const livraisonsEnCours = livraisons
      .filter(l => l.statut !== "Livrée" && l.statut !== "Reportée")
      .sort((a, b) => (a.trajet?.ordre ?? 0) - (b.trajet?.ordre ?? 0));
  
    if (livraisonsEnCours.length === 0) {
      return "";
    }
  
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
  
    if (livraisonsEnCours.length === 1) {
      const destination = `${livraisonsEnCours[0].latitude},${livraisonsEnCours[0].longitude}`;
      return `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${origin}&destination=${destination}&travelmode=driving`;
    }
  
    const waypoints = livraisonsEnCours.length > 1 
      ? `&waypoints=${livraisonsEnCours.map(l => `${l.latitude},${l.longitude}`).join("|")}`
      : "";
  
    return `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=${origin}${waypoints}&travelmode=driving`;
  };
  
  

  const openGoogleMaps = () => {
    // 🔹 Filtrer les livraisons non complétées
    const livraisonsEnCours = livraisons
      .filter(l => l.statut !== "Livrée" && l.statut !== "Reportée")
      .sort((a, b) => (a.trajet?.ordre ?? 0) - (b.trajet?.ordre ?? 0)); // Garder l'ordre de livraison
  
    // 🔹 Vérifier s'il reste des livraisons à faire
    if (livraisonsEnCours.length === 0) {
      Alert.alert("✅ Toutes les livraisons ont été complétées !");
      return;
    }
  
    // 🔹 Définir l'origine comme la position actuelle
    const origin = `${currentLocation.latitude},${currentLocation.longitude}`;
  
    // 🔹 Si une seule livraison reste, elle est la destination
    if (livraisonsEnCours.length === 1) {
      const destination = `${livraisonsEnCours[0].latitude},${livraisonsEnCours[0].longitude}`;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      Linking.openURL(url);
      return;
    }
  
    // 🔹 Ajouter toutes les livraisons restantes comme waypoints (y compris la dernière)
    const waypoints = livraisonsEnCours.length > 1 
      ? `&waypoints=${livraisonsEnCours.map(l => `${l.latitude},${l.longitude}`).join("|")}`
      : "";
  
    // 🔹 Construire l'URL finale
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}${waypoints}&travelmode=driving`;
  
    // 🔹 Ouvrir Google Maps
    Linking.openURL(url);
  };
  
  
  

  const closeTournee = async () => {
    try {
      const response = await fetch(`http://192.168.0.11:8000/api/tournees/${tournee.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/merge-patch+json",
          "Accept": "application/ld+json"
        },
        body: JSON.stringify({ statut: "terminée" }),
      });
  
      if (!response.ok) throw new Error("❌ Impossible de clôturer la tournée.");
      
      Alert.alert("✅ Tournée clôturée !");
      navigation.goBack(); // Retour à l'écran précédent après clôture
  
    } catch (error) {
      console.error("❌ Erreur:", error.message);
      Alert.alert("Erreur", error.message);
    }
  };
  
  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Tournée #{tournee.id}</Text>
          </View>
          <WebView 
            originWhitelist={["*"]} 
            source={{ html: `<html>
              <body>
                <iframe width="100%" height="1300" frameborder="0" style="border:0"
                  src="${getGoogleMapsURL()}"
                  allowfullscreen>
                </iframe>
              </body>
            </html>` }} 
            style={{ height: 600, width: "100%" }} 
          />
         <View style={{ marginBottom: -20 }}>
          {tourneeDemarree ? (
            // 🔹 Si la tournée est en cours, affiche "Itinéraire"
            <TouchableOpacity style={styles.startButton} onPress={openGoogleMaps}>
              <MaterialIcons name="directions" size={20} color="white" />
              <Text style={styles.startButtonText}>Itinéraire</Text>
            </TouchableOpacity>
          ) : isTodayTournee ? (
            // 🔹 Si la tournée est prévue aujourd’hui et pas encore démarrée, affiche "Démarrer la tournée"
            <TouchableOpacity style={styles.startButton} onPress={handleStartTournee}>
              <AntDesign name="playcircleo" size={20} color="white" />
              <Text style={styles.startButtonText}>Démarrer la tournée</Text>
            </TouchableOpacity>
          ) : (
            // ❌ Si la tournée est pour un autre jour, affiche un message désactivé
            <View style={styles.startButtonDisabled}>
              <Text style={styles.startButtonText}>Tournée non prévue aujourd'hui</Text>
            </View>
          )}
        </View>
        </>
      }
      data={livraisons}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.livraisonCard}>
          <Text style={styles.livraisonEtape}>Étape {String.fromCharCode(65 + index)}</Text>
          <Text style={styles.livraisonNumero}>Livraison #{item.numero}</Text>
          <Text style={styles.livraisonClient}>{item.client_prenom} {item.client_nom}</Text>
          <Text style={styles.livraisonAdresse}>{item.adresse}, {item.code_postal} {item.ville}</Text>
          {tourneeDemarree && (
            <View style={styles.livraisonActions}>
              {item.statut === "Livrée" ? (
                <>
                  <View style={styles.statusButtonSuccess}>
                    <Text style={styles.buttonText}>✅ Livrée</Text>
                  </View>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => updateLivraisonStatut(item.id, "Programmée")}> 
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </>
              ) : item.statut === "Reportée" ? (
                <>
                  <View style={styles.statusButtonWarning}>
                    <Text style={styles.buttonText}>⚠️ Reportée</Text>
                  </View>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => updateLivraisonStatut(item.id, "Programmée")}> 
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.deliveredButton} onPress={() => updateLivraisonStatut(item.id, "Livrée")}> 
                    <Text style={styles.buttonText}>Livrée</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.reportButton} onPress={() => updateLivraisonStatut(item.id, "Reportée")}> 
                    <Text style={styles.buttonText}>Reportée</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        </View>
      )}
      
      // Ajout du bouton "Clôturer la tournée" à la fin de la FlatList
      ListFooterComponent={
        <View style={{ marginVertical: 20, alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.closeTourneeButton, !canCloseTournee && styles.closeTourneeButtonDisabled]}
            onPress={closeTournee}
            disabled={!canCloseTournee}
          >
            <Text style={styles.closeTourneeText}>Clôturer la tournée</Text>
          </TouchableOpacity>
        </View>
      }
    />
  );
  
};

export default ItineraireScreen;
