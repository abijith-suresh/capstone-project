package com.ust.booking_service.service;

import com.ust.booking_service.dto.AddBookingDto;
import com.ust.booking_service.dto.BookingResponseDto;
import com.ust.booking_service.dto.CustomerDto;
import com.ust.booking_service.dto.SpecialistDto;
import com.ust.booking_service.entity.Booking;
import com.ust.booking_service.repo.BookingRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@Service
public class BookingService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private BookingRepository bookingRepo;

    private Booking dtoToModel(AddBookingDto bookingDto) {
        Booking booking = new Booking();
        booking.setCustomerId(new ObjectId(bookingDto.getCustomerId()));
        booking.setSpecialistId(new ObjectId(bookingDto.getSpecialistId()));
        booking.setBookingDate(bookingDto.getBookingDate());
        booking.setAppointmentTime(bookingDto.getAppointmentTime());
        booking.setPrice(bookingDto.getPrice());
        booking.setService(bookingDto.getService());
        booking.setStatus(bookingDto.getStatus());

        return booking;
    }

    public Mono<String> createBooking(AddBookingDto bookingDto) {
        // Convert DTO to Booking entity
        Booking newBooking = dtoToModel(bookingDto);

        // Save the booking
        return bookingRepo
                .save(newBooking)
                .flatMap(savedBooking -> {
                    // Fetch the specialist details to get their email
                    return webClientBuilder
                            .build()
                            .get()
                            .uri("http://localhost:9005/api/specialists/id/{id}", bookingDto.getSpecialistId())
                            .retrieve()
                            .bodyToMono(SpecialistDto.class)
                            .flatMap(specialist -> {
                                // Send the new booking email to the specialist
                                return sendNewBookingEmail(specialist, bookingDto)
                                        .thenReturn("Booking created successfully and email sent to specialist.");
                            });
                });
    }

  public Flux<BookingResponseDto> getAllBookings() {
    return bookingRepo
        .findAll()
        .flatMap(
            booking -> {
              // Fetch Customer details from Customer Service
              Mono<CustomerDto> customerDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9002/api/customer/{id}",
                      booking.getCustomerId().toString())
                  .retrieve()
                  .bodyToMono(CustomerDto.class);

              // Fetch Specialist details from Specialist Service
              Mono<SpecialistDto> specialistDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9005/api/specialists/id/{id}",
                      booking.getSpecialistId().toString())
                  .retrieve()
                  .bodyToMono(SpecialistDto.class);

              // Combine the results
              return Mono.zip(
                  customerDtoMono,
                  specialistDtoMono,
                  (customerDto, specialistDto) -> {
                    // Map the data into BookingResponseDto
                    return new BookingResponseDto(
                        booking.getId().toString(),
                        customerDto,
                        specialistDto,
                        booking.getBookingDate(),
                        booking.getAppointmentTime(),
                        booking.getService(),
                        booking.getStatus(),
                        booking.getPrice());
                  });
            });
  }

  public Mono<BookingResponseDto> getBookingById(ObjectId id) {
    return bookingRepo
        .findById(id)
        .flatMap(
            booking -> {
              // Fetch Customer details from Customer Service
              Mono<CustomerDto> customerDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9002/api/customer/{id}",
                      booking.getCustomerId()) // Assuming customer service is on port 9002
                  .retrieve()
                  .bodyToMono(CustomerDto.class);

              // Fetch Specialist details from Specialist Service
              Mono<SpecialistDto> specialistDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9005/api/specialists/id/{id}",
                      booking.getSpecialistId()) // Assuming specialist service is on port 9003
                  .retrieve()
                  .bodyToMono(SpecialistDto.class);

              // Combine the results
              return Mono.zip(
                  customerDtoMono,
                  specialistDtoMono,
                  (customerDto, specialistDto) -> {
                    // Map the data into BookingResponseDto
                    return new BookingResponseDto(
                        booking.getId().toString(),
                        customerDto,
                        specialistDto,
                        booking.getBookingDate(),
                        booking.getAppointmentTime(),
                        booking.getService(),
                        booking.getStatus(),
                        booking.getPrice());
                  });
            });
  }

  public Mono<Booking> updateBooking(ObjectId id, Booking bookingDetails) {
    bookingDetails.setId(id);
    return bookingRepo.save(bookingDetails);
  }

  public Mono<Void> deleteBooking(ObjectId id) {
    return bookingRepo.deleteById(id);
  }

  public Flux<BookingResponseDto> getBookingsByCustomerId(ObjectId customerId) {
    return bookingRepo
        .findByCustomerId(customerId)
        .flatMap(
            booking -> {
              // Fetch Customer details from Customer Service
              Mono<CustomerDto> customerDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9002/api/customer/{id}",
                      booking.getCustomerId().toString())
                  .retrieve()
                  .bodyToMono(CustomerDto.class);

              // Fetch Specialist details from Specialist Service
              Mono<SpecialistDto> specialistDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9005/api/specialists/id/{id}",
                      booking.getSpecialistId().toString())
                  .retrieve()
                  .bodyToMono(SpecialistDto.class);

              // Combine the results
              return Mono.zip(
                  customerDtoMono,
                  specialistDtoMono,
                  (customerDto, specialistDto) -> {
                    // Map the data into BookingResponseDto
                    return new BookingResponseDto(
                        booking.getId().toString(),
                        customerDto,
                        specialistDto,
                        booking.getBookingDate(),
                        booking.getAppointmentTime(),
                        booking.getService(),
                        booking.getStatus(),
                        booking.getPrice());
                  });
            });
  }

  public Flux<BookingResponseDto> getBookingsBySpecialistId(ObjectId specialistId) {
    return bookingRepo
        .findBySpecialistId(specialistId)
        .flatMap(
            booking -> {
              // Fetch Customer details from Customer Service
              Mono<CustomerDto> customerDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9002/api/customer/{id}",
                      booking.getCustomerId().toString())
                  .retrieve()
                  .bodyToMono(CustomerDto.class);

              // Fetch Specialist details from Specialist Service
              Mono<SpecialistDto> specialistDtoMono = webClientBuilder
                  .build()
                  .get()
                  .uri(
                      "http://localhost:9005/api/specialists/id/{id}",
                      booking.getSpecialistId().toString())
                  .retrieve()
                  .bodyToMono(SpecialistDto.class);

              // Combine the results
              return Mono.zip(
                  customerDtoMono,
                  specialistDtoMono,
                  (customerDto, specialistDto) -> {
                    // Map the data into BookingResponseDto
                    return new BookingResponseDto(
                        booking.getId().toString(),
                        customerDto,
                        specialistDto,
                        booking.getBookingDate(),
                        booking.getAppointmentTime(),
                        booking.getService(),
                        booking.getStatus(),
                        booking.getPrice());
                  });
            });
  }

    public Mono<Void> updateBookingStatus(ObjectId id, String status) {
        return bookingRepo.findById(id)
                .flatMap(booking -> {
                    // Update the booking status
                    booking.setStatus(status);

                    // Save the updated booking status
                    return bookingRepo.save(booking)
                            .flatMap(savedBooking -> {
                                // Fetch Customer details from Customer Service
                                Mono<CustomerDto> customerDtoMono = webClientBuilder
                                        .build()
                                        .get()
                                        .uri("http://localhost:9002/api/customer/{id}", savedBooking.getCustomerId())
                                        .retrieve()
                                        .bodyToMono(CustomerDto.class);

                                // Fetch Specialist details from Specialist Service
                                Mono<SpecialistDto> specialistDtoMono = webClientBuilder
                                        .build()
                                        .get()
                                        .uri("http://localhost:9005/api/specialists/id/{id}", savedBooking.getSpecialistId())
                                        .retrieve()
                                        .bodyToMono(SpecialistDto.class);

                                // Wait for both customer and specialist details
                                return Mono.zip(customerDtoMono, specialistDtoMono)
                                        .flatMap(tuple -> {
                                            // Extract customer and specialist information
                                            CustomerDto customerDto = tuple.getT1();
                                            SpecialistDto specialistDto = tuple.getT2();

                                            // Send the booking status email to the customer and specialist
                                            return sendBookingStatusEmail(specialistDto, customerDto, savedBooking, status);
                                        });
                            });
                });
    }

    private Mono<Void> sendBookingStatusEmail(SpecialistDto specialist, CustomerDto customer, Booking booking, String status) {
        // Send email to Specialist
        Mono<Void> sendSpecialistEmail = sendBookingStatusEmailToSpecialist(specialist, booking, status);

        // Send email to Customer
        Mono<Void> sendCustomerEmail = sendBookingStatusEmailToCustomer(customer, booking, status);

        // Return the combined result, ensuring both emails are sent
        return Mono.zip(sendSpecialistEmail, sendCustomerEmail)
                .then();
    }

    private Mono<Void> sendBookingStatusEmailToSpecialist(SpecialistDto specialist, Booking booking, String status) {
        // Prepare the email content for the specialist based on the status
        String subject = "Booking Status Update";
        String message = "Dear " + specialist.getName() + ",\n\n"
                + "The status of your booking has been updated to: " + status + ".\n"
                + "Booking details:\n"
                + "Service: " + booking.getService() + "\n"
                + "Booking Date: " + booking.getBookingDate() + "\n"
                + "Appointment Time: " + booking.getAppointmentTime();

        return webClientBuilder.build()
                .post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(9008)
                        .path("/api/notifications/send-booking-status")
                        .queryParam("to", specialist.getEmail())
                        .queryParam("name", specialist.getName())
                        .queryParam("status", status)
                        .build())
                .retrieve()
                .bodyToMono(Void.class)
                .then();

    }

    private Mono<Void> sendBookingStatusEmailToCustomer(CustomerDto customer, Booking booking, String status) {
        // Prepare the email content for the customer based on the status
        String subject = "Booking Status Update";
        String message = "Dear " + customer.getName() + ",\n\n"
                + "The status of your booking has been updated to: " + status + ".\n"
                + "Booking details:\n"
                + "Service: " + booking.getService() + "\n"
                + "Booking Date: " + booking.getBookingDate() + "\n"
                + "Appointment Time: " + booking.getAppointmentTime();

        return webClientBuilder.build()
                .post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(9008)
                        .path("/api/notifications/send-booking-status")
                        .queryParam("to", customer.getEmail())
                        .queryParam("name", customer.getName())
                        .queryParam("status", status)
                        .build())
                .retrieve()
                .bodyToMono(Void.class)
                .then();

    }


    private Mono<Void> sendNewBookingEmail(SpecialistDto specialist, AddBookingDto booking) {
        // Extract parameters from the booking and specialist
        String to = specialist.getEmail();
        String name = specialist.getName();
        String appointmentTime = booking.getAppointmentTime().toString();

        // Call the sendBookingCreatedEmail endpoint in the Notification Service
        return webClientBuilder.build()
                .post()
                .uri(uriBuilder -> uriBuilder
                        .scheme("http")
                        .host("localhost")
                        .port(9008)
                        .path("/api/notifications/send-booking-created")
                        .queryParam("to", to)
                        .queryParam("name", name)
                        .queryParam("appointmentTime", appointmentTime)
                        .build())
                .retrieve()
                .bodyToMono(Void.class)
                .then();
    }
}
