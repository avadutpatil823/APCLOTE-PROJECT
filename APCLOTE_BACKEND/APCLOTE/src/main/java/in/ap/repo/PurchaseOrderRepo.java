package in.ap.repo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.ap.entity.Batch;
import in.ap.entity.PurchaseOrder;
import in.ap.entity.User;

@Repository
public interface PurchaseOrderRepo extends JpaRepository<PurchaseOrder, Long> {

	public PurchaseOrder findByUser(User user);
	public List<PurchaseOrder> findByBatch(Batch batch);
	public List<PurchaseOrder> findByStatus(String status);
	public List<PurchaseOrder> findByPurchaseDate(LocalDate date);
}
