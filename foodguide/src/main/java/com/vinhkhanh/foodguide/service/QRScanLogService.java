package com.vinhkhanh.foodguide.service;

import com.vinhkhanh.foodguide.dto.LocationDetailDTO;
import com.vinhkhanh.foodguide.dto.QRScanRequest;
import com.vinhkhanh.foodguide.entity.QRCode;
import com.vinhkhanh.foodguide.entity.QRScanLog;
import com.vinhkhanh.foodguide.repository.QRCodeRepository;
import com.vinhkhanh.foodguide.repository.QRScanLogRepository;
import com.vinhkhanh.foodguide.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class QRScanLogService {
    @Autowired
    private QRScanLogRepository qrScanLogRepository;

    @Autowired
    private QRCodeRepository qrCodeRepository;

    @Autowired
    private LocationService locationService;

    public LocationDetailDTO scanQRCode(QRScanRequest request) {
        QRCode qrCode = qrCodeRepository.findByQrValue(request.getQrValue())
                .orElseThrow(() -> new RuntimeException("QR Code not found: " + request.getQrValue()));

        // Log the scan
        QRScanLog scanLog = new QRScanLog();
        scanLog.setQrCode(qrCode);
        scanLog.setDeviceInfo(request.getDeviceInfo());
        qrScanLogRepository.save(scanLog);

        // Return location details
        return locationService.getLocationById(qrCode.getLocation().getLocationId());
    }

    public Long getScanCountByQRCode(Long qrId) {
        return qrScanLogRepository.countByQrId(qrId);
    }
}
