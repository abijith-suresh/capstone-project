package com.ust.booking_service.service;

import com.ust.booking_service.dto.BookingResponseDto;
import com.ust.booking_service.dto.NotificationEvent;
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
        return bookingRepo.save(booking)
                .doOnSuccess(savedBooking -> {
                    System.out.println("Booking saved: " + savedBooking);
                    sendBookingNotifications(savedBooking);  // Ensure this line is being executed
                })
                .then(Mono.just("Booking created successfully."))
                .onErrorResume(error -> {
                    // Log errors during the booking creation process
                    System.out.println("Error creating booking: " + error.getMessage());
                    return Mono.just("Error creating booking: " + error.getMessage());
                });
    }


    private Mono<Void> sendBookingNotifications(Booking booking) {
        System.out.println("Preparing notifications for booking: " + booking.getId());

        NotificationEvent customerEvent = new NotificationEvent();
        customerEvent.setUserId(booking.getCustomerId());
        customerEvent.setType("BOOKING_STATUS");
        customerEvent.setMessage("Your booking has been successfully created.");

        NotificationEvent specialistEvent = new NotificationEvent();
        specialistEvent.setUserId(booking.getSpecialistId());
        specialistEvent.setType("BOOKING_REQUEST");
        specialistEvent.setMessage("You have a new booking request. Please check your dashboard.");

        return Mono.when(
                        sendNotification(customerEvent),
                        sendNotification(specialistEvent)
                )
                .doOnTerminate(() -> System.out.println("Both notifications sent for booking: " + booking.getId()))
                .doOnError(error -> System.out.println("Error sending notifications for booking: " + booking.getId() + ": " + error.getMessage()));
    }


    private Mono<Void> sendNotification(NotificationEvent event) {
        System.out.println("Sending notification to: " + event.getUserId() + ", type: " + event.getType());
        return webClientBuilder.build()
                .post()
                .uri("http://localhost:9008/api/notifications/send")
                .bodyValue(event)
                .retrieve()
                .bodyToMono(Void.class)
                .doOnTerminate(() -> System.out.println("Notification sent: " + event.getType()))
                .doOnError(error -> System.out.println("Error sending notification: " + error.getMessage()))
                .onErrorResume(error -> Mono.empty());  // Consider returning Mono.error() or different fallback
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

