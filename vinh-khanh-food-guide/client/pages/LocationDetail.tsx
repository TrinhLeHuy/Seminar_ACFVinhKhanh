/**
 * Location Detail Page - View
 * Shows detailed information about a location
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, DollarSign, Headphones } from 'lucide-react';
import { locationApi } from '@shared/api';
import { AudioPlayer } from '@/components/AudioPlayer';

export const LocationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const locationId = id ? parseInt(id, 10) : null;

  const {
    data: locationDetail,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['location', locationId],
    queryFn: () => locationApi.getById(locationId!),
    enabled: locationId !== null,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto p-6">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
            <div className="text-gray-600">Đang tải thông tin địa điểm...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !locationDetail) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto p-6">
          <div className="text-center py-20">
            <p className="text-2xl mb-2">⚠️</p>
            <div className="text-red-500 mb-4">Không tìm thấy địa điểm hoặc có lỗi xảy ra</div>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại trang chủ
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-6 space-y-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        {/* Location Header */}
        <Card>
          {locationDetail.imageUrl && (
            <div className="aspect-video w-full overflow-hidden bg-gray-200">
              <img
                src={locationDetail.imageUrl}
                alt={locationDetail.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        <CardHeader>
          <CardTitle className="text-2xl">{locationDetail.name}</CardTitle>
          <CardDescription>{locationDetail.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {locationDetail.latitude.toFixed(6)}, {locationDetail.longitude.toFixed(6)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Foods */}
      {locationDetail.foods && locationDetail.foods.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Món Ăn
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {locationDetail.foods.map((food) => (
                <div key={food.foodId} className="border rounded-lg p-4">
                  <div className="font-semibold">{food.name}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {food.description}
                  </div>
                  <div className="text-lg font-bold text-primary mt-2">
                    {food.price.toLocaleString('vi-VN')} ₫
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audio Guides */}
      {locationDetail.audioGuides && locationDetail.audioGuides.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="h-5 w-5" />
              Audio Guide (Thuyết Minh)
            </CardTitle>
            <CardDescription>
              Chọn ngôn ngữ để nghe thuyết minh về địa điểm này
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationDetail.audioGuides.map((audioGuide) => (
                <AudioPlayer key={audioGuide.audioId} audioGuide={audioGuide} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* QR Code Info */}
      {locationDetail.qrCode && (
        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>Mã QR Code: {locationDetail.qrCode.qrValue}</CardDescription>
          </CardHeader>
        </Card>
      )}
      </div>
    </div>
  );
};
