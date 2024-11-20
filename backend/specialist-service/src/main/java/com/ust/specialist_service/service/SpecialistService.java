package com.ust.specialist_service.service;

import com.ust.specialist_service.dto.EmailUpdateDto;
import com.ust.specialist_service.dto.AddSpecialistDto;
import com.ust.specialist_service.dto.SpecialistDto;
import com.ust.specialist_service.entity.Specialist;
import com.ust.specialist_service.repo.SpecialistRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SpecialistService {

  @Autowired
  private SpecialistRepo specialistRepo;

  @Autowired
  private WebClient.Builder webClientBuilder;

  private void dtoToModel(Specialist specialist, AddSpecialistDto addSpecialistDto) {
    specialist.setName(addSpecialistDto.getName());
    specialist.setTitle(addSpecialistDto.getTitle());
    specialist.setBio(addSpecialistDto.getBio());
    specialist.setPrice(addSpecialistDto.getPrice());
    specialist.setRating(addSpecialistDto.getRating());
    specialist.setProfileImage(addSpecialistDto.getProfileImage());
    specialist.setServices(addSpecialistDto.getServices());
    specialist.setPhotos(addSpecialistDto.getPhotos());
    specialist.setExperience(addSpecialistDto.getExperience());
    specialist.setEmail(addSpecialistDto.getEmail());
    specialist.setPhoneNumber(addSpecialistDto.getPhoneNumber());
    specialist.setStatus(addSpecialistDto.getStatus());
    specialist.setAddress(addSpecialistDto.getAddress());
  }

  private AddSpecialistDto modelToDto(Specialist specialist) {
    AddSpecialistDto addSpecialistDto = new AddSpecialistDto();

    addSpecialistDto.setName(specialist.getName());
    addSpecialistDto.setTitle(specialist.getTitle());
    addSpecialistDto.setBio(specialist.getBio());
    addSpecialistDto.setPrice(specialist.getPrice());
    addSpecialistDto.setRating(specialist.getRating());
    addSpecialistDto.setProfileImage(specialist.getProfileImage());
    addSpecialistDto.setServices(specialist.getServices());
    addSpecialistDto.setPhotos(specialist.getPhotos());
    addSpecialistDto.setExperience(specialist.getExperience());
    addSpecialistDto.setPhoneNumber(specialist.getPhoneNumber());
    addSpecialistDto.setEmail(specialist.getEmail());
    addSpecialistDto.setStatus(specialist.getStatus());
    addSpecialistDto.setAddress(specialist.getAddress());

    return addSpecialistDto;
  }

  private SpecialistDto convertToDto(Specialist specialist) {
    return new SpecialistDto(
        specialist.getId().toString(),
        specialist.getName(),
        specialist.getEmail(),
        specialist.getPhoneNumber(),
        specialist.getTitle(),
        specialist.getBio(),
        specialist.getPrice(),
        specialist.getRating(),
        specialist.getProfileImage(),
        specialist.getServices(),
        specialist.getPhotos(),
        specialist.getExperience(),
            specialist.getAddress(),
    specialist.getStatus());
  }

  public Mono<Specialist> createSpecialist(AddSpecialistDto addSpecialistDto) {
    Specialist specialist = new Specialist();
    dtoToModel(specialist, addSpecialistDto);

    return specialistRepo.save(specialist)
            .flatMap(savedSpecialist -> {
              return sendRegistrationSuccessEmail(savedSpecialist.getEmail(), savedSpecialist.getName())
                      .then(Mono.just(savedSpecialist));
            });
  }

  public Flux<SpecialistDto> getAllSpecialists() {
    return specialistRepo.findAll()
        .map(this::convertToDto);
  }

  public Mono<SpecialistDto> getSpecialistById(ObjectId id) {
    return specialistRepo.findById(id)
        .map(this::convertToDto);
  }

  public Mono<Specialist> updateSpecialist(ObjectId id, Specialist specialistDetails) {
    specialistDetails.setId(id);
    return specialistRepo.save(specialistDetails);
  }

  public Mono<Void> deleteSpecialist(ObjectId id) {
    return specialistRepo.deleteById(id);
  }

  public Mono<SpecialistDto> findByEmail(String email) {
    return specialistRepo.findByEmail(email)
            .map(this::convertToDto);
  }

  public Mono<Specialist> updateSpecialistByEmail(ObjectId id, EmailUpdateDto newEmail) {
    return specialistRepo.findById(id)
        .flatMap(existingSpecialist -> {
          // Update the specialist email
          existingSpecialist.setEmail(newEmail.getEmail());
          return specialistRepo.save(existingSpecialist);
        });

  }

  public Mono<Void> updateSpecialistStatus(ObjectId id, String status) {
    return specialistRepo.findById(id)
        .flatMap(specialist -> {
          specialist.setStatus(status);
          return specialistRepo.save(specialist);
        })
        .then();
  }

  public Flux<SpecialistDto> getSpecialistsByStatus(String status) {

    if (status == null || status.isEmpty()) {
      return Flux.error(new IllegalArgumentException("Status cannot be null or empty"));
    }
    return specialistRepo.findByStatus(status);
  }

  public Mono<Void> deleteSpecialistByEmail(String email) {
    return specialistRepo.findByEmail(email)
        .flatMap(specialist -> specialistRepo.delete(specialist)); // Deletes the specialist if found
  }

  private Mono<Void> sendRegistrationSuccessEmail(String email, String name) {
    return webClientBuilder.build()
            .post()
            .uri(uriBuilder -> uriBuilder
                    .scheme("http")
                    .host("localhost")
                    .port(9008)
                    .path("/api/notifications/send-registration-success")
                    .queryParam("to", email)
                    .queryParam("name", name)
                    .build())
            .retrieve()
            .bodyToMono(Void.class)
            .doOnError(error -> {
              System.out.println("Failed to send registration email: " + error.getMessage());
            });
  }

}
