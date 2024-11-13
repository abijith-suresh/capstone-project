package com.ust.specialist_service.controller;

import com.ust.specialist_service.dto.*;
import com.ust.specialist_service.service.SpecialistService;
import com.ust.specialist_service.entity.Specialist;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/specialist")
@CrossOrigin(origins = "http://localhost:5173")
public class SpecialistController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private SpecialistService specialistService;

    @PostMapping
    public Mono<Specialist> createSpecialist(@RequestBody AddSpecialistDto addSpecialistDto) {
        return specialistService.createSpecialist(addSpecialistDto);
    }

    @GetMapping
    public Flux<SpecialistDto> getAllSpecialists() {
        return specialistService.getAllSpecialists();
    }

    @GetMapping("/id/{id}")
    public Mono<ResponseEntity<SpecialistDto>> getSpecialistById(@PathVariable String id) {
        try {
            ObjectId objectId = new ObjectId(id);

            return specialistService.getSpecialistById(objectId)
                    .map(specialistDto -> ResponseEntity.ok(specialistDto))
                    .defaultIfEmpty(ResponseEntity.notFound().build());
        } catch (IllegalArgumentException e) {
            return Mono.just(ResponseEntity.badRequest().body(null));
        }
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
    public Flux<ReviewDto> getAllReviewsById(@PathVariable String id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9004/api/reviews/specialist/{id}/reviews", id)
                .retrieve()
                .bodyToFlux(ReviewDto.class)
                .doOnError(error -> {
                    System.err.println("Error fetching reviews for specialist with ID " + id);
                });
    }

    @GetMapping("/{email}")
    public Mono<ResponseEntity<Specialist>> getSpecialistByEmail(@PathVariable String email) {
        return specialistService.findByEmail(email)
                .map(specialist -> ResponseEntity.ok(specialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/update-email")
    public Mono<ResponseEntity<Specialist>> updateSpecialistByEmail(@PathVariable ObjectId id, @RequestBody EmailUpdateDto email) {
        String newEmail = email.getEmail();

        return specialistService.findByEmail(newEmail)
                .flatMap(existingSpecialist -> {
                    // If email already exists, return Conflict response
                    return Mono.just(ResponseEntity.status(HttpStatus.CONFLICT)
                            .body((Specialist) null));
                })
                .switchIfEmpty( // If no existing specialist with this email, proceed to update
                        specialistService.updateSpecialistByEmail(id, email)
                                .map(updatedSpecialist -> ResponseEntity.ok(updatedSpecialist))
                                .defaultIfEmpty(ResponseEntity.notFound().build())
                )
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // If no specialist with the ID is found
    }

    @GetMapping("/{id}/bookings")
    public Flux<BookingDto> getBookingsForSpecialist(@PathVariable String id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9001/api/booking/specialist/{id}", id) // Booking Service endpoint
                .retrieve()
                .bodyToFlux(BookingDto.class);
    }

}

