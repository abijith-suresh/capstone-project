package com.ust.specialist_service.service;

import com.ust.specialist_service.dto.SpecialistDto;
import com.ust.specialist_service.entity.Specialist;
import com.ust.specialist_service.repo.SpecialistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
       SpecialistDto specialistDto= new SpecialistDto();
        specialistDto.setFirstName(specialist.getFirstName());
        specialistDto.setLastName(specialist.getLastName());
        specialistDto.setEmail(specialist.getEmail());

        return specialistDto;
    }



    public Specialist createSpecialist(SpecialistDto specialistDto) {
        Specialist specialist = new Specialist();
        dtoToModel(specialist, specialistDto);
        return specialistRepo.save(specialist);


    }

    public List<SpecialistDto> getAllSpecialists() {
        List<Specialist> specialist = specialistRepo.findAll();

        return specialist.stream()
                .map(this::modelToDto)
                .collect(Collectors.toList());

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
