// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.web.curation.model.user;

import com.web.curation.model.TimeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
//Json 형식으로 데이터를 주고받을 때 jackson의 ObjectMapper를 자주 이용한다.
//JsonInclude는 Json 형식의 데이터를 어떻게 만들지를 정하는 Annotation이다.
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User extends TimeEntity {
  @Id
  @Column(name="USER_EMAIL")
  private String email;

  @JsonIgnore
  private String password;
  private String nickname;

  @Column(length=50)
  private String introduction;

  private Integer thumbnail;

  private Double recentY;
  private Double recentX;
}