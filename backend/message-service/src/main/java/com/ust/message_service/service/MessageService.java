package com.ust.message_service.service;

import com.ust.message_service.entity.Message;
import com.ust.message_service.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> findAll() {

        return messageRepository.findAll();
    }

    public Message findById(String id)
    {
        return  messageRepository.findById(id).orElse(null);
    }

    public Message save(Message message) {

        return  messageRepository.save(message);
    }

    public void deleteById(String id) {

        messageRepository.deleteById(id);
    }
}
