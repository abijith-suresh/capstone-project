package com.ust.admin_service.service;

import com.ust.admin_service.dto.AdminDto;
import com.ust.admin_service.entity.Admin;
import com.ust.admin_service.repository.AdminRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<AdminDto> findAllAdmins() {
        List<Admin> admins = adminRepository.findAll();

        return admins.stream()
                .map(this::modelToDto)
                .collect(Collectors.toList());
    }


    public Admin findAdminById(ObjectId id) {

        return adminRepository.findById(id).orElse(null);
    }

    public Admin createAdmin(AdminDto adminDto){
        Admin admin = new Admin();
        dtoToModel(admin, adminDto);
        return adminRepository.save(admin);
    }


    public Admin updateAdmin(ObjectId id, Admin adminDetails) {
       adminDetails.setId(id);
        return adminRepository.save(adminDetails);
    }

    public void deleteAdminById(ObjectId id) {

        adminRepository.deleteById(id);
    }



}
