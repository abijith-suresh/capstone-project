package com.ust.message_service.controller;

import com.ust.message_service.entity.Message;
import com.ust.message_service.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<Message> getAllCustomers(){

        return messageService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getCustomerById(@PathVariable String id){
        Message message= messageService.findById(id);
        return message != null ? ResponseEntity.ok(message) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Message saveCustomer(@RequestBody Message message){
        return messageService.save(message);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomerById(@PathVariable String id){
        messageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
