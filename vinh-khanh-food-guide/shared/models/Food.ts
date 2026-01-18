/**
 * Shared Food Model - Compatible with Spring Boot Backend
 */

export interface Food {
  foodId: number;
  name: string;
  price: number;
  description?: string;
  locationId: number;
}

export interface FoodRequest {
  name: string;
  price: number;
  description?: string;
  locationId: number;
}
