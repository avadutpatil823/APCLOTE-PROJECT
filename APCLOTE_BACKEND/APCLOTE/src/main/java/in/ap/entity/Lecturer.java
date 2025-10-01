package in.ap.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Lecturer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@OneToOne
	private User user;
	
	@ElementCollection
    @CollectionTable(name = "lecturer_batch_subjects",joinColumns =@JoinColumn(name = "lecturer_id") )
    @MapKeyColumn(name = "batch_name")
    @Column(name = "subject_name")
    private Map<String, String> batchsAndSubjects = new HashMap<>();
	private Double salary;
	private LocalDate dateOfJoining;
	

	@JoinTable(
		    name = "batch_lecturers",
		    joinColumns = @JoinColumn(name = "lecturer_id"),
		    inverseJoinColumns = @JoinColumn(name = "batch_id")
		)
	@JsonIgnore
	@ManyToMany
	private List<Batch> batches = new ArrayList<>();

}
