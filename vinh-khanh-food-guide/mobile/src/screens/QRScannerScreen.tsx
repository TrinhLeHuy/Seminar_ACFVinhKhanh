/**
 * QR Scanner Screen - View
 * Mobile screen for scanning QR codes
 * Note: Camera scanner requires development build. Using manual input as fallback.
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button as RNButton, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLocationController } from '../controllers/useLocationController';

export const QRScannerScreen = () => {
  const navigation = useNavigation<any>();
  const { scanQRCode, locationDetail } = useLocationController();
  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      scanQRCode(manualInput.trim());
      setTimeout(() => {
        if (locationDetail) {
          navigation.navigate('LocationDetail', {
            locationId: locationDetail.locationId,
          });
        } else {
          Alert.alert('Thông báo', 'Đang tìm địa điểm...', [
            {
              text: 'OK',
              onPress: () => {
                // Wait a bit more for location to load
                setTimeout(() => {
                  if (locationDetail) {
                    navigation.navigate('LocationDetail', {
                      locationId: locationDetail.locationId,
                    });
                  }
                }, 1000);
              },
            },
          ]);
        }
      }, 500);
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập mã QR');
    }
  };

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Quét QR Code</Text>
      <Text style={styles.infoText}>
        ⚠️ Camera scanner cần development build. Vui lòng nhập mã QR thủ công.
      </Text>
      <Text style={styles.manualTitle}>Nhập mã QR code:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã QR code..."
        value={manualInput}
        onChangeText={setManualInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <RNButton
        title="Tìm địa điểm"
        onPress={handleManualSubmit}
      />
      <Text style={styles.hint}>
        💡 Tip: Mã QR code thường được in trên biển hiệu hoặc bàn ăn tại địa điểm
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#f97316',
    marginBottom: 30,
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
  },
  manualTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  hint: {
    marginTop: 30,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
