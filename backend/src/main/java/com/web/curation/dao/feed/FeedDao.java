package com.web.curation.dao.feed;

import com.web.curation.model.feed.Feed;
import com.web.curation.model.map.Place;
import com.web.curation.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface FeedDao extends JpaRepository<Feed, Long> {

	List<Feed> findByPlace(Place place);


	List<Feed> findAllByUserOrderByIdDesc(User user);
	
	List<Feed> findAllByTitleAndUser_email(String title,String email);

//	select title,file_path from Feed where id in (select max(id) from Feed group by title);
	@Query(value="SELECT title,video_path from feed where user_email=?1 and id in (select max(id) from feed group by title) order by title" ,nativeQuery=true)
	List<ArrayList<String>> findByUser_email(String email);
}
