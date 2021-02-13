package com.web.curation.service.place;

import com.web.curation.dao.map.PlaceDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.feed.Feed;
import com.web.curation.model.map.Place;
import com.web.curation.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaceService {
    @Autowired
    private PlaceDao placeDao;
    public Place buildPlace(Place request) {
        return Place.builder()
                .id(request.getId())
                .addressName(request.getAddressName().trim())
                .phone(request.getPhone().trim())
                .placeName(request.getPlaceName())
                .x(request.getX())
                .y(request.getY())
                .build();
    }
}
