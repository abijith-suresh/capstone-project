package com.ust.message_service.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MessageDto {

    private String customer_id;
    private String specialist_id;
    private String message_text;
    private String booking_id;
    private String status;
    private Date createdAt;
}
