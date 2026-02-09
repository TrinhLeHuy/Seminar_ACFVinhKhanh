package com.vinhkhanh.foodguide.controller;

import com.vinhkhanh.foodguide.dto.LocationDTO;
import com.vinhkhanh.foodguide.dto.LocationDetailDTO;
import com.vinhkhanh.foodguide.dto.LocationRequest;
import com.vinhkhanh.foodguide.service.LocationService;
import com.vinhkhanh.foodguide.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
@CrossOrigin(origins = "*")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<LocationDTO>> getAllLocations() {
        return ResponseEntity.ok(locationService.getAllLocations());
    }

    // ========== SEARCH ENDPOINT ==========
    // GET /api/locations/search?keyword=phở
    // @RequestParam = lấy giá trị từ query string (?keyword=...)
    // required = false = không bắt buộc phải có
    @GetMapping("/search")
    public ResponseEntity<List<LocationDTO>> searchLocations(
            @RequestParam(value = "keyword", required = false) String keyword) {
        return ResponseEntity.ok(locationService.searchLocations(keyword));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LocationDetailDTO> getLocationById(@PathVariable("id") Long id) {
        try {
            LocationDetailDTO location = locationService.getLocationById(id);
            return ResponseEntity.ok(location);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/qr/{qrValue}")
    public ResponseEntity<LocationDetailDTO> getLocationByQRCode(@PathVariable("qrValue") String qrValue) {
        try {
            LocationDetailDTO location = locationService.getLocationByQRCode(qrValue);
            return ResponseEntity.ok(location);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<LocationDTO> createLocation(
            @Valid @RequestBody LocationRequest request,
            HttpServletRequest httpRequest) {
        try {
            Long userId = getUserIdFromRequest(httpRequest);
            LocationDTO location = locationService.createLocation(request, userId);
            return ResponseEntity.ok(location);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<LocationDTO> updateLocation(
            @PathVariable("id") Long id,
            @Valid @RequestBody LocationRequest request) {
        try {
            LocationDTO location = locationService.updateLocation(id, request);
            return ResponseEntity.ok(location);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable("id") Long id) {
        try {
            locationService.deleteLocation(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LocationDTO>> getLocationsByUser(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(locationService.getLocationsByUser(userId));
    }

    private Long getUserIdFromRequest(HttpServletRequest request) {
        String token = extractTokenFromRequest(request);
        if (token != null) {
            return jwtUtil.extractUserId(token);
        }
        return null;
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
