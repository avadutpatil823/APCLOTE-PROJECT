package in.ap.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ap.entity.Question;

@Repository
public interface QuestionRepo extends JpaRepository<Question, Long> {

}
