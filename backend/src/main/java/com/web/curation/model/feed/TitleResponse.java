package com.web.curation.model.feed;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Builder
public class TitleResponse {
    private String title;
    private String videoPath;
}
