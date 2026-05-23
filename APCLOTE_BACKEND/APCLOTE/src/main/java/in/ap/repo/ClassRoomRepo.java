package in.ap.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ap.entity.Batch;
import in.ap.entity.ClassRoom;

@Repository
public interface ClassRoomRepo extends JpaRepository<ClassRoom, Long> {

	ClassRoom findByName(String name);
	ClassRoom findByBatch(Batch b);
}
