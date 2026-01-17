package com.vinhkhanh.foodguide.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class QRCodeRequest {
    @NotBlank(message = "QR Value is required")
    private String qrValue;

    @NotNull(message = "Location ID is required")
    private Long locationId;
}
