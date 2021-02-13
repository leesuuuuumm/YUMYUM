package com.web.curation.service.account;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.user.User;
import com.web.curation.utils.SHA256Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import static com.web.curation.utils.HttpUtils.makeResponse;

@Service
public class AccountService {
    @Autowired
    private UserDao userDao;

    public Object duplicateAndBlankCheckWhenSignUp(String email, String nickname, String password) {
        // 이메일 중복 체크
        if (userDao.findById(email).isPresent()) {
            return makeResponse("400", null, "this email already exists", HttpStatus.BAD_REQUEST);
        }
        // 이메일, 별명, 패스워드 비어있는지 확인
        if ("".equals(email) || "".equals(nickname) || "".equals(password))
            return makeResponse("400", null, "data is blank", HttpStatus.BAD_REQUEST);

        // 별명 체크
        if (userDao.getUserByNickname(nickname) != null)
            return makeResponse("400", null, "this nickname already exists", HttpStatus.BAD_REQUEST);

        return null;
    }

    public User buildUser(String email, String password, String nickname, String salt) {
        return User.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .salt(salt)
                .build();
    }
}
