package com.vinhkhanh.foodguide.controller;

import com.vinhkhanh.foodguide.dto.QRCodeDTO;
import com.vinhkhanh.foodguide.dto.QRCodeRequest;
import com.vinhkhanh.foodguide.service.QRCodeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/qr-codes")
@CrossOrigin(origins = "*")
public class QRCodeController {
    @Autowired
    private QRCodeService qrCodeService;

    @GetMapping
    public ResponseEntity<List<QRCodeDTO>> getAllQRCodes() {
        return ResponseEntity.ok(qrCodeService.getAllQRCodes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<QRCodeDTO> getQRCodeById(@PathVariable("id") Long id) {
        try {
            QRCodeDTO qrCode = qrCodeService.getQRCodeById(id);
            return ResponseEntity.ok(qrCode);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/value/{qrValue}")
    public ResponseEntity<QRCodeDTO> getQRCodeByValue(@PathVariable("qrValue") String qrValue) {
        try {
            QRCodeDTO qrCode = qrCodeService.getQRCodeByValue(qrValue);
            return ResponseEntity.ok(qrCode);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<QRCodeDTO> createQRCode(@Valid @RequestBody QRCodeRequest request) {
        try {
            QRCodeDTO qrCode = qrCodeService.createQRCode(request);
            return ResponseEntity.ok(qrCode);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<QRCodeDTO> updateQRCode(
            @PathVariable("id") Long id,
            @Valid @RequestBody QRCodeRequest request) {
        try {
            QRCodeDTO qrCode = qrCodeService.updateQRCode(id, request);
            return ResponseEntity.ok(qrCode);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQRCode(@PathVariable("id") Long id) {
        try {
            qrCodeService.deleteQRCode(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
