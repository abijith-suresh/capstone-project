package com.ust.booking_service.repo;

import com.ust.booking_service.entity.Booking;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends ReactiveMongoRepository<Booking, ObjectId> {
}
