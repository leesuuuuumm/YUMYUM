// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.web.curation.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
//Json 형식으로 데이터를 주고받을 때 jackson의 ObjectMapper를 자주 이용한다.
//JsonInclude는 Json 형식의 데이터를 어떻게 만들지를 정하는 Annotation이다.
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
  @Column(name="USER_EMAIL")
    private String email;

	@JsonIgnore
    private String password;
    private String nickname;

   
    @Column(length=50)
    private String introduction;

    @CreationTimestamp
    private LocalDateTime createDate;
    


}