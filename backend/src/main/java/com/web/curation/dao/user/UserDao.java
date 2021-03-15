
package com.web.curation.dao.user;

import com.web.curation.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserDao extends JpaRepository<User, String> {
	
//	User getUserByEmail(String email);
  Optional<User> findByEmail(String email);

	User getUserByNickname(String nickname);
	String getSaltByEmail(String email);
	Optional<User> findUserByEmailAndPassword(String email, String password);

	List<User> findByNicknameContaining(String nickname);
}
