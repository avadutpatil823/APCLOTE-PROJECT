package in.ap.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import in.ap.entity.BatchLecturerSubjectInter;
import in.ap.entity.Lecturer;
import in.ap.entity.LecturerBatchSubject;
@Repository
public interface LecturerBatchSubjectRepo extends JpaRepository<LecturerBatchSubject, Long> {

	 @Query("SELECT lbs.lecturer FROM LecturerBatchSubject lbs WHERE lbs.subject.id = :subjectId")
	    List<Lecturer> findLecturersBySubjectId(@Param("subjectId") Long subjectId);

	    // Find all lecturers by subject name
	    @Query("SELECT lbs.lecturer FROM LecturerBatchSubject lbs WHERE lbs.subject.name = :subjectName")
	    List<Lecturer> findLecturersBySubjectName(@Param("subjectName") String subjectName);

	    // Optional: by batch + subject
	    @Query("SELECT lbs.lecturer FROM LecturerBatchSubject lbs " +
	           "WHERE lbs.batch.id = :batchId AND lbs.subject.id = :subjectId")
	    List<Lecturer> findLecturersByBatchAndSubject(@Param("batchId") Long batchId,
	                                                  @Param("subjectId") Long subjectId);
	    
	    boolean existsByBatchIdAndSubjectIdAndLecturerId(Long batchId, Long subjectId, Long lecturerId);
      List<LecturerBatchSubject> findByLecturer(Lecturer lecturer);
      
      @Query("SELECT l.batch.id AS batchId, l.subject AS subject " +
    	       "FROM LecturerBatchSubject l " +
    	       "WHERE l.lecturer.id = :lecturerId")
    	List<BatchLecturerSubjectInter> findByLecturerId(@Param("lecturerId") Long lecturerId);
}
