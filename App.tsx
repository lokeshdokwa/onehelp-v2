import React, { useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { getDatabase } from './src/database/DatabaseClient';
import { LocationService } from './src/services/LocationService';
import { name as appName } from './app.json';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initApp() {
      try {
        console.log('[App] Initializing OneHelp...');
        
        // 1. Initialize SQLite Database & Run Migrations
        getDatabase();
        console.log('[App] Database initialized.');

        // 2. Start Background Location Service
        await LocationService.start();
        console.log('[App] Location tracking started.');

        // 3. Register background tasks / sync services here...

        setIsReady(true);
      } catch (error) {
        console.error('[App] Initialization failed:', error);
        // Fallback: still start app, but maybe show degraded mode banner
        setIsReady(true);
      }
    }

    initApp();

    return () => {
      // Cleanup on unmount (rarely happens in root)
      LocationService.stop();
    };
  }, []);

  if (!isReady) {
    return null; // Could return a splash screen here
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

AppRegistry.registerComponent(appName, () => App);

export default App;
