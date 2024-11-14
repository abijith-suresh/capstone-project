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

@Service
public class BookingService {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private BookingRepository bookingRepo;

    private Booking dtoToModel(AddBookingDto bookingDto){
        Booking booking = new Booking();
        booking.setCustomerId(new ObjectId(bookingDto.getCustomerId()));
        booking.setSpecialistId(new ObjectId(bookingDto.getSpecialistId()));
        booking.setBookingDate(bookingDto.getBookingDate());
        booking.setAppointmentTime(bookingDto.getAppointmentTime());
        booking.setPrice(bookingDto.getPrice());

        return booking;
    }

    public Mono<String> createBooking(AddBookingDto booking) {
        Booking newBooking  = dtoToModel(booking);
        return bookingRepo.save(newBooking)
                .then(Mono.just("Booking created successfully."));
    }

    public Flux<BookingResponseDto> getAllBookings() {
        return bookingRepo.findAll()
                .flatMap(booking -> {
                    // Fetch Customer details from Customer Service
                    Mono<CustomerDto> customerDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9002/api/customer/{id}", booking.getCustomerId().toString())
                            .retrieve()
                            .bodyToMono(CustomerDto.class);

                    // Fetch Specialist details from Specialist Service
                    Mono<SpecialistDto> specialistDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9005/api/specialist/id/{id}", booking.getSpecialistId().toString())
                            .retrieve()
                            .bodyToMono(SpecialistDto.class);

                    // Combine the results
                    return Mono.zip(customerDtoMono, specialistDtoMono, (customerDto, specialistDto) -> {
                        // Map the data into BookingResponseDto
                        return new BookingResponseDto(
                                booking.getId().toString(),
                                customerDto,
                                specialistDto,
                                booking.getBookingDate(),
                                booking.getAppointmentTime(),
                                booking.getStatus(),
                                booking.getPrice()
                        );
                    });
                });
    }

    public Mono<BookingResponseDto> getBookingById(ObjectId id) {
        return bookingRepo.findById(id)
                .flatMap(booking -> {
                    // Fetch Customer details from Customer Service
                    Mono<CustomerDto> customerDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9002/api/customer/{id}", booking.getCustomerId())  // Assuming customer service is on port 9002
                            .retrieve()
                            .bodyToMono(CustomerDto.class);

                    // Fetch Specialist details from Specialist Service
                    Mono<SpecialistDto> specialistDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9005/api/specialist/id/{id}", booking.getSpecialistId())  // Assuming specialist service is on port 9003
                            .retrieve()
                            .bodyToMono(SpecialistDto.class);

                    // Combine the results
                    return Mono.zip(customerDtoMono, specialistDtoMono, (customerDto, specialistDto) -> {
                        // Map the data into BookingResponseDto
                        return new BookingResponseDto(
                                booking.getId().toString(),
                                customerDto,
                                specialistDto,
                                booking.getBookingDate(),
                                booking.getAppointmentTime(),
                                booking.getStatus(),
                                booking.getPrice()
                        );
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
        return bookingRepo.findByCustomerId(customerId)
                .flatMap(booking -> {
                    // Fetch Customer details from Customer Service
                    Mono<CustomerDto> customerDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9002/api/customer/{id}", booking.getCustomerId().toString())
                            .retrieve()
                            .bodyToMono(CustomerDto.class);

                    // Fetch Specialist details from Specialist Service
                    Mono<SpecialistDto> specialistDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9005/api/specialist/id/{id}", booking.getSpecialistId().toString())
                            .retrieve()
                            .bodyToMono(SpecialistDto.class);

                    // Combine the results
                    return Mono.zip(customerDtoMono, specialistDtoMono, (customerDto, specialistDto) -> {
                        // Map the data into BookingResponseDto
                        return new BookingResponseDto(
                                booking.getId().toString(),
                                customerDto,
                                specialistDto,
                                booking.getBookingDate(),
                                booking.getAppointmentTime(),
                                booking.getStatus(),
                                booking.getPrice()
                        );
                    });
                });
    }

    public Flux<BookingResponseDto> getBookingsBySpecialistId(ObjectId specialistId) {
        return bookingRepo.findBySpecialistId(specialistId)
                .flatMap(booking -> {
                    // Fetch Customer details from Customer Service
                    Mono<CustomerDto> customerDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9002/api/customer/{id}", booking.getCustomerId().toString())
                            .retrieve()
                            .bodyToMono(CustomerDto.class);

                    // Fetch Specialist details from Specialist Service
                    Mono<SpecialistDto> specialistDtoMono = webClientBuilder.build()
                            .get()
                            .uri("http://localhost:9005/api/specialist/id/{id}", booking.getSpecialistId().toString())
                            .retrieve()
                            .bodyToMono(SpecialistDto.class);

                    // Combine the results
                    return Mono.zip(customerDtoMono, specialistDtoMono, (customerDto, specialistDto) -> {
                        // Map the data into BookingResponseDto
                        return new BookingResponseDto(
                                booking.getId().toString(),
                                customerDto,
                                specialistDto,
                                booking.getBookingDate(),
                                booking.getAppointmentTime(),
                                booking.getStatus(),
                                booking.getPrice()
                        );
                    });
                });
    }


}

