package com.ust.notification_service.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class NotificationService {

  @Autowired
  private JavaMailSender javaMailSender;

  @Autowired
  private TemplateEngine templateEngine;

  // Send Registration Success Email
  public void sendRegistrationSuccessEmail(String to, String name) throws MessagingException {
    sendEmail(to, "Registration Success", name, "Congratulations! Your registration with SnapServe was successful.", "registration-success");
  }

  // Send Booking Created Email
  public void sendBookingCreatedEmail(String to, String name, String appointmentTime) throws MessagingException {
    sendEmail(to, "Booking Created", name, "Your booking for the service is successfully created. Your appointment is scheduled for: " + appointmentTime, "booking-created");
  }

  // Send Booking Completed Email
  public void sendBookingCompletedEmail(String to, String name) throws MessagingException {
    sendEmail(to, "Booking Completed", name, "Your booking has been completed successfully. Thank you for using SnapServe!", "booking-completed");
  }

  // Send Booking Status Update Email (Generic for Cancelled, Approved, etc.)
  public void sendBookingStatusEmail(String to, String name, String status) throws MessagingException {
    String subject = "Booking Status Updated";
    String message = "";

    // Determine the status-specific message
    switch (status.toLowerCase()) {
      case "approved":
        message = "Your booking has been approved. We look forward to serving you!";
        break;
      case "cancelled":
        message = "Your booking has been cancelled. If this was a mistake, please contact us.";
        break;
      case "completed":
        message = "Your booking has been completed successfully. Thank you for using SnapServe!";
        break;
      default:
        message = "The status of your booking has been updated. Please check your booking details.";
    }

    // Send the email using the corresponding template
    sendEmail(to, subject, name, message, "booking-status");
  }

  // Generic Email Sending Method
  private void sendEmail(String to, String subject, String name, String message, String templateName) throws MessagingException {
    Context context = new Context();
    context.setVariable("name", name);
    context.setVariable("message", message);

    // Process the template
    String htmlContent = templateEngine.process(templateName, context);

    // Create a MimeMessage and send HTML content
    MimeMessage mimeMessage = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
    helper.setTo(to);
    helper.setSubject(subject);
    helper.setText(htmlContent, true);
    helper.setFrom("help.snapserve@gmail.com");

    // Send the email
    javaMailSender.send(mimeMessage);
  }
}
