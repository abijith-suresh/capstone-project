package com.ust.notification_service.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
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

    // Method to send a simple email
    public void sendEmail(String to, String subject, String name, String message) throws MessagingException {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("message", message);

        // Process the template
        String htmlContent = templateEngine.process("email-template", context);

        // Create a MimeMessage and send HTML content
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        helper.setFrom("your-email@example.com");

        // Send the email
        javaMailSender.send(mimeMessage);
    }
}

