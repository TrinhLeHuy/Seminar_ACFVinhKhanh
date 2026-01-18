/**
 * Location Detail Screen - View
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { locationApi } from '../../../shared/api';
import { AudioPlayer } from '../components/AudioPlayer';

export const LocationDetailScreen = ({ route }: any) => {
  const { locationId } = route.params;

  const {
    data: locationDetail,
    isLoading,
    error: detailError,
  } = useQuery({
    queryKey: ['location', locationId],
    queryFn: () => locationApi.getById(locationId),
    enabled: !!locationId,
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải...</Text>
      </View>
    );
  }

  if (detailError || !locationDetail) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không tìm thấy địa điểm</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {locationDetail.imageUrl && (
        <Image source={{ uri: locationDetail.imageUrl }} style={styles.image} />
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{locationDetail.name}</Text>
        {locationDetail.description && (
          <Text style={styles.description}>{locationDetail.description}</Text>
        )}

        {/* Foods */}
        {locationDetail.foods && locationDetail.foods.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Món Ăn</Text>
            {locationDetail.foods.map((food) => (
              <View key={food.foodId} style={styles.foodItem}>
                <Text style={styles.foodName}>{food.name}</Text>
                {food.description && (
                  <Text style={styles.foodDescription}>{food.description}</Text>
                )}
                <Text style={styles.foodPrice}>
                  {food.price.toLocaleString('vi-VN')} ₫
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Audio Guides */}
        {locationDetail.audioGuides && locationDetail.audioGuides.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Audio Guide</Text>
            {locationDetail.audioGuides.map((audioGuide) => (
              <AudioPlayer key={audioGuide.audioId} audioGuide={audioGuide} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  foodItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  foodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f97316',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#f00',
  },
});
