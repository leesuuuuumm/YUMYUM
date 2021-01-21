package com.web.curation.model.user;

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
public class FeedUpdateRequest {

	private int id;
	
	@Column(length=200)
	private String content;
	
	@UpdateTimestamp
	private LocalDateTime update_date;
	
	private Integer score;
	
	
	
}
