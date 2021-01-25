package com.web.curation.service.feed;

import com.web.curation.dao.feed.FileDao;
import com.web.curation.model.feed.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileService {
//    @Autowired
//    private FileDao fileDao;
//
//    @Value("${upload.path}")
//    private String path;
//
//    public String upload(MultipartFile file) {
//        String filePath;
//        if (System.getProperty("os.name").contains("Windows")) {
//            String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
//            String basePath = rootPath + "/" + "single";
//            filePath = basePath + "/" + file.getOriginalFilename();
//
//            java.io.File destinationFile = new java.io.File(filePath);
//            try {
//                file.transferTo(destinationFile);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        } else {
//            String basePath = path + "/" + "single";
//            filePath = basePath + "/" + file.getOriginalFilename();
//            try {
//                InputStream inputStream = file.getInputStream();
//
//                Files.copy(inputStream, Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        return filePath + System.getProperty("os.name");
//    }
//
////    public File convertMultipartFileToFile(MultipartFile multipartFile) {
////        multipartFile.getOriginalFilename();
////    }
//
//    @Transactional
//    public Long saveFile(File file) {
//        return fileDao.save(file).getId();
//    }
//
//    @Transactional
//    public File getFile(long id) {
//        return fileDao.findById(id).get();
//    }
}
