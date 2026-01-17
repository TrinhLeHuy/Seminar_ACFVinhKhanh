package com.vinhkhanh.foodguide.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "qr_scan_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QRScanLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @Column(name = "scan_time")
    private LocalDateTime scanTime;

    @Column(name = "device_info")
    private String deviceInfo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qr_id", nullable = false)
    private QRCode qrCode;

    @PrePersist
    protected void onCreate() {
        scanTime = LocalDateTime.now();
    }
}
