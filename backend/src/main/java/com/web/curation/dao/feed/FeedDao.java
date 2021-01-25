package com.web.curation.dao.feed;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.feed.Feed;
import com.web.curation.model.user.User;


public interface FeedDao extends JpaRepository<Feed, Long>  {

	List<Feed> findAllByUser(User user);
	
	
}
