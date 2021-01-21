package com.web.curation.controller.account;

import java.time.LocalDateTime;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dao.user.FeedDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.model.user.Feed;
import com.web.curation.model.user.FeedDeleteRequest;
import com.web.curation.model.user.FeedUpdateRequest;

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

	@PostMapping("/insert")
	@ApiOperation(value = "게시글 등록")

	public Object boardInset(
			@RequestBody @ApiParam(value = "게시글 등록 시 필요한 정보 (음식명 , 날짜 , 식당이름, 장소 , 점수 , 내용)", required = true) Feed request) {

		int id = request.getId();
		String title = request.getTitle().trim();
		LocalDateTime date = request.getCreate_date();
		String store_name = request.getStore_name().trim();
		String location = request.getLocation().trim();
		Integer score = request.getScore();
		String content = request.getContent().trim();
		String user_email = request.getUser_email().trim();
		String image_src = request.getImage_src().trim();

		if (userDao.getUserByEmail(user_email) == null) {

			return makeResponse("400", null, "User Not found", HttpStatus.BAD_REQUEST);
		}

		if ("".equals(title) || "".equals(store_name) || "".equals(location) || score == null || "".equals(content)) {
			return makeResponse("400", null, "data is blank", HttpStatus.BAD_REQUEST);
		}

		feedDao.save(new Feed(id, title, date, store_name, location, score, content, user_email, null));

		return makeResponse("200", null, "success", HttpStatus.OK);

	}

	@PutMapping("/update")
	@ApiOperation(value = "게시판 수정")
	public Object update(
	@Valid @RequestBody @ApiParam(value = "게시글 정보 수정", required = true) FeedUpdateRequest request) {
		
		Feed curFeed=feedDao.getFeedById(request.getId());
		
		if(curFeed==null) {
			return makeResponse("404", null, "Feed Not Found", HttpStatus.NOT_FOUND);	
		}
		
		Integer score =request.getScore();
		String content=request.getContent().trim();
		LocalDateTime update_date=request.getUpdate_date();
		
		curFeed.setContent(content);
		curFeed.setScore(score);
		curFeed.setCreate_date(update_date);
		
		feedDao.save(curFeed);
		return makeResponse("200", null, "success", HttpStatus.OK);
		
		
		
	}
	@GetMapping("/search/{id}")
	@ApiOperation(value="id로 검색")
	public Object search(
			@Valid @ApiParam(value="id값으로 검색",required=true) @PathVariable Integer id) {
		Feed searchResult=feedDao.getFeedById(id);	
		
		if(searchResult==null) {
			return makeResponse("404", null, "No searchResult", HttpStatus.NOT_FOUND);
			
		}
		

		return makeResponse("200", convertObjToJson(searchResult), "success", HttpStatus.OK);
	
		
	}
			
	
	@DeleteMapping("/delete")
	@ApiOperation(value="회원 삭제")
	public Object delete(
			@Valid @RequestBody @ApiParam(value="게시글 삭제") FeedDeleteRequest request){
		Feed curFeed=feedDao.getFeedById(request.getId());
		if(curFeed==null) {
			return makeResponse("404", null, "Feed Not Found", HttpStatus.NOT_FOUND);	
		}
		feedDao.delete(curFeed);
		
		
		return makeResponse("200",null , "success", HttpStatus.OK);

				
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
