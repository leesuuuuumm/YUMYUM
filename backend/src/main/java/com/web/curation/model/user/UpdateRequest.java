package com.web.curation.model.user;


import lombok.*;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateRequest {
    String introduction;
    String nickname;
}
