package com.web.curation.controller.account;

import java.util.Map;
import java.time.LocalDateTime;
import javax.validation.Valid;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.ChangePasswordRequest;
import com.web.curation.model.user.SignupRequest;
import com.web.curation.model.user.User;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.beans.factory.annotation.Autowired;

import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
        @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
        @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
        @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
public class AccountController {

    @Autowired
    UserDao userDao;

    @PostMapping("/account/login")
    @ApiOperation(value = "로그인")
    
    public Object login(
		@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) Map<String, String> user) 
				throws JsonProcessingException {
    	User curUser = userDao.getUserByEmail(user.get("email"));
		String result = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(curUser);

		// 로그인 했을 때 유저 정보(이메일, 닉네임) 보내주기
        return userDao.findUserByEmailAndPassword(user.get("email"), user.get("password")).isPresent() ? 
        		makeResponse(true, result, HttpStatus.OK) : 
        		makeResponse(false, "mismatch", HttpStatus.NO_CONTENT);
    }

    @PostMapping("/account/user")
    @ApiOperation(value = "가입하기")

    public Object signup(@Valid @RequestBody SignupRequest request) {
        // 이메일, 닉네임 중복처리 필수
        // 회원가입단을 생성해 보세요.
    	String email = request.getEmail().trim();
    	String nickname = request.getNickname().trim();
    	String password = request.getPassword().trim();
    	
		// 이메일, 별명, 패스워드 비어있는지 확인
    	if ("".equals(email) || "".equals(nickname) || "".equals(password)) 
    		return makeResponse(false, "data is blank", HttpStatus.BAD_REQUEST);
		// 이메일 중복 체크
    	if (userDao.getUserByEmail(email) != null) 
    		return makeResponse(false, "this email exists", HttpStatus.BAD_REQUEST);
		// 별명 체크
    	if (userDao.getUserByNickname(nickname) != null)
    		return makeResponse(false, "this nickname exists", HttpStatus.BAD_REQUEST);
    	
    	userDao.save(new User(nickname, password, email, LocalDateTime.now()));

        return makeResponse(true, "success", HttpStatus.OK);
    }
    
    @PutMapping("/account/password")
    @ApiOperation(value = "비밀번호 변경")

    public Object changePassword(@Valid @RequestBody ChangePasswordRequest request) {
    	User curUser = userDao.getUserByEmail(request.getEmail());
    	
    	if (curUser == null) {
    		return makeResponse(false, "user not found", HttpStatus.NOT_FOUND);
    	}
    	
    	String password = request.getPassword().trim();
    	String newPassword = request.getNewPassword().trim();
    	
		// 비밀번호랑 User의 비밀번호와 같은지 확인
    	if (!password.equals(curUser.getPassword())) {
    		return makeResponse(false, "password is not match", HttpStatus.BAD_REQUEST);
    	} else {
    		curUser.setPassword(newPassword);
    		userDao.save(curUser);
    		return makeResponse(true, "success", HttpStatus.OK);
    	}
    }
    
    @DeleteMapping("/account/user")
	@ApiOperation(value="회원삭제")
	
	public Object deleteAccount(@Valid @RequestBody SignupRequest request) {
		User curUser=userDao.getUserByEmail(request.getEmail());
		if(curUser == null) {
			return HttpStatus.NO_CONTENT;
		}
		userDao.delete(curUser);

		return makeResponse(true, "success", HttpStatus.OK);
	}

    
    private ResponseEntity<BasicResponse> makeResponse(boolean status, String data, HttpStatus httpStatus) {
    	final BasicResponse result = new BasicResponse();
    	result.status = status;
    	result.data = data;
    	return new ResponseEntity<>(result, httpStatus);
	}
}