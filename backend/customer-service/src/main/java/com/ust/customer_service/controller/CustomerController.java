package com.ust.customer_service.controller;

import com.ust.customer_service.dto.BookingDto;
import com.ust.customer_service.dto.CustomerDto;
import com.ust.customer_service.dto.EmailUpdateDto;
import com.ust.customer_service.dto.ReviewDto;
import com.ust.customer_service.entity.Customer;
import com.ust.customer_service.service.CustomerService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private WebClient.Builder webClientBuilder;

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public Flux<CustomerDto> getAllCustomers() {
        return customerService.findAllCustomers();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<CustomerDto>> getCustomerById(@PathVariable String id) {
        ObjectId objectId = new ObjectId(id);
        return customerService.findCustomerById(objectId)
                .map(customer -> ResponseEntity.ok(customer))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Mono<Customer> saveCustomer(@RequestBody CustomerDto customerDto) {
        return customerService.createCustomer(customerDto);
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Customer>> updateCustomer(@PathVariable ObjectId id, @RequestBody Customer customerDetails) {
        return customerService.updateCustomer(id, customerDetails)
                .map(updatedCustomer -> ResponseEntity.ok(updatedCustomer))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteCustomerById(@PathVariable ObjectId id) {
        return customerService.deleteCustomerById(id)
                .map(v -> ResponseEntity.noContent().build());
    }

    @GetMapping("/{id}/bookings")
    public Flux<BookingDto> getBookingsForCustomer(@PathVariable ObjectId id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9001/api/booking/customer/{id}/bookings", id)
                .retrieve()
                .bodyToFlux(BookingDto.class);
    }

    @GetMapping("/{id}/review")
    public  Flux<ReviewDto> getAllReviewsById(@PathVariable ObjectId id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9004/api/reviews/customer/{id}/reviews",id)
                .retrieve()
                .bodyToFlux(ReviewDto.class);

    }

    @PostMapping("/{id}/review")
    public Mono<ReviewDto> postReview(@RequestBody ReviewDto reviewDto) {

        return webClientBuilder.build()
                .post()  // Use POST to create a new review.
                .uri("http://localhost:9004/api/reviews")  // This is the updated URI.
                .bodyValue(reviewDto)  // Pass the ReviewDto as the body of the request.
                .retrieve()
                .bodyToMono(ReviewDto.class);  // Convert the response body to ReviewDto.
    }

    @GetMapping("/email/{email}")
    public Mono<ResponseEntity<Customer>> getCustomerByEmail(@PathVariable String email) {
        return customerService.findByEmail(email)
                .map(customer -> ResponseEntity.ok(customer))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/update-email")
    public Mono<ResponseEntity<Customer>> updateEmail(@PathVariable ObjectId id, @RequestBody EmailUpdateDto email) {
        String newEmail = email.getEmail();


        return customerService.findByEmail(newEmail)
            .flatMap(existingCustomer -> {
                if (existingCustomer != null) {
                    return Mono.just(ResponseEntity.status(HttpStatus.CONFLICT)
                        .body((Customer) null));
                    }

                    return customerService.updateCustomerByEmail(id, email)
                        .map(updatedCustomer -> ResponseEntity.ok(updatedCustomer))
                        .defaultIfEmpty(ResponseEntity.notFound().build());
                })
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/{id}/bookings")
    public Flux<BookingDto> getBookingsForCustomer(@PathVariable String id) {
        // Use WebClient to fetch all bookings from the BookingService based on the customerId
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9001/api/booking/customer/{id}", id) // Booking Service endpoint
                .retrieve()
                .bodyToFlux(BookingDto.class);
    }

}

