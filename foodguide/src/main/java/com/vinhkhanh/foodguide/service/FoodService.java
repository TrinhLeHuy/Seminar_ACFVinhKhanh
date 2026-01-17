package com.vinhkhanh.foodguide.service;

import com.vinhkhanh.foodguide.dto.FoodDTO;
import com.vinhkhanh.foodguide.dto.FoodRequest;
import com.vinhkhanh.foodguide.entity.Food;
import com.vinhkhanh.foodguide.entity.Location;
import com.vinhkhanh.foodguide.repository.FoodRepository;
import com.vinhkhanh.foodguide.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class FoodService {
    @Autowired
    private FoodRepository foodRepository;

    @Autowired
    private LocationRepository locationRepository;

    public List<FoodDTO> getAllFoods() {
        return foodRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FoodDTO getFoodById(Long id) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
        return convertToDTO(food);
    }

    public List<FoodDTO> getFoodsByLocation(Long locationId) {
        return foodRepository.findByLocationLocationId(locationId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FoodDTO createFood(FoodRequest request) {
        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        Food food = new Food();
        food.setName(request.getName());
        food.setPrice(request.getPrice());
        food.setDescription(request.getDescription());
        food.setLocation(location);

        Food saved = foodRepository.save(food);
        return convertToDTO(saved);
    }

    public FoodDTO updateFood(Long id, FoodRequest request) {
        Food food = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        Location location = locationRepository.findById(request.getLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        food.setName(request.getName());
        food.setPrice(request.getPrice());
        food.setDescription(request.getDescription());
        food.setLocation(location);

        Food updated = foodRepository.save(food);
        return convertToDTO(updated);
    }

    public void deleteFood(Long id) {
        foodRepository.deleteById(id);
    }

    private FoodDTO convertToDTO(Food food) {
        FoodDTO dto = new FoodDTO();
        dto.setFoodId(food.getFoodId());
        dto.setName(food.getName());
        dto.setPrice(food.getPrice());
        dto.setDescription(food.getDescription());
        dto.setLocationId(food.getLocation().getLocationId());
        return dto;
    }
}
