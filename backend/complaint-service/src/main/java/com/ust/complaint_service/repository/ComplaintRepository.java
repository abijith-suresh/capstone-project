package com.ust.complaint_service.repository;

import com.ust.complaint_service.entity.Complaint;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ComplaintRepository extends ReactiveMongoRepository<Complaint, ObjectId> {

}
