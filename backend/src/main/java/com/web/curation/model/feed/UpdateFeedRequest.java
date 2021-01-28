package com.web.curation.model.feed;

import java.time.LocalDateTime;

import javax.persistence.Column;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


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
