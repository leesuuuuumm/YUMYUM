package com.web.curation.controller.account;

import java.util.Map;
import java.time.LocalDateTime;
import javax.validation.Valid;

import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.AuthenticationRequest;
import com.web.curation.model.user.ChangePasswordRequest;
import com.web.curation.model.user.UpdateRequest;
import com.web.curation.model.user.SignupRequest;
import com.web.curation.model.user.User;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import org.springframework.web.bind.annotation.RequestMapping;

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
@RequestMapping("/article")
public class AccountController {

	@Autowired
	UserDao userDao;

//    @Autowired
//    private AccountService accountService;

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "아이디와 비밀번호를 받아 로그인을 합니다.")

	public Object login(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) Map<String, String> user)
			throws JsonProcessingException {
		User curUser = userDao.getUserByEmail(user.get("email"));
		String result = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(curUser);

		// 로그인 했을 때 유저 정보(이메일, 닉네임) 보내주기
		if (userDao.findUserByEmailAndPassword(user.get("email"), user.get("password")).isPresent()) {
			return makeResponse("200", result, null,HttpStatus.OK);
		} else {
			return makeResponse("400", "BAD_REQUEST : mismatch", null,HttpStatus.BAD_REQUEST);
		}
	}
	


	@PostMapping("/user")
	@ApiOperation(value = "회원가입")

	public Object signup(
			@Valid @RequestBody @ApiParam(value = "회원가입 시 필요한 회원정보(이메일, 별명, 비밀번호).", required = true) SignupRequest request) {
		// 이메일, 닉네임 중복처리 필수
		// 회원가입단을 생성해 보세요.
		String email = request.getEmail().trim();
		String nickname = request.getNickname().trim();
		String password = request.getPassword().trim();

		// 이메일 중복 체크
		if (userDao.getUserByEmail(email) != null)
			return makeResponse("400", "BAD_REQUEST : this email exists", null,HttpStatus.BAD_REQUEST);

		// 이메일, 별명, 패스워드 비어있는지 확인
		if ("".equals(email) || "".equals(nickname) || "".equals(password))
			return makeResponse("400", "BAD_REQUEST : data is blank", null,HttpStatus.BAD_REQUEST);

		// 별명 체크
		if (userDao.getUserByNickname(nickname) != null)
			return makeResponse("400", "BAD_REQUEST : this nickname exists",null ,HttpStatus.BAD_REQUEST);

		userDao.save(new User(email, password, nickname, null, LocalDateTime.now()));

		return makeResponse("200", "OK : success",null ,HttpStatus.OK);
	}

	@PutMapping("/password")
	@ApiOperation(value = "비밀번호 변경")

	public Object changePassword(
			@Valid @RequestBody @ApiParam(value = "비밀번호 변경 시 필요한 회원정보(이메일, 기존 비밀번호, 새 비밀번호).", required = true) ChangePasswordRequest request) {
		User curUser = userDao.getUserByEmail(request.getEmail());

		if (curUser == null) {
			return makeResponse("404", "NOT_FOUND : user not found",null ,HttpStatus.NOT_FOUND);
		}

		String password = request.getPassword().trim();
		String newPassword = request.getNewPassword().trim();

		// 비밀번호랑 User의 비밀번호와 같은지 확인
		if (!password.equals(curUser.getPassword())) {
			return makeResponse("400", "BAD_REQUEST : password is not match",null, HttpStatus.BAD_REQUEST);
		} else {
			curUser.setPassword(newPassword);
			userDao.save(curUser);
			return makeResponse("200", "OK : success",null, HttpStatus.OK);
		}
	}

	@PutMapping("/user")
	@ApiOperation(value = "회원수정")
	public Object updateAccount(
			@Valid @RequestBody @ApiParam(value = "회원 정보 수정(닉네임, 한줄 소개 ).", required = true) UpdateRequest request) {

		User curUser=userDao.getUserByEmail(request.getEmail());
		
		if(curUser==null) {
			return makeResponse("404", "NOT_FOUND : user not found",null ,HttpStatus.NOT_FOUND);
		}
		String nickname=request.getNickname().trim();
		String introduction=request.getIntroduction().trim();
		
		if(nickname.equals(curUser.getNickname())) {
			return makeResponse("409","CONFLICT : nickname is conflict",null,HttpStatus.CONFLICT);
		}else {
			curUser.setNickname(nickname);
			curUser.setIntroduction(introduction);
			userDao.save(curUser);
			return makeResponse("200", "OK : success",null ,HttpStatus.OK);
		}
		
	}
	@GetMapping("/user/{email}")
	@ApiOperation(value = "회원 조회")
	public Object getInfoAccount(@Valid @ApiParam(value="회원 정보 조회",required=true) @PathVariable String email) {
		
		
		String result=null;
		try {
			System.out.println(email);
			result = new ObjectMapper().writerWithDefaultPrettyPrinter().writeValueAsString(userDao.getUserByEmail(email));
		} catch (JsonProcessingException e) {
			
			e.printStackTrace();
		}
		return makeResponse("200", result,null, HttpStatus.OK);
		
	}
	


	
	@DeleteMapping("/user")
	@ApiOperation(value = "회원 삭제")
	public Object deleteAccount(
			@Valid @RequestBody @ApiParam(value = "회원정보 탈퇴 시 필요한 회원정보(이메일, 별명, 비밀번호).", required = true) SignupRequest request) {
		User curUser = userDao.getUserByEmail(request.getEmail());
		if (curUser == null) {
			return makeResponse("404", "NOT_FOUND : user not found",null, HttpStatus.NOT_FOUND);
		}
		userDao.delete(curUser);

		return makeResponse("200", "OK : success",null, HttpStatus.OK);
	}

	private ResponseEntity<BasicResponse> makeResponse(String status, String data,String message ,HttpStatus httpStatus) {
		final BasicResponse result = new BasicResponse();
		result.status = status;
		result.message=message;
		result.data = data;
		return new ResponseEntity<>(result, httpStatus);
	}
}