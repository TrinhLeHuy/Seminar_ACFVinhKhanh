package com.vinhkhanh.foodguide.controller;

import com.vinhkhanh.foodguide.dto.FoodDTO;
import com.vinhkhanh.foodguide.dto.FoodRequest;
import com.vinhkhanh.foodguide.service.FoodService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {
    @Autowired
    private FoodService foodService;

    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods() {
        return ResponseEntity.ok(foodService.getAllFoods());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable("id") Long id) {
        try {
            FoodDTO food = foodService.getFoodById(id);
            return ResponseEntity.ok(food);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/location/{locationId}")
    public ResponseEntity<List<FoodDTO>> getFoodsByLocation(@PathVariable("locationId") Long locationId) {
        return ResponseEntity.ok(foodService.getFoodsByLocation(locationId));
    }

    @PostMapping
    public ResponseEntity<FoodDTO> createFood(@Valid @RequestBody FoodRequest request) {
        try {
            FoodDTO food = foodService.createFood(request);
            return ResponseEntity.ok(food);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodDTO> updateFood(
            @PathVariable("id") Long id,
            @Valid @RequestBody FoodRequest request) {
        try {
            FoodDTO food = foodService.updateFood(id, request);
            return ResponseEntity.ok(food);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable("id") Long id) {
        try {
            foodService.deleteFood(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
