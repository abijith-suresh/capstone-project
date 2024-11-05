package com.ust.customer_service.service;

import com.ust.customer_service.dto.CustomerDto;
import com.ust.customer_service.entity.Customer;
import com.ust.customer_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    private void dtoToModel(Customer customer, CustomerDto customerDto) {
        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setEmail(customerDto.getEmail());
        customer.setGender(customerDto.getGender());
        customer.setDob(customerDto.getDob());
    }

    private CustomerDto modelToDto(Customer customer) {
        CustomerDto customerDto = new CustomerDto();
        customerDto.setFirstName(customer.getFirstName());
        customerDto.setLastName(customer.getLastName());
        customerDto.setEmail(customer.getEmail());
        customerDto.setGender(customer.getGender());
        customerDto.setDob(customer.getDob());

        return customerDto;
    }

    public List<CustomerDto> findAll() {
        List<Customer> customers = customerRepository.findAll();

        return customers.stream()
                .map(this::modelToDto)
                .collect(Collectors.toList());
    }

    public Customer findById(String id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer save(CustomerDto customerDto){
        Customer customer = new Customer();
        dtoToModel(customer, customerDto);
        return customerRepository.save(customer);
    }

    public void deleteById(String id) {
        customerRepository.deleteById(id);
    }

}
