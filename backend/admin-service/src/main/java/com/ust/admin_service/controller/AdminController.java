package com.ust.admin_service.controller;

import com.ust.admin_service.dto.AdminDto;
import com.ust.admin_service.dto.SpecialistDto;
import com.ust.admin_service.entity.Admin;
import com.ust.admin_service.service.AdminService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.reactive.LoadBalancerWebClientBuilderBeanPostProcessor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private WebClient.Builder webClientBuilder;

    @GetMapping
    public Flux<AdminDto> getAllAdmins() {
        return adminService.findAllAdmins();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<Admin>> getAdminById(@PathVariable ObjectId id) {
        return adminService.findAdminById(id)
                .map(admin -> ResponseEntity.ok(admin))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
    @PostMapping
    public Mono<Admin> createAdmin(@RequestBody AdminDto adminDto) {
        return adminService.createAdmin(adminDto);
    }

    @PutMapping("/{id}")
    public Mono<ResponseEntity<Admin>> updateAdmin(@PathVariable ObjectId id, @RequestBody Admin adminDetails) {
        return adminService.updateAdmin(id, adminDetails)
                .map(updatedAdmin -> ResponseEntity.ok(updatedAdmin))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteAdmin(@PathVariable ObjectId id) {
        return adminService.deleteAdminById(id)
                .map(v -> ResponseEntity.noContent().build());

    }

    @GetMapping("/specialists")
    public  Flux<SpecialistDto> getAllSpecialist() {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9005/api/specialist")
                .retrieve()
                .bodyToFlux(SpecialistDto.class);

    }

    @GetMapping("/specialist/{id}")
    public Mono<SpecialistDto> getSpecialistById(@PathVariable String id) {
        return webClientBuilder.build()
                .get()
                .uri("http://localhost:9005/api/specialist/{id}", id)
                .retrieve()
                .bodyToMono(SpecialistDto.class);

    }

    @GetMapping("/email/{email}")
    public Mono<ResponseEntity<Admin>> getCustomerByEmail(@PathVariable String email) {
        return adminService.findByEmail(email)
                .map(customer -> ResponseEntity.ok(customer))
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

}
