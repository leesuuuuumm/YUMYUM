package com.web.curation.util;
import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.swing.filechooser.FileSystemView;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.FileCopyUtils;

public class UploadFileUtils {

    public static String uploadFile(String originalName, byte[] fileData) throws Exception {
        //겹쳐지지 않는 파일명을 위한 유니크한 값 생성
        UUID uid = UUID.randomUUID();

        //원본파일 이름과 UUID 결합
        String savedName = uid.toString() + "_" + originalName;

        //파일을 저장할 폴더 생성(년 월 일 기준)

        String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
        String basePath = rootPath + "/" + "single";

        //저장할 파일준비
        File target = new File(basePath, savedName);

        //파일을 저장
        FileCopyUtils.copy(fileData, target);

        String uploadedFileName = makeIcon(basePath, savedName);

        //uploadedFileName는 썸네일명으로 화면에 전달된다.
        return basePath + uploadedFileName;
    }//

    private static String makeIcon(String uploadPath, String fileName) throws Exception{
        String iconName = uploadPath + File.separator + fileName;

        return iconName.substring(uploadPath.length()).replace(File.separatorChar, '/');
    }


}
