package com.ust.message_service.service;

import com.ust.message_service.dto.MessageDto;
import com.ust.message_service.entity.Message;
import com.ust.message_service.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    private void dtoToModel(Message message, MessageDto messageDto) {
        message.setCustomer_id(messageDto.getCustomer_id());
        message.setSpecialist_id(messageDto.getSpecialist_id());
        message.setMessage_text(messageDto.getMessage_text());
        message.setBooking_id(messageDto.getBooking_id());
        message.setStatus(messageDto.getStatus());
        message.setCreatedAt(messageDto.getCreatedAt());
    }

    private MessageDto modelToDto(Message message) {
        MessageDto messageDto = new MessageDto();
        messageDto.setCustomer_id(message.getCustomer_id());
        messageDto.setSpecialist_id(message.getSpecialist_id());
        messageDto.setMessage_text(message.getMessage_text());
        messageDto.setBooking_id(message.getBooking_id());
        messageDto.setStatus(message.getStatus());
        messageDto.setCreatedAt(message.getCreatedAt());

        return messageDto;
    }


    public List<MessageDto> findAllMessages() {
        List<Message> messages = messageRepository.findAll();

        return messages.stream()
                .map(this::modelToDto)
                .collect(Collectors.toList());


    }

    public Message findByMessageById(String id)
    {

        return  messageRepository.findById(id).orElse(null);
    }

    public Message createMessage(MessageDto messageDto) {
        Message message = new Message();
        dtoToModel(message, messageDto);
        return messageRepository.save(message);


    }
    public Message updateMessage(String id, Message messageDetails) {
       messageDetails.setId(id);
        return messageRepository.save(messageDetails);
    }


    public void deleteById(String id) {

        messageRepository.deleteById(id);
    }
}
