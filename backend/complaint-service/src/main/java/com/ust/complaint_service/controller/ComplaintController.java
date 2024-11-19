package com.ust.complaint_service.controller;

import com.ust.complaint_service.dto.ComplaintDto;
import com.ust.complaint_service.entity.Complaint;
import com.ust.complaint_service.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/complaints")
public class ComplaintController {
  @Autowired
  private ComplaintService complaintService;

  // Endpoint to submit a complaint
  @PostMapping("/submit-complaint")
  public Mono<ComplaintDto> submitComplaint(@RequestBody Complaint complaint) {
    return complaintService.submitComplaint(complaint);
  }

  // Endpoint to get all complaints (for the admin dashboard)
  @GetMapping("/all-complaints")
  public Flux<ComplaintDto> getAllComplaints() {

    return complaintService.getAllComplaints();
  }

}
