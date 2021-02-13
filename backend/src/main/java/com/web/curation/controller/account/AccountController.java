package com.web.curation.controller.account;

import com.web.curation.dao.feed.LikeDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.feed.Feed;
import com.web.curation.model.feed.Like;
import com.web.curation.model.user.*;
import com.web.curation.service.account.AccountService;
import com.web.curation.service.jwt.JwtService;
import com.web.curation.utils.SHA256Util;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.web.curation.utils.HttpUtils.convertObjToJson;
import static com.web.curation.utils.HttpUtils.makeResponse;

//@ApiResponses(value = { @ApiResponse(code = 401, message = "Unauthorized", response = BasicResponse.class),
//      @ApiResponse(code = 403, message = "Forbidden", response = BasicResponse.class),
//      @ApiResponse(code = 404, message = "Not Found", response = BasicResponse.class),
//      @ApiResponse(code = 500, message = "Failure", response = BasicResponse.class) })

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	private UserDao userDao;

	@Autowired
	private LikeDao likeDao;

	@Autowired
    private JwtService jwtService;

	@Autowired
	private AccountService accountService;

//	@Autowired
//	private JwtService jwtService;
	@PostMapping
	@ApiOperation(value = "회원가입")
	public Object signup(
			@Valid @RequestBody @ApiParam(value = "회원가입 시 필요한 회원정보(이메일, 별명, 비밀번호).", required = true) SignupRequest request) {
        String email = request.getEmail().trim();
        String nickname = request.getNickname().trim();

		String salt = SHA256Util.generateSalt();
        String password = SHA256Util.getEncrypt(request.getPassword().trim(), salt);

		Object response = accountService.duplicateAndBlankCheckWhenSignUp(email, nickname, password);
		if (response != null) {
			return response;
		}

        User user = accountService.buildUser(email, password, nickname, salt);

        User savedUser = userDao.save(user);
        return makeResponse("200", convertObjToJson(savedUser), "success", HttpStatus.OK);
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "아이디와 비밀번호를 받아 로그인을 합니다.")
	public Object login(
			@RequestBody @ApiParam(value = "로그인 시 필요한 회원정보(아이디, 비밀번호).", required = true) AuthenticationRequest request) {
        String email = request.getEmail().trim();
        String rawPassword = request.getPassword().trim();

        String salt = userDao.findByEmail(email).get().getSalt();

        String password = SHA256Util.getEncrypt(rawPassword, salt);

        Optional<User> curUser = userDao.findUserByEmailAndPassword(email, password);
        // 로그인 했을 때 유저 정보(이메일, 닉네임) 보내주기
        if (curUser.isPresent()) {
            //토큰생성
            String token = jwtService.create("email", curUser.get().getEmail(), "Authorization");

            AuthenticationResponse response = new AuthenticationResponse(curUser.get(), token);

            return makeResponse("200", convertObjToJson(response), "success", HttpStatus.OK);
        } else {
            return makeResponse("400", null, "mismatch", HttpStatus.BAD_REQUEST);
        }
	}

    @PutMapping("/password")
    @ApiOperation(value = "비밀번호 변경")
    public Object changePassword(
            @Valid @RequestBody @ApiParam(value = "비밀번호 변경 시 필요한 회원정보(이메일, 기존 비밀번호, 새 비밀번호).", required = true) ChangePasswordRequest request, HttpServletRequest http) {
        Optional<User> curUser = userDao.findById(request.getUserEmail());

        String salt = curUser.get().getSalt();
        if (!curUser.isPresent()) {
            return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
        }
        String password = request.getPassword().trim();
        String newPassword = request.getNewPassword().trim();
        password = SHA256Util.getEncrypt(password, salt);

        User updateUser = curUser.get();

        // 비밀번호랑 User의 비밀번호와 같은지 확인
        if (!password.equals(updateUser.getPassword())) {
            return makeResponse("400", null, "password is not match", HttpStatus.BAD_REQUEST);
        } else {
            newPassword = SHA256Util.getEncrypt(newPassword, salt);
            updateUser.setPassword(newPassword);
            userDao.save(updateUser);

            return makeResponse("200", convertObjToJson(updateUser), "success", HttpStatus.OK);
        }
    }

	@PutMapping
	@ApiOperation(value = "회원 수정")
	public Object update(
			@Valid @RequestBody @ApiParam(value = "회원 정보 수정(닉네임, 한줄 소개).", required = true) UpdateRequest request) {
		Optional<User> curUser = userDao.findById(request.getEmail());
		if (!curUser.isPresent()) {
			return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
		}

		String nickname = request.getNickname().trim();
		String introduction = request.getIntroduction().trim();

		User updateUser = curUser.get();

		updateUser.setNickname(nickname);
		updateUser.setIntroduction(introduction);
		userDao.save(updateUser);

		return makeResponse("200", convertObjToJson(updateUser), "success", HttpStatus.OK);
	}

	@GetMapping("/{email}")
	@ApiOperation(value = "회원 조회")
	public Object getDetailInfo(@Valid @ApiParam(value = "회원 정보 조회", required = true) @PathVariable String email) {
		Optional<User> curUser = userDao.findById(email);
		if (!curUser.isPresent()) {
			return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
		}

		return makeResponse("200", convertObjToJson(curUser.get()), "success", HttpStatus.OK);
	}

	@DeleteMapping
	@ApiOperation(value = "회원 삭제")
	public Object delete(
			@Valid @RequestBody @ApiParam(value = "회원정보 탈퇴 시 필요한 회원정보(이메일, 별명, 비밀번호).", required = true) SignupRequest request) {
		Optional<User> curUser = userDao.findById(request.getEmail());
		if (!curUser.isPresent()) {
			return makeResponse("404", null, "user not found", HttpStatus.NOT_FOUND);
		}

		userDao.delete(curUser.get());

		return makeResponse("200", curUser.get().getEmail(), "success", HttpStatus.OK);
	}

	@GetMapping("{email}/likeFeeds")
	@ApiOperation(value = "현재 좋아요한 Feed 조회")
	public Object getLikeFeeds(@Valid @ApiParam(value = "회원 정보 조회", required = true) @PathVariable String email) {
		List<Like> likes = likeDao.findAllByUser_Email(email);
		List<Feed> feeds = new ArrayList<>();

		for (Like like : likes) {
			feeds.add(like.getFeed());
		}

		return makeResponse("200", convertObjToJson(feeds), "success", HttpStatus.OK);
	}
}