package com.web.curation.model.feed;

import com.web.curation.model.map.Place;
import com.web.curation.model.user.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateFeedRequest {
    private String title;

    private String content;

    private Integer score;

    private String userEmail;

    private Long placeId;

//    private MultipartFile file;
}
