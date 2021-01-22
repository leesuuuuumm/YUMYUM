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
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeleteFeedRequest {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
}
