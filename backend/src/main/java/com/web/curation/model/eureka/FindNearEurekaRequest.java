package com.web.curation.model.eureka;


import lombok.*;

import javax.persistence.Column;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FindNearEurekaRequest {
    private Double lat;

    private Double lon;

    private Double distance;
}