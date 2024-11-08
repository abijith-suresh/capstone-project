package com.ust.notification_service.service;

import com.ust.notification_service.model.NotificationEvent;
import com.ust.notification_service.model.NotificationLog;
import com.ust.notification_service.repo.NotificationRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    public void processNotificationEvent(NotificationEvent event) {
        switch (event.getType()) {
            case "BOOKING_REQUEST":
                sendBookingRequestNotification(event);
                break;
            case "BOOKING_STATUS":
                sendBookingStatusNotification(event);
                break;
            default:
                throw new IllegalArgumentException("Unknown event type: " + event.getType());
        }
    }

    private void sendBookingRequestNotification(NotificationEvent event) {
        String subject = "New Booking Request!";
        String message = "You have received a new booking request! Please check your dashboard for more details.";

//        sendEmail(event.getEmail(), subject, message);
        saveNotificationLog(event, subject, message);
    }

    private void sendBookingStatusNotification(NotificationEvent event) {
        String subject = "Booking Status Update";
        String message = "Your booking request has been " + event.getStatus() + ".";

//        sendEmail(event.getEmail(), subject, message);
        saveNotificationLog(event, subject, message);
    }

    private void sendEmail(String toEmail, String subject, String message) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(message, true);

            mailSender.send(mimeMessage);
            System.out.println("Email sent to: " + toEmail);
        } catch (MailException | MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Error sending email: " + e.getMessage());
        }
    }

    private void saveNotificationLog(NotificationEvent event, String subject, String message) {
        NotificationLog log = new NotificationLog(
                event.getUserId(),
                event.getType(),
                subject,
                message,
                LocalDateTime.now()
        );
        notificationRepository.save(log);
    }

}
