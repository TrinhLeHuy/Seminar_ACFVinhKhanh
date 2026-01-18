/**
 * Mobile Location Card Component - View
 */

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Location } from '../../../shared/models/Location';

interface LocationCardProps {
  location: Location;
  onPress?: () => void;
}

export const LocationCard = ({ location, onPress }: LocationCardProps) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {location.imageUrl ? (
        <Image source={{ uri: location.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text style={styles.placeholderText}>📷</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {location.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {location.description || 'Không có mô tả'}
        </Text>

        <View style={styles.footer}>
          <View style={styles.locationInfo}>
            <Text style={styles.iconText}>📍</Text>
            <Text style={styles.locationText}>
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
          </View>

          {location.foods && location.foods.length > 0 && (
            <Text style={styles.metaText}>{location.foods.length} món</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconText: {
    fontSize: 14,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
});
