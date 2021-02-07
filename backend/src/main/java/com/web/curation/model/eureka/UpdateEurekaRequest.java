package com.web.curation.model.eureka;

import lombok.*;

import javax.persistence.Column;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEurekaRequest {
    private Long id;

    @Column(length=200)
    private String message;
}

