package com.ust.customer_service.controller;

import com.ust.customer_service.dto.BookingDto;
import com.ust.customer_service.dto.CustomerDto;
import com.ust.customer_service.dto.ReviewDto;
import com.ust.customer_service.entity.Customer;
import com.ust.customer_service.service.CustomerService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Mono<ResponseEntity<Customer>> getCustomerById(@PathVariable ObjectId id) {
        return customerService.findCustomerById(id)
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
    public Flux<BookingDto> getBookingsForSpecialist(@PathVariable ObjectId id) {
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

   @GetMapping("/{customerId}/review/{reviewId}")
   public Mono<ResponseEntity<ReviewDto>> getReviewByIdForCustomer(
           @PathVariable ObjectId customerId,
           @PathVariable ObjectId reviewId) {

       return webClientBuilder.build()
               .get()
               .uri("http://localhost:9004/api/reviews/customer/{customerId}/review/{reviewId}", customerId, reviewId)  // Review Service endpoint
               .retrieve()
               .bodyToMono(ReviewDto.class)  // Convert response body to ReviewDto
               .map(reviewDto -> ResponseEntity.ok(reviewDto))  // Return OK if review found
               .switchIfEmpty(Mono.just(ResponseEntity.notFound().build()));  // Return 404 if no review found
   }

    @PostMapping("/{id}/review")
    public Mono<ReviewDto> postReview(@PathVariable String id, @RequestBody ReviewDto reviewDto) {
        return webClientBuilder.build()
                .post()  // Change to POST since we're submitting data.
                .uri("http://localhost:9004/api/reviews/customer/{id}/reviews", id)
                .bodyValue(reviewDto)  // Include the reviewDto in the request body.
                .retrieve()
                .bodyToMono(ReviewDto.class);
    }

    @GetMapping("/{email}")
    public Mono<ResponseEntity<Customer>> getCustomerByEmail(@PathVariable String email) {
        return customerService.findByEmail(email)
                .map(customer -> ResponseEntity.ok(customer))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

}

