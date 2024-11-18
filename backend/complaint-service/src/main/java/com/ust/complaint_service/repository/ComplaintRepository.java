package com.ust.complaint_service.repository;

import com.ust.complaint_service.entity.Complaint;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ComplaintRepository extends ReactiveMongoRepository<Complaint, ObjectId> {

    public Mono<Complaint> findById(String complaintId);


}
