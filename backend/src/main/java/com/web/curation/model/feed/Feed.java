package com.web.curation.model.feed;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.web.curation.model.TimeEntity;
import com.web.curation.model.user.User;
import lombok.Builder;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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

//	@OneToOne
//	@JoinColumn(name = "file_path")
	private String filePath;
}
