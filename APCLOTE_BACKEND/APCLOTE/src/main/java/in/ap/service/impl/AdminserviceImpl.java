package in.ap.service.impl;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import in.ap.entity.Batch;
import in.ap.entity.ClassRoom;
import in.ap.entity.Course;
import in.ap.entity.Lecturer;
import in.ap.entity.LecturerBatchSubject;
import in.ap.entity.PurchaseOrder;
import in.ap.entity.Student;
import in.ap.entity.Subject;
import in.ap.entity.SubjectList;
import in.ap.entity.User;
import in.ap.helper.EmailService;
import in.ap.helper.UserException;
import in.ap.repo.BatchRepo;
import in.ap.repo.ClassRoomRepo;
import in.ap.repo.CourseRepo;
import in.ap.repo.LecturerBatchSubjectRepo;
import in.ap.repo.LecturerRepo;
import in.ap.repo.PurchaseOrderRepo;
import in.ap.repo.StudentRepo;
import in.ap.repo.SubjectListRepo;
import in.ap.repo.SubjectRepo;
import in.ap.repo.UserRepo;
import in.ap.service.AdminService;
import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AdminserviceImpl implements AdminService {
	
	private BatchRepo batchRepo;
	private ClassRoomRepo classRoomRepo;
	private LecturerRepo lecturerRepo;
	private UserRepo userRepo;
	private CourseRepo courseRepo;
	private SubjectRepo subjectRepo;
	private EmailService emailService;
	private SubjectListRepo subjectListRepo;
	private PurchaseOrderRepo purchaseOrderRepo;
	private LecturerBatchSubjectRepo lecturerBatchSubjectRepo;
	private StudentRepo studentRepo;
	
    private final String DIR="syllabus";
	@Override
	public Batch createBatch(Batch batch) {
		
		Course course = courseRepo.findById(batch.getCourse().getId()).get();
		batch.setCourse(course);
		Batch batch1 = batchRepo.save(batch);
       batch.getCourse().getBatches().add(batch1);
       Course course1 = courseRepo.save(batch.getCourse());
       batch1.setCourse(course1);
   
		return batchRepo.save(batch);
	}

	@Override
	public Lecturer createLecurer(Lecturer lecturer,Long id,String pass) throws UserException {
		
		
		User user = userRepo.findById(id).orElseThrow();
		lecturer.setUser(user);
		Lecturer savedLecturer= lecturerRepo.save(lecturer);
		
		String subject="Lecturer Account Created – Action Required";
		String body="\r\n"
				+ "Dear ["+ savedLecturer.getUser().getName()+"],\r\n"
				+ "\r\n"
				+ "We are pleased to inform you that your Lecturer Account has been successfully created on the APCLOTE Coaching Center platform.\r\n"
				+ "\r\n"
				+ "You can use the following credentials to log in:\r\n"
				+ "\r\n"
				+ "Email (Username):"+user.getEmail()
				+ "\r\n"
				+ "Temporary Password:"+pass
				+ "\r\n"
				+ "👉 For your security, we strongly recommend that you log in at the earliest opportunity and change your password immediately after your first login.\r\n"
				+ "\r\n"
				+ "If you face any issues while accessing your account or resetting your password, please feel free to reach out to us at [support_email/contact number].\r\n"
				+ "\r\n"
				+ "We look forward to your valuable contributions to APCLOTE Coaching Center.\r\n"
				+ "\r\n"
				+ "Best regards,\r\n"
				+ "Admin Team\r\n"
				+ "APCLOTE Coaching Center";
		
		 emailService.sendEmail(user.getEmail(),subject , body);
		
		
		return savedLecturer;
	}
	
	
	public Lecturer updateLecturer(Lecturer lecturer) {
		Lecturer savedLecturer= lecturerRepo.save(lecturer);
		return savedLecturer;
	}
	
	public String deleteLecturer(Long lecturerId) {
		try {
			Lecturer lecturer = lecturerRepo.findById(lecturerId).get();
			User user = userRepo.findById(lecturer.getId()).get();
			user.setRole("ROLE_USER");
			userRepo.save(user);
			lecturerRepo.deleteById(lecturerId);
		
		return "Lecturer Deleted Successfully";
		}
		catch (Exception e) {
			e.printStackTrace();
			return "Failed To Delete";
		}
	}
	
	

	@Override
	public ClassRoom createClassroom(ClassRoom classRoom,Long BatchId) {
		 Batch batch = batchRepo.findById(BatchId).get();
		 classRoom.setBatch(batch);
		return classRoomRepo.save(classRoom);
		
	}

	@Override
	@Transactional
	public String assignBatchAndSubjects(Long batchId, Long subjectId, Long lecturerId) {
	    try {
	        // Fetch entities
	        Batch batch = batchRepo.findById(batchId)
	                .orElseThrow(() -> new RuntimeException("Batch not found with id: " + batchId));
	        Subject subjecttt = subjectRepo.findById(subjectId)
	                .orElseThrow(() -> new RuntimeException("Subject not found with id: " + subjectId));
	        Lecturer lecturer = lecturerRepo.findById(lecturerId)
	                .orElseThrow(() -> new RuntimeException("Lecturer not found with id: " + lecturerId));

	        SubjectList subject = subjectListRepo.findByName(subjecttt.getName());
	        // Check if this assignment already exists
	        boolean exists = lecturerBatchSubjectRepo
	                .existsByBatchIdAndSubjectIdAndLecturerId(batchId, subjectId, lecturerId);

	        if (exists) {
	            return "This Lecturer is already assigned to this Batch and Subject";
	        }

	        // Create and save new LecturerBatchSubject record
	        LecturerBatchSubject lbs = new LecturerBatchSubject();
	        lbs.setBatch(batch);
	        lbs.setSubject(subject);
	        lbs.setLecturer(lecturer);
	        lecturerBatchSubjectRepo.save(lbs);

	        // Update bidirectional relationships
	        batch.getLecturers().add(lecturer);
	        lecturer.getBatches().add(batch);

	        // No need to call save(batch) or save(lecturer) explicitly 
	        // if CascadeType is set on the relationship (otherwise keep them)
	        batchRepo.save(batch);
	        lecturerRepo.save(lecturer);

	        return "Batch and Subject assigned successfully";

	    } catch (Exception e) {
	        e.printStackTrace();
	        return "Failed to assign Batch and Subject: " + e.getMessage();
	    }
	}


	@Override
	public Course addCourse(Course course,MultipartFile file){
		    
               File file1 = new File(DIR);
               if (!file1.exists()) {
            	   file1.mkdir();
               }
               
            String filename = file.getOriginalFilename();
            String cleanFileName = org.springframework.util.StringUtils.cleanPath(filename);
            String cleanDir = org.springframework.util.StringUtils.cleanPath(DIR);
            Path path = Paths.get(cleanDir, cleanFileName);
            
            InputStream fis;
			try {
				fis = file.getInputStream();
				 Files.copy(fis, path, StandardCopyOption.REPLACE_EXISTING);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
           course.setSyllabusFilePath(path.toString());
		
		Course course2 = courseRepo.save(course);
		return course2;
		
	}
	@Override
	public SubjectList addSubject(SubjectList subjectList){
		return subjectListRepo.save(subjectList);
	}
	
	@Override
	public Subject getSubjectByName(String name) {
		return subjectRepo.findByName(name);
	}
	@Override
	public List<SubjectList> findSubjectByIds(List<Long> ids){
		 List<SubjectList> allById = subjectListRepo.findAllById(ids);
		 return allById;
	}
	
	@Override
	public List<SubjectList> getAllSubjects(){
		 List<SubjectList> subs = subjectListRepo.findAll();
		 return subs;
	}
	
	public Page<Lecturer> getAllLecturers(int pageNumber,int pageSize){
		PageRequest page = PageRequest.of(pageNumber, pageSize);
		Page<Lecturer> lecturers = lecturerRepo.findAll(page);
		return lecturers;
	}
	
	public Page<Lecturer> searchLecturer(@RequestParam("key") String keyword,int pagenumber,int pageSize){
		 PageRequest page = PageRequest.of(pagenumber, pageSize);
		Page<Lecturer> lecturers;
		 if (keyword == null || keyword.trim().isEmpty()) {
			 lecturers= lecturerRepo.findAll(page);
	        }
		 else {
			
			 lecturers=lecturerRepo.findByUser_NameContainingIgnoreCase(keyword, page);
	        
		 }
		  
		 return lecturers;
	    }
	
	public Page<Student> searchStudents(@RequestParam("key") String keyword,int pagenumber,int pageSize){
		 PageRequest page = PageRequest.of(pagenumber, pageSize);
		Page<Student> students;
		 if (keyword == null || keyword.trim().isEmpty()) {
			 students=studentRepo.findAll(page);
	        }
		 else {
			
			 students=studentRepo.findByUser_NameContainingIgnoreCase(keyword, page);
	        
		 }
		  
		 return students;
	    }
	
	
	public List<Lecturer> getBatchLecturer(@RequestParam Long batchId){
		  List<Lecturer> lecturers = lecturerRepo.findByBatchId(batchId);
		  return lecturers;
	}
	
	@Override
	public List<PurchaseOrder> getAllPos(){
	
		List<PurchaseOrder> pos = purchaseOrderRepo.findAll( Sort.by(Sort.Direction.DESC, "batch.startDate"));
		return pos;
	}
	
	
	public Page<Student> getStudents(int pageNumber,int pageSize){
		
		   PageRequest page = PageRequest.of(pageNumber, pageSize);
		   Page<Student> stds = studentRepo.findAll(page);
		   return stds;
	}
	
	
	
	
	
	
	
	
	
	public List<Course> getAllCourses(){
		return courseRepo.findAll(); 
	}

}
