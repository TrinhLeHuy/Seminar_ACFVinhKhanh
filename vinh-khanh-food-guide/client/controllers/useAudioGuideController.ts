/**
 * Audio Guide Controller - Business Logic for Audio Guides
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { audioGuideApi } from '@shared/api';
import type { AudioGuide, AudioGuideRequest, SupportedLanguage } from '@shared/models/AudioGuide';

export const useAudioGuideController = () => {
  const queryClient = useQueryClient();

  // Query: Get all audio guides
  const {
    data: audioGuides = [],
    isLoading: isLoadingAll,
  } = useQuery<AudioGuide[]>({
    queryKey: ['audioGuides'],
    queryFn: () => audioGuideApi.getAll(),
  });

  // Query: Get audio guides by location
  const getByLocation = (locationId: number) => {
    return useQuery<AudioGuide[]>({
      queryKey: ['audioGuides', 'location', locationId],
      queryFn: () => audioGuideApi.getByLocation(locationId),
      enabled: !!locationId,
    });
  };

  // Query: Get audio guide by location and language
  const getByLocationAndLanguage = (locationId: number, language: SupportedLanguage) => {
    return useQuery<AudioGuide>({
      queryKey: ['audioGuide', 'location', locationId, 'language', language],
      queryFn: () => audioGuideApi.getByLocationAndLanguage(locationId, language),
      enabled: !!locationId && !!language,
    });
  };

  // Query: Get audio guides by language
  const getByLanguage = (language: SupportedLanguage) => {
    return useQuery<AudioGuide[]>({
      queryKey: ['audioGuides', 'language', language],
      queryFn: () => audioGuideApi.getByLanguage(language),
      enabled: !!language,
    });
  };

  // Mutation: Create audio guide
  const createMutation = useMutation({
    mutationFn: (data: AudioGuideRequest) => audioGuideApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audioGuides'] });
    },
  });

  // Mutation: Update audio guide
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AudioGuideRequest }) =>
      audioGuideApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audioGuides'] });
    },
  });

  // Mutation: Delete audio guide
  const deleteMutation = useMutation({
    mutationFn: (id: number) => audioGuideApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['audioGuides'] });
    },
  });

  return {
    // Data
    audioGuides,
    isLoadingAll,

    // Query hooks
    getByLocation,
    getByLocationAndLanguage,
    getByLanguage,

    // Mutations
    createAudioGuide: createMutation.mutate,
    updateAudioGuide: updateMutation.mutate,
    deleteAudioGuide: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
