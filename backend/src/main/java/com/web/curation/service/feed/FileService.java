package com.web.curation.service.feed;

import com.web.curation.dao.feed.FileDao;
import com.web.curation.model.feed.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class FileService {
    @Autowired
    private FileDao fileDao;

    @Transactional
    public Long saveFile(File file) {
        return fileDao.save(file).getId();
    }

    @Transactional
    public File getFile(Long id) {
        return fileDao.findById(id).get();
    }
}
