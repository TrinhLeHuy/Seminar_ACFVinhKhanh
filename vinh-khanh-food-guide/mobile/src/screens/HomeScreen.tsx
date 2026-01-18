/**
 * Home Screen - View
 * Main screen showing list of locations
 */

import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocationController } from '../controllers/useLocationController';
import { LocationCard } from '../components/LocationCard';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { locations, isLoading, locationsError } = useLocationController();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // Refresh will be handled by React Query
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải địa điểm...</Text>
      </View>
    );
  }

  if (locationsError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Có lỗi xảy ra khi tải dữ liệu</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.locationId.toString()}
        renderItem={({ item }) => (
          <LocationCard
            location={item}
            onPress={() => navigation.navigate('LocationDetail', { locationId: item.locationId })}
          />
        )}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>Không có địa điểm nào</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
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
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
