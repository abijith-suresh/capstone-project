package com.ust.booking_service.repo;

import com.ust.booking_service.entity.Booking;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Repository
public interface BookingRepository extends ReactiveMongoRepository<Booking, ObjectId> {
    Flux<Booking> findBySpecialistId(ObjectId specialistId);
}
