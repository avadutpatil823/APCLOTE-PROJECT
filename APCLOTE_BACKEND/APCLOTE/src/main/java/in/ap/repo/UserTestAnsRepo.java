package in.ap.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ap.entity.Test;
import in.ap.entity.User;
import in.ap.entity.UserTestAnswer;

@Repository
public interface UserTestAnsRepo extends JpaRepository<UserTestAnswer, Long> {

	public List<UserTestAnswer> findByUserAndTest(Test test,User user);
	
	public List<UserTestAnswer> findByUser(User user);
	
}
