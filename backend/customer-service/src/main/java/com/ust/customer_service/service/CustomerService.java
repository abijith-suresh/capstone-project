package com.ust.customer_service.service;

import com.ust.customer_service.dto.CustomerDto;
import com.ust.customer_service.dto.EmailUpdateDto;
import com.ust.customer_service.entity.Customer;
import com.ust.customer_service.repository.CustomerRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    private void dtoToModel(Customer customer, CustomerDto customerDto) {
        customer.setName(customerDto.getName());
        customer.setEmail(customerDto.getEmail());
        customer.setGender(customerDto.getGender());
        customer.setDob(customerDto.getDob());
        customer.setAddress(customerDto.getAddress());
        customer.setProfilePictureUrl(customerDto.getProfilePictureUrl());
        customer.setPhone(customerDto.getPhone());
    }

    private CustomerDto modelToDto(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setId(customer.getId().toString());
        customerDto.setName(customer.getName());
        customerDto.setEmail(customer.getEmail());
        customerDto.setGender(customer.getGender());
        customerDto.setDob(customer.getDob());
        customerDto.setAddress(customer.getAddress());
        customerDto.setPhone(customer.getPhone());
        customerDto.setProfilePictureUrl(customer.getProfilePictureUrl());

        return customerDto;
    }

    public Flux<CustomerDto> findAllCustomers() {
        return customerRepository.findAll()
                .map(this::modelToDto);
    }

    public Mono<CustomerDto> findCustomerById(ObjectId id) {
        return customerRepository.findById(id)
                .map(this::modelToDto);
    }

    public Mono<Customer> createCustomer(CustomerDto customerDto) {
        Customer customer = new Customer();
        dtoToModel(customer, customerDto);
        return customerRepository.save(customer);
    }

    public Mono<Customer> updateCustomer(ObjectId id, Customer customerDetails) {
        customerDetails.setId(id);
        return customerRepository.save(customerDetails);
    }

    public Mono<Void> deleteCustomerById(ObjectId id) {
        return customerRepository.deleteById(id);
    }

    public Mono<CustomerDto> findByEmail(String email) {
        return customerRepository.findByEmail(email)
                .map(this::modelToDto);
    }

    public Mono<Customer> updateCustomerByEmail(ObjectId id, EmailUpdateDto newEmail) {
        return customerRepository.findById(id)
            .flatMap(existingCustomer -> {
                existingCustomer.setEmail(newEmail.getEmail());  // Set email from DTO
                return customerRepository.save(existingCustomer); // Save updated customer
        });
    }

}

