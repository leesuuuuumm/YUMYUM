package com.web.curation.model.feed;

import com.web.curation.model.TimeEntity;
import com.web.curation.model.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "likes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Like extends TimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "USER_EMAIL")
    private User user;

    @ManyToOne
    @JoinColumn(name = "FEED_ID")
    private Feed feed;
}
