package com.vinhkhanh.foodguide.service;

import com.vinhkhanh.foodguide.dto.QRCodeDTO;
import com.vinhkhanh.foodguide.dto.QRCodeRequest;
import com.vinhkhanh.foodguide.entity.Location;
import com.vinhkhanh.foodguide.entity.QRCode;
import com.vinhkhanh.foodguide.repository.LocationRepository;
import com.vinhkhanh.foodguide.repository.QRCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class QRCodeService {
    @Autowired
    private QRCodeRepository qrCodeRepository;

    @Autowired
    private LocationRepository locationRepository;

    public List<QRCodeDTO> getAllQRCodes() {
        return qrCodeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public QRCodeDTO getQRCodeById(Long id) {
        QRCode qrCode = qrCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QR Code not found with id: " + id));
        return convertToDTO(qrCode);
    }

    public QRCodeDTO getQRCodeByValue(String qrValue) {
        QRCode qrCode = qrCodeRepository.findByQrValue(qrValue)
                .orElseThrow(() -> new RuntimeException("QR Code not found: " + qrValue));
        return convertToDTO(qrCode);
    }

    public QRCodeDTO createQRCode(QRCodeRequest request) {
        if (qrCodeRepository.existsByQrValue(request.getQrValue())) {
            throw new RuntimeException("QR Code value already exists");
        }

        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        QRCode qrCode = new QRCode();
        qrCode.setQrValue(request.getQrValue());
        qrCode.setLocation(location);

        QRCode saved = qrCodeRepository.save(qrCode);
        return convertToDTO(saved);
    }

    public QRCodeDTO updateQRCode(Long id, QRCodeRequest request) {
        QRCode qrCode = qrCodeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("QR Code not found"));

        if (!qrCode.getQrValue().equals(request.getQrValue()) && 
            qrCodeRepository.existsByQrValue(request.getQrValue())) {
            throw new RuntimeException("QR Code value already exists");
        }

        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        qrCode.setQrValue(request.getQrValue());
        qrCode.setLocation(location);

        QRCode updated = qrCodeRepository.save(qrCode);
        return convertToDTO(updated);
    }

    public void deleteQRCode(Long id) {
        qrCodeRepository.deleteById(id);
    }

    private QRCodeDTO convertToDTO(QRCode qrCode) {
        QRCodeDTO dto = new QRCodeDTO();
        dto.setQrId(qrCode.getQrId());
        dto.setQrValue(qrCode.getQrValue());
        dto.setLocationId(qrCode.getLocation().getLocationId());
        return dto;
    }
}
