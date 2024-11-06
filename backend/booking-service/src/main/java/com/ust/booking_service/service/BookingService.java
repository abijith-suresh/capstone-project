package com.ust.booking_service.service;

import com.ust.booking_service.entity.Booking;
import com.ust.booking_service.repo.BookingRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    public Mono<Booking> createBooking(Booking booking) {
        return bookingRepo.save(booking);
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
}

