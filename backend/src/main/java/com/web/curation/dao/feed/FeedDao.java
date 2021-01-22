package com.web.curation.dao.feed;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.curation.model.feed.Feed;


public interface FeedDao extends JpaRepository<Feed, Long>  {
}
