package com.ust.auth_service.repo;

import com.ust.auth_service.model.Account;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepo extends MongoRepository<Account, Integer> {
    Optional<Account> findByEmail(String email);
}
