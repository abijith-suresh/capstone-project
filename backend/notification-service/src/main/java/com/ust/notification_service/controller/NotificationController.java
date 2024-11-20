package com.ust.notification_service.controller;

import com.ust.notification_service.service.NotificationService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  // Endpoint for Registration Success Email
  @PostMapping("/send-registration-success")
  public String sendRegistrationSuccessEmail(@RequestParam String to, @RequestParam String name) {
    try {
      notificationService.sendRegistrationSuccessEmail(to, name);
      return "Registration success email sent successfully!";
    } catch (MessagingException e) {
      return "Failed to send registration success email: " + e.getMessage();
    }
  }

  // Endpoint for Booking Created Email
  @PostMapping("/send-booking-created")
  public String sendBookingCreatedEmail(@RequestParam String to, @RequestParam String name, @RequestParam String appointmentTime) {
    try {
      notificationService.sendBookingCreatedEmail(to, name, appointmentTime);
      return "Booking created email sent successfully!";
    } catch (MessagingException e) {
      return "Failed to send booking created email: " + e.getMessage();
    }
  }

  // Send Booking Status Update Email
  @PostMapping("/send-booking-status")
  public String sendBookingStatusEmail(@RequestParam String to, @RequestParam String name, @RequestParam String status) {
    try {
      notificationService.sendBookingStatusEmail(to, name, status);
      return "Booking status email sent successfully!";
    } catch (MessagingException e) {
      return "Failed to send booking status email: " + e.getMessage();
    }
  }
}
