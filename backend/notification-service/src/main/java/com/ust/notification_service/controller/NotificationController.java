package com.ust.notification_service.controller;

import com.ust.notification_service.model.NotificationEvent;
import com.ust.notification_service.model.NotificationLog;
import com.ust.notification_service.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<Mono<String>> sendNotification(@RequestBody NotificationEvent event) {
        return ResponseEntity.ok(notificationService.processNotificationEvent(event));
    }

    @GetMapping("/logs")
    public ResponseEntity<Mono<List<NotificationLog>>> getAllNotificationLogs() {
        Mono<List<NotificationLog>> logs = notificationService.getAllNotificationLogs();
        return ResponseEntity.ok(logs);
    }
}
