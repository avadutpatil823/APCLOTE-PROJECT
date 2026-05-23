package in.ap.restController;

import java.awt.PageAttributes.MediaType;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.introspect.TypeResolutionContext.Empty;

import in.ap.entity.Batch;
import in.ap.entity.ClassRoom;
import in.ap.entity.Course;
import in.ap.entity.Lecturer;
import in.ap.entity.PurchaseOrder;
import in.ap.entity.Student;
import in.ap.entity.Subject;
import in.ap.entity.SubjectList;
import in.ap.entity.User;
import in.ap.helper.UserException;
import in.ap.repo.BatchRepo;
import in.ap.repo.CourseRepo;
import in.ap.repo.SubjectRepo;
import in.ap.service.AdminService;
import in.ap.service.LecturerService;
import in.ap.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {

	
	private AdminService adminService;
	private LecturerService lecturerService;
	private UserService userService;
	private SubjectRepo subjectRepo;

	
	
	@PostMapping(value="/createBatch", consumes = org.springframework.http.MediaType.APPLICATION_JSON_VALUE,
	        produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Batch> createbatch(@RequestBody Batch batch) {
		System.out.println(batch.toString());
		Batch savedBatch = adminService.createBatch(batch);
		return new ResponseEntity(savedBatch, HttpStatus.CREATED);	
	}
	
	@PostMapping(value="/createLecturer", consumes = "application/json")
	public ResponseEntity<Lecturer> createLecturer(@RequestBody Lecturer lecturer,@RequestParam("userId")Long userId,@RequestParam("sender")String senderKey) throws UserException{
		Lecturer lecturer1 = adminService.createLecurer(lecturer, userId,senderKey);
		return new ResponseEntity<Lecturer>(lecturer1, HttpStatus.CREATED);
	}
	
	@PostMapping(value="/updateLecturer", consumes = "application/json")
	public ResponseEntity<Lecturer> updateLecturer(@RequestBody Lecturer lecturer) throws UserException{
		Lecturer lecturer1 = adminService.updateLecturer(lecturer);
		return new ResponseEntity<Lecturer>(lecturer1, HttpStatus.CREATED);
	}
	
	@GetMapping(value="/deleteLecturer")
	public ResponseEntity<String> deleteLecturer(@RequestParam("lecturerId")Long lecturerId) throws UserException{
		String msg = adminService.deleteLecturer(lecturerId);
		return new ResponseEntity<String>(msg, HttpStatus.CREATED);
	}
	
	
	
	@GetMapping("/assign")
	private ResponseEntity<String> assignsBatchandSubjectToLecturer(@RequestParam("batchId")Long batchId,
			@RequestParam("subjectId")Long subjectId,@RequestParam("lecturerId")Long lecturerId){
		System.out.println(batchId+"====="+subjectId+"====="+lecturerId);
		String msg = adminService.assignBatchAndSubjects(batchId, subjectId, lecturerId);
		return new ResponseEntity<String>(msg, HttpStatus.OK);
	}
	
	@GetMapping("/getAllLecturers")
	public ResponseEntity<Page<Lecturer>> getAllLecturers(@RequestParam int pageNumber,@RequestParam int pageSize){
		Page<Lecturer> alllecturers = adminService.getAllLecturers(pageNumber-1, pageSize);
		
			
		
		return new ResponseEntity<Page<Lecturer>>(alllecturers, HttpStatus.OK);
	}
	
	@GetMapping("/getSearchLecturers")
	public ResponseEntity<Page<Lecturer>> serachedLecturers(@RequestParam int pageNumber,@RequestParam int pageSize,@RequestParam String key){
		
		Page<Lecturer> alllecturers = adminService.searchLecturer(key,pageNumber-1, pageSize);
		return new ResponseEntity<Page<Lecturer>>(alllecturers, HttpStatus.OK);
	}
	
	@GetMapping("/getBatchLecturers")
	public ResponseEntity<List<Lecturer>> batchLecturers(@RequestParam Long batchId){
		
		List<Lecturer> alllecturers = adminService.getBatchLecturer(batchId);
		return new ResponseEntity<List<Lecturer>>(alllecturers, HttpStatus.OK);
	}
	
	@GetMapping("/getStudents")
	public ResponseEntity<Page<Student>> getStudents(@RequestParam int pageNumber,@RequestParam int pageSize){
		
		Page<Student> stds = adminService.getStudents(pageNumber-1, pageSize);
		List<Student> updatedStudents=new ArrayList<>();
		for (Student student : stds.getContent()) {
			
			student.setBatchs(null);
			student.setPurchaseOrder(null);
			updatedStudents.add(student);
		}
		   Page secureStudents = new PageImpl(
			        updatedStudents,
			        stds.getPageable(),
			        stds.getTotalElements()
			    );
		return new ResponseEntity<Page<Student>>(secureStudents, HttpStatus.OK);
	}
	
	@GetMapping("/getSearchedStudents")
	public ResponseEntity<Page<Student>> getStudents(@RequestParam int pageNumber,@RequestParam int pageSize,@RequestParam String key){
		
		Page<Student> stds = adminService.searchStudents(key,pageNumber-1, pageSize);
		List<Student> updatedStudents=new ArrayList<>();
		for (Student student : stds.getContent()) {
			
			student.setBatchs(null);
			student.setPurchaseOrder(null);
			updatedStudents.add(student);
		}
		   Page secureStudents = new PageImpl( updatedStudents, stds.getPageable(), stds.getTotalElements() );
		return new ResponseEntity<Page<Student>>(secureStudents, HttpStatus.OK);
	}
	
	@GetMapping("/getAllUsers")
	public ResponseEntity<List<User>> getAllUsers(){
		return new ResponseEntity<List<User>>(userService.getAllUsers(), HttpStatus.OK);
	}
	
	@GetMapping("/getAllCourses")
	public ResponseEntity<List<Course>> getAllCourses(){
		return new ResponseEntity<List<Course>>(adminService.getAllCourses(), HttpStatus.OK);
	}
	
	
//	@GetMapping("/getBatchs")
//	public ResponseEntity<List<Batch>> getAllBatchs(){
//		return new ResponseEntity<List<Batch>>(userService.getAllBatches(), HttpStatus.OK);
//	}
	
	@GetMapping("/getAllPos")
	public ResponseEntity<List<PurchaseOrder>> getAllPos(){
		return new ResponseEntity<List<PurchaseOrder>>(adminService.getAllPos(), HttpStatus.OK);
	}
	
	@PostMapping(value = "/createCourse",consumes = "multipart/form-data")
	public ResponseEntity<Course> addCourse(@RequestPart("course") Course course,@RequestPart(value = "file", required = false) MultipartFile file) throws IOException{
		
		  System.out.println(course.toString());
	      List<Long> ids=new ArrayList<>();
		for (Subject subject:course.getSubjects()) {
			   if(subject.getId()!=null) {
				   ids.add(subject.getId());
			   }
		}
		course.setSubjects(new ArrayList<>());
		Course course1 = adminService.addCourse(course,file);
		List<SubjectList> subjects = adminService.findSubjectByIds(ids);
		
		for (SubjectList subjectList:subjects) {
			Subject subject = new Subject();
			   if(subjectList.getId()!=null) {
				  subject.setCourse(course1);
				  subject.setName(subjectList.getName());
				  Subject savedSubject = subjectRepo.save(subject);
				   
				  course1.getSubjects().add(savedSubject);
				  
			   }
		}
		
	  Course course2 = adminService.addCourse(course1,file);
	  //System.out.println(course2.getSubjects());
	  return new ResponseEntity<Course>(course2, HttpStatus.CREATED);
	
	}
	@PostMapping("/addSubjectToList")
	public ResponseEntity<SubjectList> addSubject(@RequestBody SubjectList subjectList){
		
		SubjectList subject2 = adminService.addSubject(subjectList);
		return new ResponseEntity<SubjectList>(subject2, HttpStatus.CREATED);
	}
	@GetMapping("/getAllSubjects")
	public ResponseEntity<List<SubjectList>> getSubjects(){
		List<SubjectList> subjects = adminService.getAllSubjects();
		return new ResponseEntity<List<SubjectList>>(subjects, HttpStatus.ACCEPTED);
	}
	
	
	
}
