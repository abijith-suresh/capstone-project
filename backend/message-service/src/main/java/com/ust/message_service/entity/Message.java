package com.ust.message_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "message")
public class Message {
    @Id
    private String id;

    private String customer_id;
    private String specialist_id;
    private String message_text;
    private String booking_id;
    private String status;
    private Date createdAt;


}
