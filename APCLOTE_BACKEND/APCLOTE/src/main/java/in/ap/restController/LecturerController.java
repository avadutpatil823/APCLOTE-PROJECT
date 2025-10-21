package in.ap.restController;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import in.ap.entity.Batch;
import in.ap.entity.BatchLecturerSubjectInter;
import in.ap.entity.Class;
import in.ap.entity.ClassNotesFile;
import in.ap.entity.ClassRoom;
import in.ap.entity.ClassVideo;
import in.ap.entity.LecturerBatchSubject;
import in.ap.entity.Test;
import in.ap.service.AdminService;
import in.ap.service.LecturerService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/lecturer")
public class LecturerController {

	private LecturerService lecturerService;
	private AdminService adminService;
	
	@PostMapping("/createClass")
	public ResponseEntity<Class> createClass(@RequestBody Class class1,Principal principal)
	{
		Class class2 = lecturerService.createClass(class1,principal);
		return new ResponseEntity<Class>(class2, HttpStatus.OK);
		
	}
	
	@GetMapping("/getLBS")
	public ResponseEntity<List<BatchLecturerSubjectInter>> createClass()
	{
		List<BatchLecturerSubjectInter> lbs = lecturerService.getlbsOfLecturer();
		return new ResponseEntity<List<BatchLecturerSubjectInter>>(lbs, HttpStatus.OK);
	}
	
	@PostMapping(value = "/uploadVideo" ,consumes = "multipart/form-data")
	public ResponseEntity<String> uploadClassVideo(@RequestPart("file")MultipartFile file,@RequestParam("title")String title,@RequestParam("classId") Long classId) throws IOException{
		ClassVideo classVideo = new ClassVideo();
		classVideo.setTitle(title);
		String msg = lecturerService.uplpoadVideo(file, classVideo,classId);
		return new ResponseEntity<String>(msg, HttpStatus.ACCEPTED);
	}
	
	
	@PostMapping(value = "/uploadNotes" ,consumes = "multipart/form-data")
	public ResponseEntity<String> uploadClassNotes(@RequestPart("file")MultipartFile file,@RequestParam("title")String title,@RequestParam("classId") Long classId) throws IOException{
		ClassNotesFile classNotes = new ClassNotesFile();
		classNotes.setTitle(title);
	String msg = lecturerService.uploadNotes(file, classNotes, classId);
		return new ResponseEntity<String>(msg, HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/createClassRoom")
	public ResponseEntity<ClassRoom> createClassRoom(@RequestParam("name")String name,@RequestParam("batchId")Long batchId){
		ClassRoom classRoom = new ClassRoom();
		classRoom.setName(name);
		ClassRoom classroom2 = adminService.createClassroom(classRoom, batchId);
		return new ResponseEntity<ClassRoom>(classroom2, HttpStatus.CREATED);
		
	}
	
	
	@GetMapping("/getMyBatchs")
	public ResponseEntity<List<Batch>> getBatchsOfLecturer(){
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		List<Batch> batchs = lecturerService.getBatchsOFLecturer(email);
		return new ResponseEntity<List<Batch>>(batchs, HttpStatus.OK);
	}
	@PostMapping("/crateTest")
	public ResponseEntity<Test> createTest(@RequestBody Test test,@RequestParam("classId") Long classId){
		Test test2 = lecturerService.createTest(test,classId);
		return new ResponseEntity<Test>(test2, HttpStatus.CREATED);
	}
}
