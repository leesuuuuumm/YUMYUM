package com.web.curation.dao.map;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.map.Place;


public interface PlaceDao extends JpaRepository<Place, Long>  {

}
