package com.ust.notification_service.controller;

import com.ust.notification_service.service.NotificationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @PostMapping("/send")
  public String sendEmail(@RequestBody Map<String, String> emailPayload) {
    try {
      String to = emailPayload.get("to");
      String subject = emailPayload.get("subject");
      String name = emailPayload.get("name");
      String message = emailPayload.get("message");

      // Send email using the EmailService with Thymeleaf template
      notificationService.sendEmail(to, subject, name, message);
      return "Email sent successfully";
    } catch (MessagingException e) {
      return "Failed to send email: " + e.getMessage();
    }
  }

}
