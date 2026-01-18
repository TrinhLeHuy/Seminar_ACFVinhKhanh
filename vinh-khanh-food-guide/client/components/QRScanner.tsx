/**
 * QR Scanner Component - View
 * Scans QR codes to get location information
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Scan } from 'lucide-react';
import { useLocationController } from '@/controllers/useLocationController';
import { LocationCard } from './LocationCard';

export const QRScanner = () => {
  const [qrValue, setQrValue] = useState('');
  const { scanQRCode, locationDetail, isScanning } = useLocationController();

  const handleScan = () => {
    if (!qrValue.trim()) return;

    const deviceInfo = navigator.userAgent;
    scanQRCode(qrValue.trim(), deviceInfo);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Quét QR Code
          </CardTitle>
          <CardDescription>
            Nhập mã QR code hoặc quét bằng camera để xem thông tin địa điểm
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Nhập mã QR code..."
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleScan} disabled={isScanning || !qrValue.trim()}>
              <Scan className="h-4 w-4 mr-2" />
              {isScanning ? 'Đang quét...' : 'Quét'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {locationDetail && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-4">Kết quả quét QR:</h3>
          <LocationCard location={locationDetail} />
        </div>
      )}
    </div>
  );
};
