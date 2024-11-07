package com.ust.booking_service.service;

import com.ust.booking_service.dto.BookingResponseDto;
import com.ust.booking_service.entity.Booking;
import com.ust.booking_service.repo.BookingRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private BookingRepository bookingRepo;

    public Mono<String> createBooking(Booking booking) {
        bookingRepo.save(booking);
        return Mono.just("Booking created successfully without notification.");
    }

    public Flux<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Mono<Booking> getBookingById(ObjectId id) {
        return bookingRepo.findById(id);
    }

    public Mono<Booking> updateBooking(ObjectId id, Booking bookingDetails) {
        bookingDetails.setId(id);
        return bookingRepo.save(bookingDetails);
    }

    public Mono<Void> deleteBooking(ObjectId id) {
        return bookingRepo.deleteById(id);
    }

    public Flux<BookingResponseDto> getBookingsForSpecialist(ObjectId specialistId) {
        return bookingRepo.findBySpecialistId(specialistId)
                .map(booking -> new BookingResponseDto(
                        booking.getId(),
                        booking.getCustomerId(),
                        booking.getSpecialistId(),
                        booking.getBookingDate(),
                        booking.getAppointmentTime(),
                        booking.getStatus(),
                        booking.getPrice()
                ));
    }

    public Flux<BookingResponseDto> getBookingsForCustomer(ObjectId customerId) {
        return bookingRepo.findByCustomerId(customerId)
                .map(booking -> new BookingResponseDto(
                        booking.getId(),
                        booking.getCustomerId(),
                        booking.getSpecialistId(),
                        booking.getBookingDate(),
                        booking.getAppointmentTime(),
                        booking.getStatus(),
                        booking.getPrice()
                ));
    }
}

