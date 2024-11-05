package com.ust.customer_service.controller;

import com.ust.customer_service.dto.CustomerDto;
import com.ust.customer_service.entity.Customer;
import com.ust.customer_service.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<CustomerDto> getAllCustomers(){
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable String id){
       Customer customer= customerService.findById(id);
       return customer != null ? ResponseEntity.ok(customer) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Customer saveCustomer(@RequestBody CustomerDto customerDto){
        return customerService.save(customerDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerById(@PathVariable String id){
       customerService.deleteById(id);
       return ResponseEntity.noContent().build();
    }
}
