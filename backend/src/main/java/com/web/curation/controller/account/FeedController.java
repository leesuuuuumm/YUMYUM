package com.web.curation.controller.account;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dao.user.FeedDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.Feed;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/feed")
public class FeedController {

	@Autowired
	private FeedDao feedDao;
	@Autowired
	private UserDao userDao;
	private ObjectMapper objectMapper = new ObjectMapper();

	@PostMapping("/board")
	@ApiOperation(value = "게시글 등록")

	public Object boardInset(
			@RequestBody @ApiParam(value = "게시글 등록 시 필요한 정보 (음식명 , 날짜 , 식당이름, 장소 , 점수 , 내용)", required = true) Feed request) {
			
		int id=request.getId();
		String title=request.getTitle().trim();
		LocalDateTime date=request.getCreate_date();
		String store_name=request.getStore_name().trim();
		String location=request.getLocation().trim();
		Integer score=request.getScore();
		String content=request.getContent().trim();
		String user_email=request.getUser_email().trim();
		String image_src=request.getImage_src().trim();
		
		if(userDao.getUserByEmail(user_email)==null) {
			
			return makeResponse("400",null,"User Not found",HttpStatus.BAD_REQUEST);
		}
		
		if("".equals(title)||"".equals(store_name)
				||"".equals(location)||score==null||"".equals(content)) {
			return makeResponse("400",null,"data is blank",HttpStatus.BAD_REQUEST);
		}

		feedDao.save(new Feed(id,title,date,store_name,location,score,content,user_email,null));
		
		return makeResponse("200", null,"success", HttpStatus.OK);

	}
	
	private ResponseEntity<BasicResponse> makeResponse(String status, String data, String message, HttpStatus httpStatus) {
		final BasicResponse result = new BasicResponse();
		result.status = status;
		result.message=message;
		result.data = data;
		return new ResponseEntity<>(result, httpStatus);
	}
	

}
