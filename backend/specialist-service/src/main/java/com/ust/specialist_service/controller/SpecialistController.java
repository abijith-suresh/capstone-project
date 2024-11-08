package com.ust.specialist_service.controller;

import com.ust.specialist_service.dto.BookingDto;
import com.ust.specialist_service.dto.ReviewDto;
import com.ust.specialist_service.dto.SpecialistDto;
import com.ust.specialist_service.service.SpecialistService;
import com.ust.specialist_service.entity.Specialist;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/specialist")
public class SpecialistController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private SpecialistService specialistService;

    @PostMapping
    public Mono<Specialist> createSpecialist(@RequestBody SpecialistDto specialistDto) {
        return specialistService.createSpecialist(specialistDto);
    }

    @GetMapping
    public Flux<SpecialistDto> getAllSpecialists() {
        return specialistService.getAllSpecialists();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Specialist>> getSpecialistById(@PathVariable ObjectId id) {
        return specialistService.getSpecialistById(id)
                .map(specialist -> ResponseEntity.ok(specialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Specialist>> updateSpecialist(@PathVariable ObjectId id, @RequestBody Specialist specialistDetails) {
        return specialistService.updateSpecialist(id, specialistDetails)
                .map(updatedSpecialist -> ResponseEntity.ok(updatedSpecialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteSpecialist(@PathVariable ObjectId id) {
        return specialistService.deleteSpecialist(id)
                .map(v -> ResponseEntity.noContent().build());
    }

    @GetMapping("/{id}/bookings")
    public Flux<BookingDto> getBookingsForSpecialist(@PathVariable ObjectId id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9001/api/booking/specialist/{id}/bookings", id)
                .retrieve()
                .bodyToFlux(BookingDto.class);
    }

    @GetMapping("/{id}/reviews")
    public  Flux<ReviewDto> getAllReviewsById(@PathVariable ObjectId id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9004/api/reviews/specialist/{id}/reviews",id)
                .retrieve()
                .bodyToFlux(ReviewDto.class);

    }

    @GetMapping("/{email}")
    public Mono<ResponseEntity<Specialist>> getSpecialistByEmail(@PathVariable String email) {
        return specialistService.findByEmail(email)
                .map(specialist -> ResponseEntity.ok(specialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

}

