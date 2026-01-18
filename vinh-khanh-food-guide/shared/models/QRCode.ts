/**
 * Shared QRCode Model - Compatible with Spring Boot Backend
 */

export interface QRCode {
  qrId: number;
  qrValue: string;
  locationId: number;
}

export interface QRCodeRequest {
  qrValue: string;
  locationId: number;
}

export interface QRScanRequest {
  qrValue: string;
  deviceInfo?: string;
}
