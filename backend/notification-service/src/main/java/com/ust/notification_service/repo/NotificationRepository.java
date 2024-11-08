package com.ust.notification_service.repo;

import com.ust.notification_service.model.NotificationLog;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface NotificationRepository extends ReactiveMongoRepository<NotificationLog, ObjectId> {
    Flux<NotificationLog> findByUserId(ObjectId userId);
}
