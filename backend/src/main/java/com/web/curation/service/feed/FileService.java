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

    private static final String SAVE_PATH = "/var/lib/tomcat9/webapps/single";
    private static final String PREFIX_URL = "/var/lib/tomcat9/webapps/single/";

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

//    public void createThumbnail(String url) {
//        String oPath = url; // 원본 경로
//        java.io.File oFile = new java.io.File(oPath);
//
//        int index = oPath.lastIndexOf(".");
//        String ext = ".jpg"; // 파일 확장자
//
//        String tPath = oFile.getParent() + java.io.File.separator + "t-" + oFile.getName(); // 썸네일저장 경로
//        java.io.File tFile = new java.io.File(tPath);
//
//        double ratio = 2; // 이미지 축소 비율
//
//        try {
//            BufferedImage oImage = ImageIO.read(oFile); // 원본이미지
//            int tWidth = (int) (oImage.getWidth() / ratio); // 생성할 썸네일이미지의 너비
//            int tHeight = (int) (oImage.getHeight() / ratio); // 생성할 썸네일이미지의 높이
//
//            BufferedImage tImage = new BufferedImage(tWidth, tHeight, BufferedImage.TYPE_3BYTE_BGR); // 썸네일이미지
//            Graphics2D graphic = tImage.createGraphics();
//            Image image = oImage.getScaledInstance(tWidth, tHeight, Image.SCALE_SMOOTH);
//            graphic.drawImage(image, 0, 0, tWidth, tHeight, null);
//            graphic.dispose(); // 리소스를 모두 해제
//
//            ImageIO.write(tImage, ext, tFile);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

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
