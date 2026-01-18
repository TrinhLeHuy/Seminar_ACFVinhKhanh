/**
 * Mobile Audio Player Component - View
 */

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import type { AudioGuide } from '../../../shared/models/AudioGuide';
import { LANGUAGE_NAMES } from '../../../shared/models/AudioGuide';

interface AudioPlayerProps {
  audioGuide: AudioGuide;
}

export const AudioPlayer = ({ audioGuide }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const togglePlay = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioGuide.audioUrl },
          { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const languageName =
    LANGUAGE_NAMES[audioGuide.language as keyof typeof LANGUAGE_NAMES] ||
    audioGuide.language;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.playButton} onPress={togglePlay}>
        <Text style={styles.playButtonText}>
          {isPlaying ? '⏸' : '▶'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.language}>{languageName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  language: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});
