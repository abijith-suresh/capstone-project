package com.ust.specialist_service.service;

import com.ust.specialist_service.dto.SpecialistDto;
import com.ust.specialist_service.entity.Specialist;
import com.ust.specialist_service.repo.SpecialistRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SpecialistService {

    @Autowired
    private SpecialistRepo specialistRepo;

    private void dtoToModel(Specialist specialist, SpecialistDto specialistDto) {
        specialist.setFirstName(specialistDto.getFirstName());
        specialist.setLastName(specialistDto.getLastName());
        specialist.setEmail(specialistDto.getEmail());

    }

    private SpecialistDto modelToDto(Specialist specialist) {
        SpecialistDto specialistDto = new SpecialistDto();
        specialistDto.setFirstName(specialist.getFirstName());
        specialistDto.setLastName(specialist.getLastName());
        specialistDto.setEmail(specialist.getEmail());

        return specialistDto;
    }

    public Mono<Specialist> createSpecialist(SpecialistDto specialistDto) {
        Specialist specialist = new Specialist();
        dtoToModel(specialist, specialistDto);

        return specialistRepo.save(specialist);
    }

    public Flux<SpecialistDto> getAllSpecialists() {
        return specialistRepo.findAll()
                .map(this::modelToDto);
    }

    public Mono<Specialist> getSpecialistById(ObjectId id) {
        return specialistRepo.findById(id);
    }

    public Mono<Specialist> updateSpecialist(ObjectId id, Specialist specialistDetails) {
        specialistDetails.setId(id);
        return specialistRepo.save(specialistDetails);
    }

    public Mono<Void> deleteSpecialist(ObjectId id) {
        return specialistRepo.deleteById(id);
    }

    public Mono<Specialist> findByEmail(String email) {
        return specialistRepo.findByEmail(email);
    }
}
