package com.ust.specialist_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "specialist")
public class Specialist {

    @Id
    private ObjectId id;
    private String name;
    private String email;
    private String phoneNumber;
    private String title;
    private String bio;
    private String price;
    private double rating;
    private String profileImage;
    private List<String> services;
    private List<String> photos;
    private int experience;
    private String address;
    private String status;
}
