package com.ust.specialist_service.service;

import com.ust.specialist_service.entity.Specialist;
import com.ust.specialist_service.repo.SpecialistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SpecialistService {
    @Autowired
    private SpecialistRepo specialistRepo;

    public Specialist createSpecialist(Specialist specialist) {
        return specialistRepo.save(specialist);
    }

    public List<Specialist> getAllSpecialists() {
        return specialistRepo.findAll();
    }

    public Optional<Specialist> getSpecialistById(String id) {
        return specialistRepo.findById(id);
    }

    public Specialist updateSpecialist(String id, Specialist specialistDetails) {
        specialistDetails.setId(id);
        return specialistRepo.save(specialistDetails);
    }

    public void deleteSpecialist(String id) {
        specialistRepo.deleteById(id);
    }
}
