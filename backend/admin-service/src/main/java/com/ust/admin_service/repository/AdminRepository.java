package com.ust.admin_service.repository;

import com.ust.admin_service.entity.Admin;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends ReactiveMongoRepository<Admin, ObjectId> {
}
