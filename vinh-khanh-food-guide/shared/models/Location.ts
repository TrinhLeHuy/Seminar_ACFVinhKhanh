/**
 * Shared Location Model - Compatible with Spring Boot Backend
 */

export interface Location {
  locationId: number;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  userId?: number;
  foods?: Food[];
  audioGuides?: AudioGuide[];
  qrCode?: QRCode;
}

export interface LocationDetail extends Location {
  foods: Food[];
  audioGuides: AudioGuide[];
  qrCode: QRCode;
}

export interface LocationRequest {
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  imageUrl?: string;
}
