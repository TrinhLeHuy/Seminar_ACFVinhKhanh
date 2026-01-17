package com.vinhkhanh.foodguide.controller;

import com.vinhkhanh.foodguide.dto.LocationDetailDTO;
import com.vinhkhanh.foodguide.dto.QRScanRequest;
import com.vinhkhanh.foodguide.service.QRScanLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr-scan")
@CrossOrigin(origins = "*")
public class QRScanController {
    @Autowired
    private QRScanLogService qrScanLogService;

    @PostMapping
    public ResponseEntity<LocationDetailDTO> scanQRCode(@RequestBody QRScanRequest request) {
        try {
            LocationDetailDTO location = qrScanLogService.scanQRCode(request);
            return ResponseEntity.ok(location);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/count/{qrId}")
    public ResponseEntity<Long> getScanCount(@PathVariable Long qrId) {
        Long count = qrScanLogService.getScanCountByQRCode(qrId);
        return ResponseEntity.ok(count);
    }
}
