package com.ust.booking_service.controller;

import com.ust.booking_service.dto.AddBookingDto;
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
@CrossOrigin(origins = "*")
public class BookingController {

  @Autowired
  private BookingService bookingService;

  @PostMapping
  public Mono<ResponseEntity<String>> createBooking(@RequestBody AddBookingDto booking) {
    return bookingService
        .createBooking(booking)
        .map(savedBooking -> ResponseEntity.status(HttpStatus.CREATED).body(savedBooking))
        .defaultIfEmpty(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
  }

  @GetMapping
  public Flux<BookingResponseDto> getAllBookings() {
    return bookingService.getAllBookings();
  }

  @GetMapping("/{id}")
  public Mono<ResponseEntity<BookingResponseDto>> getBookingById(@PathVariable String id) {
    return bookingService
        .getBookingById(new ObjectId(id))
        .map(booking -> ResponseEntity.ok(booking))
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @PutMapping("/{id}")
  public Mono<ResponseEntity<Booking>> updateBooking(
      @PathVariable ObjectId id, @RequestBody Booking bookingDetails) {
    return bookingService
        .updateBooking(id, bookingDetails)
        .map(updatedBooking -> ResponseEntity.ok(updatedBooking))
        .defaultIfEmpty(ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public Mono<ResponseEntity<Void>> deleteBooking(@PathVariable ObjectId id) {
    return bookingService.deleteBooking(id).map(v -> ResponseEntity.noContent().build());
  }

  @GetMapping("/customer/{customerId}")
  public Flux<BookingResponseDto> getBookingsByCustomerId(@PathVariable String customerId) {
    return bookingService.getBookingsByCustomerId(new ObjectId(customerId));
  }

  @GetMapping("/specialist/{specialistId}")
  public Flux<BookingResponseDto> getBookingsBySpecialistId(@PathVariable String specialistId) {
    return bookingService.getBookingsBySpecialistId(new ObjectId(specialistId));
  }

  @PutMapping("/{id}/status")
  public Mono<ResponseEntity<Void>> updateBookingStatus(
          @PathVariable String id, @RequestParam String status) {
    return bookingService
            .updateBookingStatus(new ObjectId(id), status)
            .map(updatedBooking -> ResponseEntity.ok(updatedBooking));
  }
}
