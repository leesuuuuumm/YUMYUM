package com.web.curation.service.feed;

import com.web.curation.dao.feed.LikeDao;
import com.web.curation.dao.user.UserDao;
import com.web.curation.model.feed.Feed;
import com.web.curation.model.feed.Like;
import com.web.curation.model.map.Place;
import com.web.curation.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.web.curation.utils.HttpUtils.makeResponse;

@Service
public class FeedService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private LikeDao likeDao;

    public ResponseEntity<?> checkBlankWhenCreateFeed(Optional<User> user, Optional<Place> place, String title, String content, Integer score) {
        if (!user.isPresent()) {
            return makeResponse("400", null, "User Not found", HttpStatus.BAD_REQUEST);
        }

        if (!place.isPresent()) {
            return makeResponse("400", null, "Place Not found", HttpStatus.BAD_REQUEST);
        }

        if ("".equals(title) || "".equals(place.get().getAddressName()) || "".equals(place.get().getPlaceName())
                || score == null || "".equals(content)) {
            return makeResponse("400", null, "data is blank", HttpStatus.BAD_REQUEST);
        }

        return null;
    }

    public Feed buildFeed(String title, Integer score, String content, User user, String videoUrl, Place place) {
        return Feed.builder()
                .title(title)
                .score(score)
                .content(content)
                .user(user)
                .videoPath(videoUrl)
                .likeCount(0)
                .place(place).build();
    }

    public Like buildLike(Feed feed, User user) {
        return Like.builder()
                .feed(feed)
                .user(user)
                .build();
    }

    public boolean isLikeFeedOfUser(String userEmail, Feed feed) {
        return !likeDao.findByUser_EmailAndFeed_Id(userEmail, feed.getId()).isEmpty();
    }
}
