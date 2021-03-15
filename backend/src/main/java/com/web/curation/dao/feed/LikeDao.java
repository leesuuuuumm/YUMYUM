package com.web.curation.dao.feed;

import java.util.List;
import java.util.Optional;

import com.web.curation.model.feed.Like;
import com.web.curation.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeDao extends JpaRepository<Like, Long> {
    List<Like> findByUser_EmailAndFeed_Id(String email, Long feedId);

    List<Like> findAllByFeed_Id(Long feedId);

    List<Like> findAllByUser_Email(String userEmail);
}