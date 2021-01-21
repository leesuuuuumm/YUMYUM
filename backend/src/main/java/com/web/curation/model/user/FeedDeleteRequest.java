package com.web.curation.model.user;

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
public class FeedDeleteRequest {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
}
