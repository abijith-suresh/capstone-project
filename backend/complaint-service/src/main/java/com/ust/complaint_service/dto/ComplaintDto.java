package com.ust.complaint_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintDto {
    private String id;
    private String name;
    private String email;
    private String message;
    private String attachments;

}
