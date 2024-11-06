package com.ust.review_service.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "review")
public class Review {

    @Id
    private String id;

    private String customer_id;
    private String specialist_id;
    private Integer rating;
    private String comment;
    private Date createdAt;


}
