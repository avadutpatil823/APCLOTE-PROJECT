package in.ap.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ap.entity.Batch;
import in.ap.entity.PurchaseOrder;
import in.ap.entity.Student;
import in.ap.entity.User;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {

	Student findByUser(User user);
	List<Student> findByBatchs(List<Batch> batchs);
	Student findByPurchaseOrder(PurchaseOrder porder);

	
}
