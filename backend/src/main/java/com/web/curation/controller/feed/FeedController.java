package com.web.curation.controller.feed;

import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.web.curation.model.feed.CreateFeedRequest;
import com.web.curation.model.feed.DeleteFeedRequest;
import com.web.curation.model.feed.UpdateFeedRequest;
import com.web.curation.model.user.User;
import com.web.curation.service.feed.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.feed.Feed;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import javax.validation.Valid;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/feed")
public class FeedController {

	@Autowired
	private FeedDao feedDao;
	@Autowired
	private UserDao userDao;
//	@Autowired
//	private FileService fileService;
	private ObjectMapper objectMapper = new ObjectMapper();

	@PostMapping
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
		if (curUser == null) {
			return makeResponse("400", null, "User Not found", HttpStatus.BAD_REQUEST);
		}

		if ("".equals(title) || "".equals(storeName) || "".equals(location) || score == null || "".equals(content)) {
			return makeResponse("400", null, "data is blank", HttpStatus.BAD_REQUEST);
		}

		Feed feed = Feed.builder().title(title).storeName(storeName).location(location).score(score).content(content)
				.user(curUser).build();

		Feed savedFeed = feedDao.save(feed);

		return makeResponse("200", convertObjToJson(savedFeed), "success", HttpStatus.OK);
	}

	@PutMapping
	@ApiOperation(value = "피드 수정")
	public Object update(
			@Valid @RequestBody @ApiParam(value = "게시글 정보 수정", required = true) UpdateFeedRequest request) {

		Optional<Feed> curFeed = feedDao.findById(request.getId());

		if (!curFeed.isPresent()) {
			return makeResponse("404", null, "Feed Not Found", HttpStatus.NOT_FOUND);
		}

		Feed updateFeed = curFeed.get();

		updateFeed.setContent(request.getContent().trim());
		updateFeed.setScore(request.getScore());

		feedDao.save(updateFeed);
		return makeResponse("200", convertObjToJson(updateFeed), "success", HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "단일 피드 조회")
	public Object search(@Valid @ApiParam(value = "id 값으로 검색", required = true) @PathVariable int id) {
		Optional<Feed> curFeed = feedDao.findById((long)id);

		if (!curFeed.isPresent()) {
			return makeResponse("404", null, "No searchResult", HttpStatus.NOT_FOUND);
		}

		return makeResponse("200", convertObjToJson(curFeed.get()), "success", HttpStatus.OK);
	}

	@GetMapping("/list/{email}")
	@ApiOperation(value = "피드 리스트 조회")
	public Object searchList(@Valid @ApiParam(value = "email 값으로 검색 ", required = true) @PathVariable String email) {

		User curUser = userDao.getUserByEmail(email);

		if (curUser == null) {
			return makeResponse("404", null, "User Not Found", HttpStatus.NOT_FOUND);
		}

		List<Feed> searchlist = feedDao.findAllByUser(curUser);
		System.out.println(searchlist);

		return makeResponse("200", convertObjToJson(searchlist), "success", HttpStatus.OK);

	}

	@DeleteMapping("/delete")
	@ApiOperation(value = "회원 삭제")
	public Object delete(@Valid @RequestBody @ApiParam(value = "게시글 삭제") DeleteFeedRequest request) {
		Optional<Feed> curFeed = feedDao.findById(request.getId());
		if (!curFeed.isPresent()) {
			return makeResponse("404", null, "Feed Not Found", HttpStatus.NOT_FOUND);
		}
		feedDao.delete(curFeed.get());

		return makeResponse("200", convertObjToJson(curFeed.get()), "success", HttpStatus.OK);
	}

	private ResponseEntity<BasicResponse> makeResponse(String status, String data, String message,
			HttpStatus httpStatus) {
		final BasicResponse result = new BasicResponse();
		result.status = status;
		result.message = message;
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
