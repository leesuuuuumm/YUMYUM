package com.web.curation.model.eureka;

import javax.persistence.*;

import com.web.curation.model.TimeEntity;
import com.web.curation.model.user.User;
import com.web.curation.model.map.Place;

import lombok.Builder;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Eureka extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 200)
    private String message;

    @ManyToOne
    @JoinColumn(name = "USER_EMAIL")
    private User user;

    private Double lat;
    private Double lon;
}