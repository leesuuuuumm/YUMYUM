package com.web.curation.dao.feed;

import java.util.ArrayList;
import java.util.List;

import com.web.curation.controller.map.PlaceController;
import com.web.curation.model.map.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.web.curation.model.feed.Feed;
import com.web.curation.model.user.User;

public interface FeedDao extends JpaRepository<Feed, Long> {

	//List<Feed> findAllByUser(User user);


//	List<Feed> findDistinctPeopleByLastnameOrFirstname(String lastname, String firstname);
	
//	List<Feed> findDistinctByUserOrderByTitle(User user);
//	List<Feed> findDistinctTitleByUser(String email);

//	List<Feed> findTitleByUser_emailOrderByTitle(String user_email);
	
//	@Query("SELECT DISTINCT title FROM Feed where user_email=?1 ORDER BY title")
//	List<String> findByUser_email(String email);

	List<Feed> findByPlace(Place place);


	List<Feed> findAllByUserOrderByIdDesc(User user);
	
	List<Feed> findAllByTitleAndUser_email(String title,String email);
	
	
//	select title,file_path from Feed where id in (select max(id) from Feed group by title);
	@Query(value="SELECT title,file_path from Feed where id in (select max(id) from Feed group by title) order by title" ,nativeQuery=true)
	List<ArrayList<String>> findByUser_email(String email);
	
	
}
