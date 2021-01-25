package com.web.curation.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;
import org.springframework.web.multipart.MultipartFile;


/**
 * SFTP 프로토콜을 접속 모듈
 * 파일 업로드, 다운로드 기능 제공.
 */
public class SftpUtils {
    private Session session = null;

    private Channel channel = null;

    private ChannelSftp channelSftp = null;

    public static StringBuilder errorBd;


    /**
     * 서버와 연결에 필요한 값들을 가져와 초기화 시킴
     *
     * @param host     서버 주소
     * @param userName 접속에 사용될 아이디
     * @param password 비밀번호
     * @param port     포트번호
     */
    public void init(String host, String userName, String password, int port) {
        JSch jsch = new JSch();
        try {
            session = jsch.getSession(userName, host, port);
            session.setPassword(password);

            java.util.Properties config = new java.util.Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);
            session.connect();

            channel = session.openChannel("sftp");
            channel.connect();
        } catch (JSchException e) {
            e.printStackTrace();
        }

        channelSftp = (ChannelSftp) channel;

    }

    public boolean upload(String dir, String filePath) {
        boolean result = true;
        FileInputStream in = null;
        try {
            File file = new File(filePath);
            String fileName = file.getName();
            //fileName = URLEncoder.encode(fileName,"EUC-KR");

            in = new FileInputStream(file);
            channelSftp.cd(dir);
            channelSftp.put(in, fileName);

        } catch (Exception e) {
            e.printStackTrace();
            result = false;
        } finally {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return result;
    }

    /**
     * 단일 파일 다운로드
     *
     * @param dir              저장할 경로(서버)
     * @param downloadFileName 다운로드할 파일
     * @param path             저장될 공간
     */
    public void download(String dir, String downloadFileName, String path) {
        InputStream in = null;
        FileOutputStream out = null;
        try {
            channelSftp.cd(dir);
            in = channelSftp.get(downloadFileName);
        } catch (SftpException e) {
            e.printStackTrace();
        }

        try {
            out = new FileOutputStream(new File(path));
            int i;

            while ((i = in.read()) != -1) {
                out.write(i);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                out.close();
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }

    /**
     * 서버와의 연결을 끊는다.
     */
    public void disconnection() {
        channelSftp.quit();

    }


    /**
     * 단일 파일 즉시 업로드
     *
     * @param sftpHost       SFTP 접속 주소(host:IP)
     * @param sftpUser       SFTP 접속 USER
     * @param sftpPass       SFTP 접속 패스워드
     * @param sftpPort       SFTP 접속 포트
     * @param sftpWorkingDir SFTP 작업 경로
     * @param mfile   업로드할 파일
     */
    public static String directUpload(
            String sftpHost, String sftpUser, String sftpPass,
            int sftpPort, String sftpWorkingDir, MultipartFile mfile) {
        errorBd = new StringBuilder();
        boolean result = true;

        Session session = null;
        Channel channel = null;
        ChannelSftp channelSftp = null;
        System.out.println("preparing the host information for sftp.");
        errorBd.append("preparing the host information for sftp.\n");
        try {
            JSch jsch = new JSch();
            errorBd.append("JSch jsch = new JSch();\n");
            session = jsch.getSession(sftpUser, sftpHost, sftpPort);
            errorBd.append("session = jsch.getSession(sftpUser, sftpHost, sftpPort);\n");
            session.setPassword(sftpPass);
            errorBd.append("session.setPassword(sftpPass);\n");

            // Host 연결.
            java.util.Properties config = new java.util.Properties();
            errorBd.append("java.util.Properties config = new java.util.Properties();\n");
            config.put("StrictHostKeyChecking", "no");
            errorBd.append("config.put(\"StrictHostKeyChecking\", \"no\");\n");
            session.setConfig(config);
            errorBd.append("session.setConfig(config);\n");
            session.connect();
            errorBd.append("session.connect();\n");

            // sftp 채널 연결.
            channel = session.openChannel("sftp");
            errorBd.append("channel = session.openChannel(\"sftp\");\n");
            channel.connect();
            errorBd.append("channel.connect();\n");

            // 파일 업로드 처리.
            channelSftp = (ChannelSftp) channel;
            errorBd.append("channelSftp = (ChannelSftp) channel;\n");
            channelSftp.cd(sftpWorkingDir);
            errorBd.append("channelSftp.cd(sftpWorkingDir);\n");
            File file = convert(mfile);
            errorBd.append("File file = convert(mfile);\n");
            String fileName = file.getName();
            errorBd.append("String fileName = file.getName();\n");
            //fileName = URLEncoder.encode(f.getName(),"UTF-8");
            channelSftp.put(new FileInputStream(file), fileName);
            errorBd.append("channelSftp.put(new FileInputStream(file), fileName);\n");
        } catch (Exception ex) {
            System.out.println(ex.toString());
            errorBd.append("ex.toString()\n");
            errorBd.append(ex.toString());
            errorBd.append("\n");
            System.out.println("Exception found while tranfer the response.");
            errorBd.append("Exception found while tranfer the response.\n");
            result = false;
        } finally {
            // sftp 채널을 닫음.
            channelSftp.exit();
            errorBd.append("channelSftp.exit();\n");

            // 채널 연결 해제.
            channel.disconnect();
            errorBd.append("channel.disconnect();\n");

            // 호스트 세션 종료.
            session.disconnect();
            errorBd.append("session.disconnect();\n");
        }

        return errorBd.toString();
    }

    private static File convert(MultipartFile mfile) {
        java.io.File file =new File(mfile.getOriginalFilename());
        try {
            file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            fos.write(mfile.getBytes());
            fos.close();
            return file;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
