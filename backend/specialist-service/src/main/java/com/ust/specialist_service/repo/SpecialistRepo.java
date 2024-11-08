package com.ust.specialist_service.repo;

import com.ust.specialist_service.entity.Specialist;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface SpecialistRepo extends ReactiveMongoRepository<Specialist, ObjectId> {
    Mono<Specialist> findByEmail(String email);
}
