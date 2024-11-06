package com.ust.message_service.controller;

import com.ust.message_service.dto.MessageDto;
import com.ust.message_service.entity.Message;
import com.ust.message_service.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping
    public List<MessageDto> getAllMessages(){

        return messageService.findAllMessages();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageById(@PathVariable String id){
        Message message= messageService.findByMessageById(id);
        return message != null ? ResponseEntity.ok(message) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Message createMessage(@RequestBody MessageDto messageDto){
        return messageService.createMessage(messageDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Message> updateMessage(@PathVariable String id, @RequestBody Message messageDetails) {
        return ResponseEntity.ok(messageService.updateMessage(id, messageDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessageById(@PathVariable String id){
        messageService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
