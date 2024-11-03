package com.ust.specialist_service.controller;

import com.ust.specialist_service.service.SpecialistService;
import com.ust.specialist_service.entity.Specialist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialist")
public class SpecialistController {

    @Autowired
    private SpecialistService specialistService;

    @PostMapping
    public Specialist createSpecialist(@RequestBody Specialist specialist) {
        return specialistService.createSpecialist(specialist);
    }

    @GetMapping
    public List<Specialist> getAllSpecialists() {
        return specialistService.getAllSpecialists();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Specialist> getSpecialistById(@PathVariable String id) {
        return specialistService.getSpecialistById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Specialist> updateSpecialist(@PathVariable String id, @RequestBody Specialist specialistDetails) {
        return ResponseEntity.ok(specialistService.updateSpecialist(id, specialistDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSpecialist(@PathVariable String id) {
        specialistService.deleteSpecialist(id);
        return ResponseEntity.noContent().build();
    }
}
