package in.ap.service.impl;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import in.ap.entity.Batch;
import in.ap.entity.Class;
import in.ap.entity.Payment;
import in.ap.entity.PurchaseOrder;
import in.ap.entity.Question;
import in.ap.entity.Student;
import in.ap.entity.Test;
import in.ap.entity.User;
import in.ap.entity.UserTestAnswer;
import in.ap.helper.EmailService;
import in.ap.repo.BatchRepo;
import in.ap.repo.ClassRepo;
import in.ap.repo.PaymentRepo;
import in.ap.repo.PurchaseOrderRepo;
import in.ap.repo.StudentRepo;
import in.ap.repo.TestRepo;
import in.ap.repo.UserRepo;
import in.ap.repo.UserTestAnsRepo;
import in.ap.service.UserService;
import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	private UserRepo userRepo;
	private BatchRepo batchRepo;
	private StudentRepo studentRepo;
	private PurchaseOrderRepo purchaseOrderRepo;
	private PaymentRepo paymentRepo;
	private ClassRepo classRepo;
	private TestRepo testRepo;
	private UserTestAnsRepo userTestAnsRepo;

	@Override
	public User saveUser(User user) {
		return userRepo.save(user);
	}

	@Override
	public User updateUser(User user) {
		
		return userRepo.save(user);
	}

	@Override
	public User getUser(Long userId) {
		return userRepo.findById(userId).orElseThrow();
	
	}

	@Override
	public List<User> getAllUsers() {
		
		return userRepo.findAll();
	}

	@Override
	public User getUserByEmail(String email) {
		
		return userRepo.findByEmail(email);
	}

	@Override
	public List<Batch> getAllBatches() {
		
		return batchRepo.findAll();
		
	}

	@Override
	public PurchaseOrder createOrder(Long batchId) {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email);
		Student student = studentRepo.findByUser(user);
		Batch batch = batchRepo.findById(batchId).get();
		
		PurchaseOrder po = new PurchaseOrder();
		po.setBatch(batch);
		po.setFee(batch.getCourse().getFee());
		po.setPurchaseDate(LocalDate.now());
		po.setStudent(student);
		po.setUser(user);
		po.setStatus("PENDING");
		
		PurchaseOrder savedPo = purchaseOrderRepo.save(po);
		return savedPo;
	}

	@Override
	public Payment doPayment(Long purchaseOrderId,String upiId) {
		PurchaseOrder po = purchaseOrderRepo.findById(purchaseOrderId).get();
		Payment payment = new Payment();
		try {
			
		 String ranString = generateRandomString();
		String paymentId="P143"+ranString;
		
		String randomString = generateRandomString();
		String orderId="O587"+randomString;
		
		String randomString2 = generateRandomString();
		String recieptId="Rec##445%"+randomString2;
		
		payment.setUpiId(upiId);
		payment.setPurchaseOrder(po);
		payment.setPaymentId(paymentId);
		payment.setOrderId(orderId);
		payment.setReciptId(recieptId);
		payment.setAmount(po.getFee());
		payment.setEmail(po.getUser().getEmail());
		
		payment.setStatus("COMPLITED");	
		paymentRepo.save(payment);
		po.setStatus("COMPLITED");
		purchaseOrderRepo.save(po);
		
		Student std = new Student();
		std.getPurchaseOrder().add(po);
		std.getBatchs().add(po.getBatch());
		std.setUser(po.getUser());
		std.setValidityDate(LocalDate.now().plusYears(1));
		Student student = studentRepo.save(std);
		LocalTime now = LocalTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("h-a dd/MM/yyyy", Locale.ENGLISH);
		 String date = now.format(formatter).toLowerCase();

        String formatted = now.format(formatter).toLowerCase();
		if(payment.getStatus().equalsIgnoreCase("COMPLITED")) {
			
			EmailService emailService = new EmailService();
			String subject="🎉 Welcome to APCLOTE! Your Course Purchase is Confirmed";
			String body="Dear ["+student.getUser().getName()+"],\r\n"
					+ "\r\n"
					+ "Thank you for choosing APCLOTE – Your Online Coaching Platform for Success. We’re excited to have you on board!\r\n"
					+ "\r\n"
					+ "✅ Purchase Confirmation:\r\n"
					+ "You have successfully enrolled in:\r\n"
					+ "Course Name: ["+payment.getPurchaseOrder().getBatch().getName()+"]\r\n"
					+ "Order ID: ["+payment.getOrderId()+"]\r\n"
					+ "Purchase Date: ["+date+"]\r\n"
					+ "\r\n"
					+ "Your learning journey starts now! You can access your course anytime by logging into your APCLOTE account.\r\n"
					+ "\r\n"
					+ "👉 [Access Your Course] (<a>www.APCLOTE.in.course/</a>\n"
					+ "\r\n"
					+ "What’s next?\r\n"
					+ "\r\n"
					+ "Explore your dashboard and get familiar with the platform.\r\n"
					+ "\r\n"
					+ "Start your first lesson today and track your progress easily.\r\n"
					+ "\r\n"
					+ "Reach out to our support team anytime if you face difficulties.\r\n"
					+ "\r\n"
					+ "At APCLOTE, we believe in making learning simple, engaging, and effective. We’re confident this course will help you reach your goals.\r\n"
					+ "\r\n"
					+ "If you have any questions, feel free to contact us at support@apclote.com\r\n"
					+ ".\r\n"
					+ "\r\n"
					+ "Once again, welcome to the APCLOTE family! 🚀\r\n"
					+ "\r\n"
					+ "Best regards,\r\n"
					+ "Team APCLOTE\r\n"
					+ "Your Online Coaching Partner";
			emailService.sendEmail(po.getUser().getEmail(), subject, body);
		}
		
		
			
		}
		catch (Exception e) {
			
			payment.setStatus("FAILED");	
		}
		return payment;
	}
	
	
	
	public String generateRandomString() {
		Character[] chrs={'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
	               'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k',
	               'l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4',
	               '5','6','7','8','9'};
		int ran;
		String ranString="";
		for (int i=0;i<9;i++) {
			ran=(int) (Math.random()*chrs.length);
			ranString+=chrs[ran];
		}
		return ranString;
	}

	@Override
	public List<Batch> getMyCourses() {
		String email= SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email);
		Student student = studentRepo.findByUser(user);
		if(!(student==null)) {
		  return student.getBatchs();
		}
		return null;
	}

	@Override
	public List<Test> getTests(Long classId) {
		Class classs= classRepo.findById(classId).get();
		List<Test> tests = testRepo.findByClasss(classs);
		return tests;
	}

	@Override
	public UserTestAnswer submitTest(Long testId,List<String> userAnswers) {
		
		UserTestAnswer userTestAnswer = new UserTestAnswer();
		
		Test test = testRepo.findById(testId).get();
		userTestAnswer.setTest(test);
		userTestAnswer.setDate(LocalDate.now());
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		User user = userRepo.findByEmail(email);
		userTestAnswer.setUser(user);
		userTestAnswer.setUserAnswers(userAnswers);
		List<Question> questions=userTestAnswer.getTest().getQuestions();
  
		for(int i=0;i<questions.size();i++) {
			Question question = questions.get(i);
			String keyAnswer = question.getKeyAnswer();
			String userAnswer = userTestAnswer.getUserAnswers().get(i);
			System.out.println(keyAnswer);
			System.out.println(userAnswer);
			
			if(keyAnswer.equalsIgnoreCase(userAnswer)) {
				userTestAnswer.setCorrectAns(userTestAnswer.getCorrectAns()+1);
				
			}
			else {
				userTestAnswer.setWrongAns(userTestAnswer.getWrongAns()+1);
			}
			
		}
		try {
		UserTestAnswer savedUserTestAnswer = userTestAnsRepo.save(userTestAnswer);
		return savedUserTestAnswer;
		}
		catch (Exception e) {
			return new UserTestAnswer();
		}
		
		
		
		
	}

}
