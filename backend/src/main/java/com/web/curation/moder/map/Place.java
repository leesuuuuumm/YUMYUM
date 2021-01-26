package com.web.curation.moder.map;


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
	@Column(name="PlACE_LOCATION")
	private Long id;
	
	private String addressName;
	private String categoryGroupCode;
	private String categroyGroupName; 
	private String categoryName;
	private Long distance;
	private String phone;
	private String placeName;
	private double y;
	private double x;
	

}