import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initApp() {
      try {
        console.log('[App] Initializing OneHelp...');
        // In real device native run, database and location will initialize
        try {
          const { getDatabase } = require('./src/database/DatabaseClient');
          getDatabase();
        } catch (dbErr) {
          console.log('[App] DB Client notice:', dbErr);
        }

        try {
          const { LocationService } = require('./src/services/LocationService');
          LocationService.start();
        } catch (locErr) {
          console.log('[App] Location notice:', locErr);
        }

        setIsReady(true);
      } catch (error) {
        console.error('[App] Initialization note:', error);
        setIsReady(true);
      }
    }

    initApp();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
