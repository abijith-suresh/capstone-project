package com.ust.booking_service.controller;

import com.ust.booking_service.dto.BookingResponseDto;
import com.ust.booking_service.entity.Booking;
import com.ust.booking_service.service.BookingService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/specialist/{specialistId}/bookings")
    public Flux<BookingResponseDto> getBookingsForSpecialist(@PathVariable ObjectId specialistId) {
        return bookingService.getBookingsForSpecialist(specialistId);
    }

    @GetMapping("/customer/{customerId}/bookings")
    public Flux<BookingResponseDto> getBookingsForCustomer(@PathVariable ObjectId customerId) {
        return bookingService.getBookingsForCustomer(customerId);
    }

    @PostMapping
    public Mono<ResponseEntity<String>> createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking)
                .map(savedBooking -> ResponseEntity.status(HttpStatus.CREATED).body(savedBooking))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @GetMapping
    public Flux<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Booking>> getBookingById(@PathVariable ObjectId id) {
        return bookingService.getBookingById(id)
                .map(booking -> ResponseEntity.ok(booking))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Booking>> updateBooking(@PathVariable ObjectId id, @RequestBody Booking bookingDetails) {
        return bookingService.updateBooking(id, bookingDetails)
                .map(updatedBooking -> ResponseEntity.ok(updatedBooking))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteBooking(@PathVariable ObjectId id) {
        return bookingService.deleteBooking(id)
                .map(v -> ResponseEntity.noContent().build());
    }
}

