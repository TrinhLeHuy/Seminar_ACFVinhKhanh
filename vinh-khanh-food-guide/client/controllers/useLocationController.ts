/**
 * Location Controller - Business Logic for Locations
 * Uses shared API to communicate with backend
 */

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { locationApi, qrScanApi } from '@shared/api';
import type { Location, LocationDetail, LocationRequest } from '@shared/models/Location';
import type { QRScanRequest } from '@shared/models/QRCode';

export const useLocationController = (initialLocationId?: number | null) => {
  const queryClient = useQueryClient();
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(
    initialLocationId ?? null
  );

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
  const currentLocationId = selectedLocationId ?? initialLocationId;
  const {
    data: locationDetail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery<LocationDetail>({
    queryKey: ['location', currentLocationId],
    queryFn: () => locationApi.getById(currentLocationId!),
    enabled: currentLocationId !== null && currentLocationId !== undefined,
  });

  // Mutation: Create location
  const createMutation = useMutation({
    mutationFn: (data: LocationRequest) => locationApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
  });

  // Mutation: Update location
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: LocationRequest }) =>
      locationApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      queryClient.invalidateQueries({ queryKey: ['location', selectedLocationId] });
    },
  });

  // Mutation: Delete location
  const deleteMutation = useMutation({
    mutationFn: (id: number) => locationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      if (selectedLocationId === id) {
        setSelectedLocationId(null);
      }
    },
  });

  // Mutation: Scan QR code
  const scanQRMutation = useMutation({
    mutationFn: (data: QRScanRequest) => qrScanApi.scan(data),
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
    (qrValue: string, deviceInfo?: string) => {
      scanQRMutation.mutate({ qrValue, deviceInfo });
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
    createLocation: createMutation.mutate,
    updateLocation: updateMutation.mutate,
    deleteLocation: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isScanning: scanQRMutation.isPending,
  };
};
