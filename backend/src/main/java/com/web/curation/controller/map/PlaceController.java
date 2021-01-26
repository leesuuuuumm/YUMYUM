package com.web.curation.controller.map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.map.PlaceDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.BasicResponse;
import com.web.curation.moder.map.Place;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "http://localhost:3000" })
@RestController
@RequestMapping("/place")
public class PlaceController {
	@Autowired
	private FeedDao feedDao;
	@Autowired
	private PlaceDao placeDao;

	private ObjectMapper objectMapper = new ObjectMapper();

	@PostMapping
	@ApiOperation(value = "place 저장")
	public Object placeSave(@RequestBody @ApiParam(value = "place에 저장할 정보", required = true) Place request) {

		Long id = request.getId();
		String addressName = request.getAddressName().trim();
		String categoryGroupCode = request.getCategoryGroupCode().trim();
		String categroyGroupName = request.getCategoryName().trim();
		String categoryName = request.getCategoryName().trim();
		Long distance = request.getDistance();
		String phone = request.getPhone().trim();
		String placeName = request.getPlaceName();
		double x = request.getX();
		double y = request.getY();
		
		Place place=Place.builder().id(id).addressName(addressName).categoryGroupCode(categoryGroupCode).categroyGroupName(categroyGroupName)
				.categoryName(categoryName).distance(distance).phone(phone).placeName(placeName)
				.x(x).y(y).build();
		
		Place savedPlace=placeDao.save(place);

		
		return makeResponse("200", convertObjToJson(savedPlace), "success", HttpStatus.OK);

	}
	private ResponseEntity<BasicResponse> makeResponse(String status, String data, String message,
			HttpStatus httpStatus) {
		BasicResponse result = BasicResponse.builder().status(status).message(message).data(data).build();
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
