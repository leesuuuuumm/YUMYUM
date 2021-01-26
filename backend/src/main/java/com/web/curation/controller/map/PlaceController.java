package com.web.curation.controller.map;

import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.map.PlaceDao;
import com.web.curation.model.map.Place;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.web.curation.utils.HttpUtils.convertObjToJson;
import static com.web.curation.utils.HttpUtils.makeResponse;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/place")
public class PlaceController {
	@Autowired
	private FeedDao feedDao;
	@Autowired
	private PlaceDao placeDao;

	@PostMapping
	@ApiOperation(value = "place 저장")
	public Object save(@RequestBody @ApiParam(value = "place에 저장할 정보", required = true) Place request) {
		Long id = request.getId();

		if (placeDao.findById(id).isPresent()) {
			return makeResponse("400", null, "this place already exists", HttpStatus.BAD_REQUEST);
		}
		
		Place place=Place.builder()
				.id(id)
				.addressName(request.getAddressName().trim())
				.phone(request.getPhone().trim())
				.placeName(request.getPlaceName())
				.x(request.getX())
				.y(request.getY())
				.build();
		
		Place savedPlace=placeDao.save(place);
		
		return makeResponse("200", convertObjToJson(savedPlace), "success", HttpStatus.OK);
	}

	@GetMapping("/list")
	@ApiOperation(value = "모든 place 반환 ")
	public Object placesList() {
//		List<Feed> feeds = feedDao.findAll();
//		List<Feed> resultFeeds = new ArrayList<>();
//		Set<Long> set = new TreeSet<Long>();
//		for (int i = 0; i < feeds.size(); ++i) {
//			Long placeId = feeds.get(i).getPlaceInfo().getId();
//			if (set.contains(placeId))
//				continue;
//			set.add(placeId);
//			resultFeeds.add(feeds.get(i));
//		}

		List<Place> places = placeDao.findAll();

//		System.out.println(resultFeeds);
		return makeResponse("200", convertObjToJson(places), "success", HttpStatus.OK);
	}
}
