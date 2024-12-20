//reactnative project anna shahinyan - random joke generator

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useColorScheme,
  Animated,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const fetchJoke = async () => {
    if (loading) return;
    
    setLoading(true);
    fadeOut();

    try {
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
      const data = await response.json();
      setJoke(data);
      fadeIn();
    } catch (error) {
      console.error(error);
    }
    
    setLoading(false);
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const renderJoke = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#4CAF50" />;
    }

    if (!joke) {
      return (
        <Text style={[styles.placeholder, {color: isDarkMode ? '#fff' : '#000'}]}>
          Tap button for a random joke
        </Text>
      );
    }

    return (
      <>
        <Text style={[styles.jokeText, {color: isDarkMode ? '#fff' : '#000'}]}>
          {joke.setup || joke.joke}
        </Text>
        {joke.delivery && (
          <Text style={[styles.punchline, {color: isDarkMode ? '#fff' : '#000'}]}>
            {joke.delivery}
          </Text>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5'}]}>
      <Text style={[styles.title, {color: isDarkMode ? '#fff' : '#000'}]}>
        Random Joke Generator
      </Text>
      
      <Animated.View style={[styles.jokeContainer, {opacity: fadeAnim}]}>
        {renderJoke()}
      </Animated.View>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchJoke}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>
          {loading ? 'Loading...' : 'Get Joke'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  jokeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
  },
  jokeText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  punchline: {
    fontSize: 18,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
  },
  placeholder: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
