package com.ust.notification_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NotificationEvent {
    private ObjectId userId;
    private String type;
    private String message;
    private String status;
    private String recipientType;
    private String email;
}
