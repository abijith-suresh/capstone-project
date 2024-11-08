package com.ust.admin_service.service;

import com.ust.admin_service.dto.AdminDto;

import com.ust.admin_service.dto.SpecialistDto;
import com.ust.admin_service.entity.Admin;
import com.ust.admin_service.repository.AdminRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;


    private void dtoToModel(Admin admin, AdminDto adminDto) {
        admin.setFirstName(adminDto.getFirstName());
        admin.setLastName(adminDto.getLastName());
        admin.setEmail(adminDto.getEmail());

    }

    private AdminDto modelToDto(Admin admin) {
       AdminDto adminDto = new AdminDto();
        adminDto.setFirstName(admin.getFirstName());
        adminDto.setLastName(admin.getLastName());
        adminDto.setEmail(admin.getEmail());

        return adminDto;
    }

    public Flux<AdminDto> findAllAdmins() {
        return adminRepository.findAll()
                .map(this::modelToDto);
    }

    public Mono<Admin> findAdminById(ObjectId id) {

        return adminRepository.findById(id);
    }


    public Mono<Admin> createAdmin(AdminDto adminDto){

        Admin admin = new Admin();
        dtoToModel(admin, adminDto);
        return adminRepository.save(admin);
    }


    public Mono<Admin> updateAdmin(ObjectId id, Admin adminDetails) {
        adminDetails.setId(id);
        return adminRepository.save(adminDetails);
    }

    public Mono<Void> deleteAdminById(ObjectId id) {

        return adminRepository.deleteById(id);
    }

    public Mono<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }


}
