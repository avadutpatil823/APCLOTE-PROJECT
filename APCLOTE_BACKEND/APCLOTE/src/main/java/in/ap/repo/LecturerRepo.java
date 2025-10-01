package in.ap.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.ap.entity.Batch;
import in.ap.entity.Lecturer;
import in.ap.entity.User;

@Repository
public interface LecturerRepo extends JpaRepository<Lecturer, Long> {

	
	public Lecturer findByUser(User user);
	public List<Lecturer> findBySalary(Double salary);
	public List<Lecturer> findByDateOfJoining(LocalDate date);
	
	@Query("SELECT l FROM Lecturer l JOIN l.batchsAndSubjects b WHERE KEY(b) = :batchId")
    List<Lecturer> findByBatchId(@Param("batchId") Long batchId);

    @Query("SELECT l FROM Lecturer l JOIN l.batchsAndSubjects b WHERE VALUE(b) = :subjectId")
    List<Lecturer> findBySubjectId(@Param("subjectId") Long subjectId);

    @Query("SELECT l FROM Lecturer l JOIN l.batchsAndSubjects b WHERE VALUE(b) = :subjectName")
    List<Lecturer> findBySubjectName(@Param("subjectName") String subjectName);
    
    @Query("SELECT l FROM Lecturer l JOIN l.batchsAndSubjects b WHERE KEY(b) = :batchId AND VALUE(b) = :subjectId")
    List<Lecturer> findByBatchIdAndSubjectId(@Param("batchId") Long batchId, @Param("subjectId") Long subjectId);


}
