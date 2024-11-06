package com.ust.admin_service.controller;

import com.ust.admin_service.dto.AdminDto;
import com.ust.admin_service.entity.Admin;
import com.ust.admin_service.service.AdminService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;



    @GetMapping
    public List<AdminDto> getAllAdmins() {

        return adminService.findAllAdmins();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable ObjectId id) {
       Admin admin= adminService.findAdminById(id);
        return admin != null ? ResponseEntity.ok(admin) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Admin createAdmin(@RequestBody AdminDto adminDto) {
        return adminService.createAdmin(adminDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable ObjectId id, @RequestBody Admin adminDetails) {
        return ResponseEntity.ok(adminService.updateAdmin(id, adminDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable ObjectId id) {
        adminService.deleteAdminById(id);
        return ResponseEntity.noContent().build();
    }

}
