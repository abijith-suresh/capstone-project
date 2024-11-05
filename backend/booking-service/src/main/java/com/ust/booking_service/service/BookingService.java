package com.ust.booking_service.service;

import com.ust.booking_service.entity.Booking;
import com.ust.booking_service.repo.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepo;

    public Booking createBooking(Booking booking) {
        return bookingRepo.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepo.findAll();
    }

    public Optional<Booking> getBookingById(String id) {
        return bookingRepo.findById(id);
    }

    public Booking updateBooking(String id, Booking bookingDetails) {
        bookingDetails.setId(id);
        return bookingRepo.save(bookingDetails);
    }

    public void deleteBooking(String id) {
        bookingRepo.deleteById(id);
    }

}
