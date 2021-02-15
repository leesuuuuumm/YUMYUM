package com.web.curation.model.feed;

import java.time.LocalDateTime;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@ToString
@Builder
public class LikeFeedResponse {
    private Feed feed;

    private Integer likeCount;

    private boolean isLike;
}