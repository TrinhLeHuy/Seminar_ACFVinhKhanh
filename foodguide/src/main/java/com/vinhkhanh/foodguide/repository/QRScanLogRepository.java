package com.vinhkhanh.foodguide.repository;

import com.vinhkhanh.foodguide.entity.QRScanLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QRScanLogRepository extends JpaRepository<QRScanLog, Long> {
    List<QRScanLog> findByQrCodeQrId(Long qrId);
    
    @Query("SELECT COUNT(s) FROM QRScanLog s WHERE s.qrCode.qrId = :qrId")
    Long countByQrId(@Param("qrId") Long qrId);
    
    List<QRScanLog> findByScanTimeBetween(LocalDateTime start, LocalDateTime end);
}
