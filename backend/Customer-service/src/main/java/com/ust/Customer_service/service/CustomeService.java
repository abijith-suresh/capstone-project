package com.ust.Customer_service.service;

import com.ust.Customer_service.entity.Customer;
import com.ust.Customer_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomeService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAll() {

        return customerRepository.findAll();
    }

    public Customer findById(String id)
    {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer save(Customer customer) {

        return customerRepository.save(customer);
    }

    public void deleteById(String id) {

        customerRepository.deleteById(id);
    }

}
