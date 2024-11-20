package com.ust.complaint_service.service;

import com.ust.complaint_service.dto.ComplaintDto;
import com.ust.complaint_service.dto.BookingDto;
import com.ust.complaint_service.entity.Complaint;
import com.ust.complaint_service.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Flux;

@Service
public class ComplaintService {

  @Autowired
  private ComplaintRepository complaintRepository;

  @Autowired
  private WebClient.Builder webClientBuilder;

  private static final String BOOKING_SERVICE_URL = "http://localhost:9001/api/booking/";

  private Mono<ComplaintDto> modelToDto(Complaint complaint) {
    // Fetch the BookingDto by booking_id from the BookingService

    return getBookingById(complaint.getBooking_id())
        .map(bookingDto -> new ComplaintDto(
            complaint.getId().toHexString(),
            complaint.getName(),
            complaint.getEmail(),
            complaint.getMessage(),
            bookingDto,
            complaint.getAttachments()));
  }

  // Save a complaint (submit a new complaint)
  public Mono<ComplaintDto> submitComplaint(Complaint complaint) {
    return complaintRepository.save(complaint)
        .flatMap(this::modelToDto)
        .onErrorResume(e -> Mono.error(new RuntimeException("Error while submitting complaint", e)));
  }

  // Retrieve all complaints for admin dashboard
  public Flux<ComplaintDto> getAllComplaints() {
    return complaintRepository.findAll()
        .flatMap(this::modelToDto)
        .onErrorResume(e -> Flux.error(new RuntimeException("Error while retrieving complaints", e)));
  }

  public Mono<ComplaintDto> getComplaintById(String complaintId) {
    return complaintRepository.findById(complaintId)
        .flatMap(this::modelToDto)
        .switchIfEmpty(Mono.error(new RuntimeException("Complaint not found")));
  }

  // Call BookingService to get BookingDto by bookingId
  private Mono<BookingDto> getBookingById(String bookingId) {
    // Make the HTTP request to BookingService to fetch the BookingDto by bookingId
    return webClientBuilder.baseUrl(BOOKING_SERVICE_URL)
        .build()
        .get()
        .uri(uriBuilder -> uriBuilder.path(bookingId).build())
        .retrieve()
        .bodyToMono(BookingDto.class) // Deserialize the response body into BookingDto
        .onErrorResume(e -> Mono.error(new RuntimeException("Error while retrieving booking", e)));
  }
}
