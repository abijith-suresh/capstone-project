package com.ust.booking_service.service;

import com.ust.booking_service.dto.BookingNotificationDto;
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

    private Mono<Void> notifySpecialist(Booking savedBooking) {
        BookingNotificationDto notificationDto = new BookingNotificationDto(
                savedBooking.getId(),
                savedBooking.getCustomerId(),
                savedBooking.getSpecialistId(),
                savedBooking.getAppointmentTime()
        );

        return webClientBuilder.build()
                .post()
                .uri("http://specialist-service/api/specialist/notify")
                .bodyValue(notificationDto)
                .retrieve()
                .bodyToMono(Void.class);
    }

    public Mono<String> createBooking(Booking booking) {
        return bookingRepo.save(booking)
                .flatMap(savedBooking -> {
//                    return notifySpecialist(savedBooking)
//                            .thenReturn("Booking created successfully!");

                    return Mono.just("Booking created successfully without notification.");
                });
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

    public Flux<Booking> getBookingsForSpecialist(ObjectId specialistId) {
        return bookingRepo.findBySpecialistId(specialistId);
    }
}

