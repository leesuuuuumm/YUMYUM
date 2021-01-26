package com.web.curation.model.feed;

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

    private String storeName;

    private String location;

    private Integer score;

    private String content;

    private String userEmail;
    
    private Long placeId;

//    private MultipartFile file;

//    private String imageSrc;
}
