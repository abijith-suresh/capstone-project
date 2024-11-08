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
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Mono<List<NotificationLog>> getAllNotificationLogs() {
        return notificationRepository.findAll()
                .collectList();
    }

    public Mono<String> processNotificationEvent(NotificationEvent event) {
        return switch (event.getType()) {
            case "BOOKING_REQUEST" -> sendBookingRequestNotification(event);
            case "BOOKING_STATUS" -> sendBookingStatusNotification(event);
            default -> Mono.error(new IllegalArgumentException("Unknown event type: " + event.getType()));
        };
    }

    private Mono<String> sendBookingRequestNotification(NotificationEvent event) {
        String subject = "New Booking Request!";
        String message = "You have received a new booking request! Please check your dashboard for more details.";

        return saveNotificationLog(event, subject, message);
    }

    private Mono<String> sendBookingStatusNotification(NotificationEvent event) {
        String subject = "Booking Status Update";
        String message = "Your booking request has been " + event.getStatus() + ".";

        return saveNotificationLog(event, subject, message);
    }

    private Mono<String> saveNotificationLog(NotificationEvent event, String subject, String message) {
        NotificationLog log = new NotificationLog(
                event.getUserId(),
                event.getType(),
                subject,
                message,
                LocalDateTime.now()
        );

        return notificationRepository.save(log).then(Mono.just("Notification sent successfully"));
    }
}

