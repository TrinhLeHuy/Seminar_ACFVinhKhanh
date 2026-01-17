package com.vinhkhanh.foodguide.repository;

import com.vinhkhanh.foodguide.entity.QRCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface QRCodeRepository extends JpaRepository<QRCode, Long> {
    Optional<QRCode> findByQrValue(String qrValue);
    boolean existsByQrValue(String qrValue);
    Optional<QRCode> findByLocationLocationId(Long locationId);
}
