package com.web.curation.controller.feed;
import java.time.LocalDateTime;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.curation.model.feed.CreateFeedRequest;
import com.web.curation.model.user.User;
import com.web.curation.service.feed.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.feed.Feed;

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
	@Autowired
	private FileService fileService;
	private ObjectMapper objectMapper = new ObjectMapper();

	@PostMapping("")
	@ApiOperation(value = "게시글 등록")

	public Object create(
			@RequestBody @ApiParam(value = "게시글 등록 시 필요한 정보 (음식명 , 날짜 , 식당이름, 장소 , 점수 , 내용)", required = true) CreateFeedRequest request) {

		String title = request.getTitle().trim();
		String storeName = request.getStoreName().trim();
		String location = request.getLocation().trim();
		Integer score = request.getScore();
		String content = request.getContent().trim();
		String userEmail = request.getUserEmail().trim();
//		String imageSrc = request.getImageSrc().trim();

		User curUser = userDao.getUserByEmail(userEmail);
		if(curUser == null) {
			return makeResponse("400",null,"User Not found", HttpStatus.BAD_REQUEST);
		}
		
		if("".equals(title) || "".equals(storeName) || "".equals(location)|| score == null||"".equals(content)) {
			return makeResponse("400",null,"data is blank",HttpStatus.BAD_REQUEST);
		}

		Feed feed = Feed.builder()
				.title(title)
				.storeName(storeName)
				.location(location)
				.score(score)
				.content(content)
				.user(curUser)
				.build();

		Feed savedFeed = feedDao.save(feed);
		
		return makeResponse("200", convertObjToJson(savedFeed),"success", HttpStatus.OK);
	}
	
	private ResponseEntity<BasicResponse> makeResponse(String status, String data, String message, HttpStatus httpStatus) {
		final BasicResponse result = new BasicResponse();
		result.status = status;
		result.message=message;
		result.data = data;
		return new ResponseEntity<>(result, httpStatus);
	}

	private String convertObjToJson(Object object) {
		try {
			return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "Failed convert object to json";
		}
	}
}
