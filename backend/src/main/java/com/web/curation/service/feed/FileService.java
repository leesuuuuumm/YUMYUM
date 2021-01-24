package com.web.curation.service.feed;

import com.web.curation.dao.feed.FileDao;
import com.web.curation.exception.StorageException;
import com.web.curation.model.feed.File;
import lombok.var;
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
import java.sql.SQLTransactionRollbackException;
import java.util.UUID;

@Service
public class FileService {
    @Autowired
    private FileDao fileDao;

    @Value("${upload.path}")
    private String path;

    public String upload(MultipartFile file) {
        if (file.isEmpty()) {
            throw new StorageException("Failed to store empty file");
        }
        String resultLog = "";
        UUID uuid = UUID.randomUUID();
        String savedFileName = uuid.toString() + file.getOriginalFilename();

        try {
            if (System.getProperty("os.name").contains("Windows")) {
                String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
                String basePath = rootPath + "/" + "single";
                String filePath = basePath + "/" + savedFileName;
                java.io.File dest = new java.io.File(filePath);
                file.transferTo(dest);

                resultLog = filePath;
            } else {
                var fileName = savedFileName;
                var is = file.getInputStream();

                resultLog = path + fileName;
                Files.copy(is, Paths.get(path + fileName), StandardCopyOption.REPLACE_EXISTING);
            }

        } catch (IOException e) {
            var msg = String.format("Failed to store file %f", file.getName());

            throw new StorageException(msg, e);
        }
        return resultLog;
    }



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

//    public File convertMultipartFileToFile(MultipartFile multipartFile) {
//        multipartFile.getOriginalFilename();
//    }

    @Transactional
    public Long saveFile(File file) {
        return fileDao.save(file).getId();
    }

    @Transactional
    public File getFile(long id) {
        return fileDao.findById(id).get();
    }
}
