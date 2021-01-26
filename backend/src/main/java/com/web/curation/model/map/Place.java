package com.web.curation.model.map;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;


import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Place {
	@Id
	@Column(name="PLACE_ID")
	private Long id;
	
	private String addressName;
	private String phone;
	private String placeName;
	private double y;
	private double x;
}