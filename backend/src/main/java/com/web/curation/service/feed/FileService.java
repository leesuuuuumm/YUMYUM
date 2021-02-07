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

import javax.imageio.ImageIO;
import javax.swing.filechooser.FileSystemView;
import javax.transaction.Transactional;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.SQLTransactionRollbackException;
import java.util.Calendar;
import java.util.UUID;

@Service
public class FileService {
    @Autowired
    private FileDao fileDao;

    private static final String SAVE_PATH = "/var/www/html/dist/single";
    private static final String PREFIX_URL = "https://i4b101.p.ssafy.io/single/";

    private static final String WINDOWS_SAVE_PATH = FileSystemView.getFileSystemView().getHomeDirectory().toString() + "/single";
    private static final String WINDOWS_PREFIX_URL =FileSystemView.getFileSystemView().getHomeDirectory().toString() + "/single/";


    public String upload(MultipartFile multipartFile) {
        String url;

        try {
            // 파일 정보
            String originFilename = multipartFile.getOriginalFilename();
            String extName = originFilename.substring(originFilename.lastIndexOf("."), originFilename.length());
            Long size = multipartFile.getSize();

            // 서버에서 저장 할 파일 이름
            String saveFileName = genSaveFileName(extName);

            System.out.println("originFilename : " + originFilename);
            System.out.println("extensionName : " + extName);
            System.out.println("size : " + size);
            System.out.println("saveFileName : " + saveFileName);

            writeFile(multipartFile, saveFileName);

            if (System.getProperty("os.name").contains("Windows")) {
                url = WINDOWS_PREFIX_URL + saveFileName;
            } else {
                url = PREFIX_URL + saveFileName;
            }
            System.out.println("url : " + url);

            saveFile(originFilename, saveFileName, url, extName);
        }
        catch (IOException e) {
            // 원래라면 RuntimeException 을 상속받은 예외가 처리되어야 하지만
            // 편의상 RuntimeException을 던진다.
            // throw new FileUploadException();
            throw new RuntimeException(e);
        }
        return url;
    }


    // 현재 시간을 기준으로 파일 이름 생성
    private String genSaveFileName(String extName) {
        StringBuilder fileName = new StringBuilder();

        Calendar calendar = Calendar.getInstance();
        fileName.append(calendar.get(Calendar.YEAR));
        fileName.append(calendar.get(Calendar.MONTH));
        fileName.append(calendar.get(Calendar.DATE));
        fileName.append(calendar.get(Calendar.HOUR));
        fileName.append(calendar.get(Calendar.MINUTE));
        fileName.append(calendar.get(Calendar.SECOND));
        fileName.append(calendar.get(Calendar.MILLISECOND));
        fileName.append(extName);

        return fileName.toString();
    }


    // 파일을 실제로 write 하는 메서드
    private boolean writeFile(MultipartFile multipartFile, String saveFileName) throws IOException{
        boolean result = false;

        byte[] data = multipartFile.getBytes();
        FileOutputStream fos;
        if (System.getProperty("os.name").contains("Windows")) {
            fos = new FileOutputStream(WINDOWS_SAVE_PATH + "/" + saveFileName);
        } else {
            fos = new FileOutputStream(SAVE_PATH + "/" + saveFileName);
        }
        fos.write(data);
        fos.close();

        return result;
    }

    @Transactional
    String saveFile(String origFileName, String fileName, String filePath, String extensionName) {
        File file = File.builder()
                .origFileName(origFileName)
                .fileName(fileName)
                .filePath(filePath)
                .extensionName(extensionName)
                .build();
        return fileDao.save(file).getFilePath();
    }

    @Transactional
    public File getFile(long id) {
        return fileDao.findById(id).get();
    }
}
