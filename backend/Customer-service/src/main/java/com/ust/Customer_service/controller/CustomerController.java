package com.ust.Customer_service.controller;

import com.ust.Customer_service.entity.Customer;
import com.ust.Customer_service.service.CustomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomeService customeService;

    @GetMapping
    public List<Customer> getAllBlogs(){
        return customeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getBlogById(@PathVariable String id){
       Customer customer=customeService.findById(id);
        return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Customer saveBlog(@RequestBody Customer customer){
        return customeService.save(customer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogById(@PathVariable String id){
       customeService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
