package com.web.curation.dao.feed;

import com.web.curation.model.feed.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileDao extends JpaRepository<File, Long> {
}
