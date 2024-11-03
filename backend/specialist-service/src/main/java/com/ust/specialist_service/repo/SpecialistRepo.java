package com.ust.specialist_service.repo;

import com.ust.specialist_service.entity.Specialist;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialistRepo extends MongoRepository<Specialist, String> {
}