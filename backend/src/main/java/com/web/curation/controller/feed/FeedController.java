package com.web.curation.controller.feed;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import com.web.curation.dao.feed.LikeDao;
import com.web.curation.model.feed.*;
import com.web.curation.model.user.User;
import com.web.curation.model.map.Place;
import com.web.curation.service.feed.FeedService;
import com.web.curation.service.feed.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.map.PlaceDao;
import com.web.curation.dao.user.UserDao;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.web.multipart.MultipartFile;

import javax.security.auth.message.callback.PrivateKeyCallback.Request;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import static com.web.curation.utils.HttpUtils.convertObjToJson;
import static com.web.curation.utils.HttpUtils.makeResponse;

@CrossOrigin(origins = { "http://localhost:3000", "https://i4b101.p.ssafy.io" })
@RestController
@RequestMapping("/feed")
public class FeedController {

	@Autowired
	private FeedDao feedDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private FileService fileService;
	@Autowired
	private FeedService feedService;
	@Autowired
	private PlaceDao placeDao;
	@Autowired
	private LikeDao likeDao;

	@PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE })
	@ApiOperation(value = "피드 등록")
	public ResponseEntity<?> create(
			@ModelAttribute @ApiParam(value = "게시글 등록 시 필요한 정보 (음식명 , 날짜 , 식당이름, 장소 , 점수 , 내용)", required = true) CreateFeedRequest request,
			@RequestParam("file") @Valid @NotNull @NotEmpty MultipartFile mFile) {
		String title = request.getTitle().trim();
		Integer score = request.getScore();
		String content = request.getContent().trim();
		String userEmail = request.getUserEmail().trim();

		Optional<User> curUser = userDao.findById(userEmail);
		Optional<Place> curPlace = placeDao.findById(request.getPlaceId());

		ResponseEntity<?> result = feedService.checkBlankWhenCreateFeed(curUser, curPlace, title, content, score);
		if (result != null) {
			return result;
		}

		List<String> urls = fileService.upload(mFile);

		Place savedPlace = placeDao.save(curPlace.get());

		Feed feed = feedService.buildFeed(title, score, content, curUser.get(), urls, savedPlace);

		Feed savedFeed = feedDao.save(feed);

		return makeResponse("200", convertObjToJson(savedFeed), "success", HttpStatus.OK);
	}

	@PostMapping(value = "/video", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	@ApiOperation(value = "동영상 등록")
	public Object uploadVideo(@RequestParam(value = "file", required = false) MultipartFile multipartFile) {
		List<String> urls = fileService.upload(multipartFile);

		return makeResponse("200", urls.get(0) + " / " + urls.get(1), "success", HttpStatus.OK);
	}

	@PutMapping
	@ApiOperation(value = "피드 수정")
	public Object update(@Valid @RequestBody @ApiParam(value = "게시글 정보 수정", required = true) UpdateFeedRequest request) {

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
	public Object searchId(@Valid @ApiParam(value = "id 값으로 검색", required = true) @PathVariable String id) {
		Optional<Feed> curFeed = feedDao.findById(Long.parseLong(id));

		if (!curFeed.isPresent()) {
			return makeResponse("404", null, "No searchResult", HttpStatus.NOT_FOUND);
		}

		return makeResponse("200", convertObjToJson(curFeed.get()), "success", HttpStatus.OK);
	}

	@GetMapping("/list")
	@ApiOperation(value = "모든 유저의 피드 리스트 조회")
	public Object feedList() {
		List<Feed> searchlist = feedDao.findAll();

		return makeResponse("200", convertObjToJson(searchlist), "success" + searchlist.size(), HttpStatus.OK);
	}

	@GetMapping("/list/{email}")
	@ApiOperation(value = "한 유저의 피드 리스트 조회")
	public Object feedList(@Valid @ApiParam(value = "email 값으로 검색 ", required = true) @PathVariable String email) {
		Optional<User> curUser = userDao.findById(email);

		if (!curUser.isPresent()) {
			return makeResponse("404", null, "User Not Found", HttpStatus.NOT_FOUND);
		}

		List<Feed> searchlist = feedDao.findAllByUserOrderByIdDesc(curUser.get());

		return makeResponse("200", convertObjToJson(searchlist), "success" + searchlist.size(), HttpStatus.OK);
	}

	@GetMapping("/titles/{email}")
	@ApiOperation(value = "한 유저의 피드 타이틀 리스트 조회")
	public Object titleList(
			@Valid @RequestBody @ApiParam(value = "title 별로 전체 조회", required = true) @PathVariable String email) {
		Optional<User> curUser = userDao.findById(email);

		if (!curUser.isPresent()) {
			return makeResponse("404", null, "User Not Found", HttpStatus.NOT_FOUND);
		}

		List<ArrayList<String>> titleList = feedDao.findByUser_email(email);

		return makeResponse("200", convertObjToJson(titleList), "success" + titleList.size(), HttpStatus.OK);
	}

	@GetMapping("/list/{email}/{title}/")
	@ApiOperation(value = "한 유저의 하나의 title로 적힌 피드 리스트 조회")
	public Object titleList(@Valid @ApiParam(value = "title 별로 전체 조회", required = true) @PathVariable String title,
							@PathVariable String email) {
		Optional<User> curUser = userDao.findById(email);

		if (!curUser.isPresent()) {
			return makeResponse("404", null, "User Not Found", HttpStatus.NOT_FOUND);
		}

		List<Feed> feedList = feedDao.findAllByTitleAndUser_email(title, email);

		return makeResponse("200", convertObjToJson(feedList), "success" + feedList.size(), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	@ApiOperation(value = "피드 삭제")
	public Object delete(@Valid @ApiParam(value = "id 값으로 피드 삭제", required = true) @PathVariable String id) {
		Optional<Feed> curFeed = feedDao.findById(Long.parseLong(id));

		if (!curFeed.isPresent()) {
			return makeResponse("404", null, "Feed Not Found", HttpStatus.NOT_FOUND);
		}
		feedDao.delete(curFeed.get());

		return makeResponse("200", convertObjToJson(curFeed.get()), "success", HttpStatus.OK);
	}

	@PutMapping("/like/{feed_id}")
	@ApiOperation(value = "피드 좋아요")
	public Object update(@Valid @ApiParam(value = "feed_id 값으로 피드 좋아요 반영", required = true) @PathVariable String feed_id,
						 @Valid @RequestBody @ApiParam(value = "게시글 정보 수정", required = true) LikeFeedRequest request) {
		String userEmail = request.getEmail();
		Long feedId = Long.parseLong(feed_id);
		List<Like> curLike = likeDao.findByUser_EmailAndFeed_Id(userEmail, feedId);

		boolean isCurLike = curLike.size() > 0;

		Feed curFeed = feedDao.findById(feedId).get();
		User curUser = userDao.findById(userEmail).get();
		int likeCount = curFeed.getLikeCount();

		if (!isCurLike) {
			Like newLike = feedService.buildLike(curFeed, curUser);
			likeDao.save(newLike);
			likeCount += 1;
		} else {
			likeDao.delete(curLike.get(0));
			likeCount -= 1;
		}

		curFeed.setLikeCount(likeCount);
		feedDao.save(curFeed);

		LikeFeedResponse response = LikeFeedResponse.builder()
				.isLike(!isCurLike)
				.like_count(likeCount)
				.build();

		return makeResponse("200", convertObjToJson(response), "success", HttpStatus.OK);
	}
}
