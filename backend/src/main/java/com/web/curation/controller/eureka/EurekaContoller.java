package com.web.curation.controller.eureka;

import com.web.curation.dao.eureka.EurekaDao;
import com.web.curation.dao.feed.FeedDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.eureka.CreateEurekaRequest;
import com.web.curation.model.eureka.Eureka;
import com.web.curation.model.eureka.FindNearEurekaRequest;
import com.web.curation.model.eureka.UpdateEurekaRequest;
import com.web.curation.model.feed.Feed;
import com.web.curation.model.feed.UpdateFeedRequest;
import com.web.curation.model.user.User;
import com.web.curation.service.eureka.EurekaService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.web.curation.utils.HttpUtils.convertObjToJson;
import static com.web.curation.utils.HttpUtils.makeResponse;

@CrossOrigin(origins = { "http://localhost:3000", "https://i4b101.p.ssafy.io" })
@RestController
@RequestMapping("/eureka")
public class EurekaContoller {

    @Autowired
    private EurekaDao eurekaDao;
    @Autowired
    private UserDao userDao;
    @Autowired
    private EurekaService eurekaService;

    @PostMapping
    @ApiOperation(value = "유레카 등록")
    public ResponseEntity<?> create(@RequestBody @ApiParam(value = "유레카 등록 시 필요한 정보(메시지, 작성자, y, x)", required = true) CreateEurekaRequest request) {
        String message = request.getMessage();
        String userEmail = request.getUserEmail();
        Double lat = request.getLat();
        Double lon = request.getLon();

        Optional<User> curUser = userDao.findById(userEmail);

        if (!curUser.isPresent()) {
            return makeResponse("400", null, "User Not found", HttpStatus.BAD_REQUEST);
        }

        if ("".equals(message) || "".equals(userEmail)) {
            return makeResponse("400", null, "data is blank", HttpStatus.BAD_REQUEST);
        }

        Eureka eureka = Eureka.builder()
                .message(message)
                .user(curUser.get())
                .lat(lat)
                .lon(lon)
                .build();

        Eureka saevdEureka = eurekaDao.save(eureka);

        return makeResponse("200", convertObjToJson(saevdEureka), "success", HttpStatus.OK);
    }

    @PutMapping
    @ApiOperation(value = "유레카 수정")
    public Object update(
            @Valid @RequestBody @ApiParam(value = "게시글 정보 수정", required = true) UpdateEurekaRequest request) {
        Optional<Eureka> curEureka = eurekaDao.findById(request.getId());

        if (!curEureka.isPresent()) {
            return makeResponse("404", null, "Eureka Not Found", HttpStatus.NOT_FOUND);
        }

        Eureka updatedEureka = curEureka.get();

        updatedEureka.setMessage(request.getMessage().trim());
        eurekaDao.save(updatedEureka);
        return makeResponse("200", convertObjToJson(updatedEureka), "success", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "단일 유레카 조회")
    public Object searchById(@Valid @ApiParam(value = "id 값으로 검색", required = true) @PathVariable String id) {
        Optional<Eureka> curEureka = eurekaDao.findById(Long.parseLong(id));

        if (!curEureka.isPresent()) {
            return makeResponse("404", null, "No searchResult", HttpStatus.NOT_FOUND);
        }

        return makeResponse("200", convertObjToJson(curEureka.get()), "success", HttpStatus.OK);
    }

    @GetMapping("/list")
    @ApiOperation(value = "모든 유저의 유레카 리스트 조회")
    public Object getAllEureka() {
//		TODO::로그인 되어있는지 확인하는 로직 필요.
        List<Eureka> searchlist = eurekaDao.findAll();

        return makeResponse("200", convertObjToJson(searchlist), "success" + searchlist.size(), HttpStatus.OK);
    }

    @GetMapping("/near")
    @ApiOperation(value = "거리 기반으로 유레카 리스트 조회")
    public Object getNearEureka(
            @Valid @ModelAttribute @ApiParam(value = "거리 기반 유레카 찾기 위한 정보", required = true) FindNearEurekaRequest request) {
//		TODO::로그인 되어있는지 확인하는 로직 필요.

        List<Eureka> searchList = eurekaDao.findAll();
        List<Eureka> resultList = eurekaService.getNearEurekaList(searchList, request);

        return makeResponse("200", convertObjToJson(resultList), "success" + resultList.size(), HttpStatus.OK);
    }

    @GetMapping("/list/{email}")
    @ApiOperation(value = "한 유저의 유레카 리스트 조회")
    public Object getEurekasByUser(@Valid @ApiParam(value = "email 값으로 검색 ", required = true) @PathVariable String email) {
        Optional<User> curUser = userDao.findById(email);

        if (!curUser.isPresent()) {
            return makeResponse("404", null, "User Not Found", HttpStatus.NOT_FOUND);
        }

        List<Eureka> searchlist = eurekaDao.findByUser(curUser.get());

        return makeResponse("200", convertObjToJson(searchlist), "success" + searchlist.size(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @ApiOperation(value = "유레카 삭제")
    public Object delete(@Valid @ApiParam(value = "id 값으로 피드 삭제", required = true) @PathVariable String id) {
        Optional<Eureka> curEureka = eurekaDao.findById(Long.parseLong(id));

        if (!curEureka.isPresent()) {
            return makeResponse("404", null, "Eureka Not Found", HttpStatus.NOT_FOUND);
        }
        eurekaDao.delete(curEureka.get());

        return makeResponse("200", convertObjToJson(curEureka.get()), "success", HttpStatus.OK);
    }
}
