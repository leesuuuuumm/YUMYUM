package com.web.curation.model.feed;

import lombok.*;

import javax.persistence.Column;


@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateFeedRequest {
	private Long id;

	@Column(length=200)
	private String content;

	private Integer score;
}
