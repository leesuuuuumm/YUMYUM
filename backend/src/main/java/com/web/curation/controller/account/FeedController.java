package com.web.curation.controller.account;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dao.user.FeedDao;
import com.web.curation.model.user.Feed;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/feed")
public class FeedController {

	@Autowired
	private FeedDao feedDao;

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
		int score=request.getScore();
		String content=request.getContent().trim();
	
		
		return request;

	}

}
