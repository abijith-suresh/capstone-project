package com.ust.notification_service.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collation = "notification_logs")
public class NotificationLog {
    @Id
    private ObjectId id;
    private ObjectId userId;
    private String type;
    private String subject;
    private String message;
    private String status;
    private LocalDateTime timestamp;

    public NotificationLog(ObjectId userId, String type, String subject, String message, LocalDateTime timestamp) {
        this.userId = userId;
        this.type = type;
        this.subject = subject;
        this.message = message;
        this.timestamp = timestamp;
    }
}
