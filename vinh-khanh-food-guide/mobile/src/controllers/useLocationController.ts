/**
 * Mobile Location Controller - Business Logic for Locations
 * Uses shared API to communicate with backend
 */

import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationApi, qrScanApi } from '../../../shared/api';
import type { Location, LocationDetail, LocationRequest } from '../../../shared/models/Location';
import type { QRScanRequest } from '../../../shared/models/QRCode';

export const useLocationController = () => {
  const queryClient = useQueryClient();
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  // Query: Get all locations
  const {
    data: locations = [],
    isLoading: isLoadingLocations,
    error: locationsError,
  } = useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: () => locationApi.getAll(),
  });

  // Query: Get location by ID
  const {
    data: locationDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery<LocationDetail>({
    queryKey: ['location', selectedLocationId],
    queryFn: () => locationApi.getById(selectedLocationId!),
    enabled: selectedLocationId !== null,
  });

  // Mutation: Scan QR code
  const scanQRMutation = useMutation({
    mutationFn: async (data: QRScanRequest) => {
      // Get device info for mobile
      const deviceInfo = `React Native - ${require('react-native').Platform.OS}`;
      return qrScanApi.scan({ ...data, deviceInfo });
    },
    onSuccess: (data) => {
      setSelectedLocationId(data.locationId);
      queryClient.setQueryData(['location', data.locationId], data);
    },
  });

  // Helper functions
  const selectLocation = useCallback((id: number) => {
    setSelectedLocationId(id);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedLocationId(null);
  }, []);

  const scanQRCode = useCallback(
    (qrValue: string) => {
      scanQRMutation.mutate({ qrValue });
    },
    [scanQRMutation]
  );

  return {
    // Data
    locations,
    locationDetail,
    selectedLocationId,

    // Loading states
    isLoadingLocations,
    isLoadingDetail,
    isLoading: isLoadingLocations || isLoadingDetail,

    // Errors
    locationsError,
    detailError,

    // Actions
    selectLocation,
    clearSelection,
    scanQRCode,

    // Mutations
    isScanning: scanQRMutation.isPending,
  };
};
