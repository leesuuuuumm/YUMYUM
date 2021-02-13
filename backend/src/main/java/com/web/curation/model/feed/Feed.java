package com.web.curation.model.feed;

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
public class Feed extends TimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String title;

	private Integer score;

	@Column(length = 200)
	private String content;

	@ManyToOne
	@JoinColumn(name = "USER_EMAIL")
	private User user;

	@ManyToOne
	@JoinColumn(name = "PLACE_ID")
	private Place place;

	private String videoPath;

	private String thumbnailPath;

	private Integer likeCount;
}
