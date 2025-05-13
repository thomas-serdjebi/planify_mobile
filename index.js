import 'react-native-reanimated';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';

// Doit être exporté pour que le Fast Refresh fonctionne correctement
export function App() {
  const ctx = require.context('./app');
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
