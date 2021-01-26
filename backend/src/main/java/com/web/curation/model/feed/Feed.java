package com.web.curation.model.feed;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.web.curation.model.TimeEntity;
import com.web.curation.model.user.User;
import com.web.curation.moder.map.Place;

import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	private String storeName;
	
	private String location;
	private Integer score;

	@Column(length = 200)
	private String content;

	@ManyToOne
	@JoinColumn(name = "USER_EMAIL")
	private User user;
	
	@ManyToOne
	@JoinColumn(name="PlACE_LOCATION")
	private Place placesInfo;
		
	@Column()
	private String imageSrc;
}
