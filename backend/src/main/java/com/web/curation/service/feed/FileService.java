package com.web.curation.service.feed;

import com.web.curation.dao.feed.FileDao;
import com.web.curation.model.feed.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;

@Service
public class FileService {
    @Autowired
    private FileDao fileDao;

    public String upload(@RequestParam("file") MultipartFile file) throws Exception {
        String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
        String basePath = rootPath + "/" + "single";

        String filePath = basePath + "/" + file.getOriginalFilename();

        java.io.File destinationFile = new java.io.File(filePath);
        file.transferTo(destinationFile);

        return "uploaded";
    }

    @Transactional
    public Long saveFile(File file) {
        return fileDao.save(file).getId();
    }

    @Transactional
    public File getFile(Long id) {
        return fileDao.findById(id).get();
    }
}
