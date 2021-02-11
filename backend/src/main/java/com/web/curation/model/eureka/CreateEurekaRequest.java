package com.web.curation.model.eureka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CreateEurekaRequest {
    private String message;

    private String userEmail;

    private Double lat;

    private Double lon;
}
