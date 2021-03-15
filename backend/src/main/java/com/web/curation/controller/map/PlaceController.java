package com.web.curation.controller.map;

import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.map.PlaceDao;
import com.web.curation.model.feed.Feed;
import com.web.curation.model.map.Place;
import com.web.curation.service.place.PlaceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

import static com.web.curation.utils.HttpUtils.convertObjToJson;
import static com.web.curation.utils.HttpUtils.makeResponse;

@CrossOrigin(origins = { "http://localhost:3000", "https://i4b101.p.ssafy.io" })
@RestController
@RequestMapping("/place")
public class PlaceController {
	@Autowired
	private FeedDao feedDao;
	@Autowired
	private PlaceDao placeDao;
	@Autowired
	private PlaceService placeService;

	@PostMapping
	@ApiOperation(value = "place 저장")
	public Object save(@RequestBody @ApiParam(value = "place에 저장할 정보", required = true) Place request) {
		Long id = request.getId();
		Optional<Place> placeOptional = placeDao.findById(id);
		if (placeOptional.isPresent()) {
			return makeResponse("200", convertObjToJson(placeOptional.get()), "this place already exists",
					HttpStatus.OK);
		}

		Place place = placeService.buildPlace(request);

		Place savedPlace = placeDao.save(place);

		return makeResponse("200", convertObjToJson(savedPlace), "success", HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@ApiOperation(value = "id로 place,feed 전체 불러오기")
	public Object searchIdPlaceFeed(@Valid @ApiParam(value = "id 값으로 검색 ", required = true) @PathVariable String id) {
		Optional<Place> curPlace = placeDao.findById(Long.parseLong(id));
		if (!curPlace.isPresent()) {
			return makeResponse("404", null, "No searchResult", HttpStatus.NOT_FOUND);
		}

		List<Feed> searchList = feedDao.findByPlace(curPlace.get());
		return makeResponse("200", convertObjToJson(searchList), "success", HttpStatus.OK);

	}

	@GetMapping("/list")
	@ApiOperation(value = "모든 place 반환 ")
	public Object placesList() {
		List<Place> places = placeDao.findAll();

		return makeResponse("200", convertObjToJson(places), "success", HttpStatus.OK);
	}
}
