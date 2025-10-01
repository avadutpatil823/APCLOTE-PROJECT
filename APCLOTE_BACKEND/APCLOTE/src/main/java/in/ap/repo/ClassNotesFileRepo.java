package in.ap.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ap.entity.ClassNotesFile;
@Repository
public interface ClassNotesFileRepo extends JpaRepository<ClassNotesFile, Long>{

}
