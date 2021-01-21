package com.web.curation.dao.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.user.Feed;


public interface FeedDao extends JpaRepository<Feed, String>  {

	Feed getFeedById(Integer id);
	Feed findFeedById(Integer id);
}
