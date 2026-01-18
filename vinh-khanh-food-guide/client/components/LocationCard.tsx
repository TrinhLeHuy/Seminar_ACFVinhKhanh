/**
 * Location Card Component - View
 * Displays a location card with basic information
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Image as ImageIcon } from 'lucide-react';
import type { Location } from '@shared/models/Location';

interface LocationCardProps {
  location: Location;
  onViewDetails?: (locationId: number) => void;
}

export const LocationCard = ({ location, onViewDetails }: LocationCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {location.imageUrl ? (
        <div className="aspect-video w-full overflow-hidden bg-gray-200">
          <img
            src={location.imageUrl}
            alt={location.name}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}

      <CardHeader>
        <CardTitle className="line-clamp-1">{location.name}</CardTitle>
        <CardDescription className="line-clamp-2">
          {location.description || 'Không có mô tả'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </span>
          </div>

          {location.foods && location.foods.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {location.foods.length} món ăn
            </div>
          )}

          {location.audioGuides && location.audioGuides.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {location.audioGuides.length} ngôn ngữ
            </div>
          )}

          {onViewDetails && (
            <Button
              className="w-full mt-4"
              onClick={() => onViewDetails(location.locationId)}
            >
              Xem Chi Tiết
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
