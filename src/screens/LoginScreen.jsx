import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/LoginScreenStyles";


const users = [
  { email: "test@planify.com", password: "123456" },
  { email: "admin@planify.com", password: "adminpass" },
];


const errorMessages = {
  emptyFields: "Veuillez remplir tous les champs.",
  invalidCredentials: "Email ou mot de passe incorrect.",
};

export default function LoginScreen() {
  const navigation = useNavigation();  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError(""); 

    if (!email || !password) {
      setError(errorMessages.emptyFields);
      return;
    }

    const userExists = users.some(user => user.email === email && user.password === password);

    if (userExists) {
      console.log("Connexion réussie avec :", email);
      navigation.navigate('Dashboard'); 
    } else {
      setError(errorMessages.invalidCredentials);
    }
  };

  return (
    <View style={styles.pageContainer}>
      <ImageBackground
        source={require("../../assets/images/logo_planify_2.png")}
        style={styles.background}
        resizeMode="contain"
      >
        <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.overlay} />
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Connexion</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null} 
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ddd"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
