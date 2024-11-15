package com.ust.complaint_service.service;

import com.ust.complaint_service.dto.ComplaintDto;
import com.ust.complaint_service.entity.Complaint;
import com.ust.complaint_service.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ComplaintService {
    @Autowired
    private ComplaintRepository complaintRepository;

    private ComplaintDto modelToDto(Complaint complaint) {
        ComplaintDto complaintDto = new ComplaintDto();

        complaintDto.setId(complaint.getId().toHexString());
        complaintDto.setName(complaint.getName());
        complaintDto.setEmail(complaint.getEmail());
        complaintDto.setMessage(complaint.getMessage());
        complaintDto.setAttachments(complaint.getAttachments());
        return complaintDto;
    }

    // Save a complaint (submit a new complaint)
    public Mono<Complaint> submitComplaint(Complaint complaint) {
        return
                complaintRepository.save(complaint);
    }

    // Retrieve all complaints for admin dashboard
    public Flux<ComplaintDto> getAllComplaints() {
        return complaintRepository.findAll()
                .map(this::modelToDto);
    }
}
