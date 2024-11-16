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
@RequestMapping("/api/specialists")
@CrossOrigin(origins = "*")
public class SpecialistController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private SpecialistService specialistService;

    private static final String[] VALID_STATUSES = {"pending", "approved", "rejected"};

    // Endpoint to create a new specialist
    @PostMapping
    public Mono<Specialist> createSpecialist(@RequestBody AddSpecialistDto addSpecialistDto) {
        return specialistService.createSpecialist(addSpecialistDto);
    }

    // Endpoint to get all specialists
    @GetMapping
    public Flux<SpecialistDto> getAllSpecialists() {
        return specialistService.getAllSpecialists();
    }

    // Endpoint to get a specialist by ID
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

    // Endpoint to update a specialist's details
    @PutMapping("/{id}")
    public Mono<ResponseEntity<Specialist>> updateSpecialist(@PathVariable ObjectId id, @RequestBody Specialist specialistDetails) {
        return specialistService.updateSpecialist(id, specialistDetails)
                .map(updatedSpecialist -> ResponseEntity.ok(updatedSpecialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // Endpoint to delete a specialist
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteSpecialist(@PathVariable ObjectId id) {
        return specialistService.deleteSpecialist(id)
                .map(v -> ResponseEntity.noContent().build());
    }

    // Endpoint to get all reviews for a specific specialist by ID
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

    // Endpoint to get a specialist by email
    @GetMapping("/email/{email}")
    public Mono<ResponseEntity<Specialist>> getSpecialistByEmail(@PathVariable String email) {
        return specialistService.findByEmail(email)
                .map(specialist -> ResponseEntity.ok(specialist))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    // Endpoint to update specialist's email
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

    // Endpoint to get bookings for a specific specialist by ID
    @GetMapping("/{id}/bookings")
    public Flux<BookingDto> getBookingsForSpecialist(@PathVariable String id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9001/api/booking/specialist/{id}", id) // Booking Service endpoint
                .retrieve()
                .bodyToFlux(BookingDto.class);
    }

    // Endpoint to filter specialists by status
    @GetMapping("/status")
    public Flux<SpecialistDto> getSpecialistsByStatus(@RequestParam(name = "status", required = false) String status) {
        if (status != null && !status.isEmpty()) {
            if (!isValidStatus(status)) {
                return Flux.error(new IllegalArgumentException("Invalid status value. Allowed values: pending, approved, rejected"));
            }

            return specialistService.getSpecialistsByStatus(status);
        }
        return specialistService.getAllSpecialists();
    }

    // Helper method to validate the status
    private boolean isValidStatus(String status) {
        for (String validStatus : VALID_STATUSES) {
            if (validStatus.equalsIgnoreCase(status)) {
                return true;
            }
        }
        return false;
    }

    @PatchMapping("/{id}/status")
    public Mono<ResponseEntity<Object>> updateSpecialistStatus(@PathVariable("id") ObjectId id, @RequestBody StatusUpdateDto statusUpdateDto) {
        if (!isValidStatus(statusUpdateDto.getStatus())) {
            return Mono.just(ResponseEntity.badRequest().build());
        }

        return specialistService.updateSpecialistStatus(id, statusUpdateDto.getStatus())
                .map(updated -> ResponseEntity.noContent().build())
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }


}
