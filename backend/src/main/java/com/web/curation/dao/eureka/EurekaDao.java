//package com.web.curation.dao.eureka;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import com.web.curation.controller.map.PlaceController;
//import com.web.curation.model.eureka.Eureka;
//import com.web.curation.model.map.Place;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//import com.web.curation.model.feed.Feed;
//import com.web.curation.model.user.User;
//
//public interface EurekaDao extends JpaRepository<Eureka, Long> {
//
//    List<Eureka> findByUser(User user);
//}