import React from "react";

// 13 Blog Posts with verified images and detailed snippets
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Tips to Crack Online Exams",
    snippet: `Online exams can be stressful, but with the right preparation, you can excel. Focus on understanding the exam pattern, practice with mock tests, manage your time efficiently, and ensure your system and internet connection are reliable. Don't forget to take regular breaks and maintain a calm mindset to avoid last-minute panic. Planning is key to success.`,
    date: "2025-10-18",
    image: "https://images.pexels.com/photos/1181351/pexels-photo-1181351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    id: 2,
    title: "Why Online Learning is the Future",
    snippet: `Online learning has revolutionized education by making courses accessible anywhere, anytime. Students can learn at their own pace, revisit lessons, and access a wide range of resources. Platforms like APCLOTE provide interactive content, personalized learning paths, and instant feedback. The flexibility and convenience of online learning prepare learners for modern career demands.`,
    date: "2025-10-15",
    image: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/03/what-is-a-blog-1.png"
  },
  {
    id: 3,
    title: "Time Management for Students",
    snippet: `Time management is crucial for academic success. Prioritize tasks using a schedule, break large projects into smaller steps, and set realistic goals. Avoid distractions, balance study and leisure, and track your progress regularly. With proper time management, stress decreases and productivity increases, allowing you to achieve more in less time.`,
    date: "2025-10-12",
    image: "https://www.hostinger.com/in/tutorials/wp-content/uploads/sites/52/2018/08/how-to-start-a-blog-2.png"
  },
  {
    id: 4,
    title: "How to Stay Motivated While Studying",
    snippet: `Maintaining motivation during studies is challenging but achievable. Set clear, achievable goals and reward yourself for completing tasks. Surround yourself with supportive peers, maintain a positive mindset, and visualize success. Break your work into manageable sections and keep your workspace organized. Celebrate small wins to stay motivated consistently.`,
    date: "2025-10-10",
    image: "https://www.hubspot.com/hubfs/Benefits%20of%20Business%20Blogging.webp"
  },
  {
    id: 5,
    title: "Best Study Apps for Students",
    snippet: `Leveraging study apps can enhance your learning efficiency. Apps like note organizers, flashcards, and quiz makers help retain information. Use productivity apps to track tasks and deadlines. Digital tools allow access to learning materials anytime, anywhere. Integrating technology with traditional study methods maximizes results and engagement.`,
    date: "2025-10-08",
    image: "https://www.hubspot.com/hubfs/31%20business%20stuff.png"
  },
  {
    id: 6,
    title: "How to Prepare for Competitive Exams",
    snippet: `Competitive exams require strategic preparation. Begin by understanding the syllabus and exam format. Practice previous year papers, revise regularly, and focus on weak areas. Time management during practice tests is essential. Stay updated with current events and maintain mental and physical health for optimum performance.`,
    date: "2025-10-05",
    image: "https://www.hubspot.com/hubfs/blogs-Jan-05-2024-05-12-25-3281-PM.png"
  },
  {
    id: 7,
    title: "Effective Note-Taking Techniques",
    snippet: `Taking organized notes improves comprehension and retention. Use headings, bullet points, and highlighting to structure your notes. Review and revise them regularly. Digital tools or traditional notebooks both work effectively. Active note-taking while reading or listening enhances focus and memory. Create summaries to solidify understanding.`,
    date: "2025-10-02",
    image: "https://www.wisestamp.com/wp-content/uploads/2020/10/How-to-Start-a-Blog-for-Your-Business-in-8-Easy-Steps-min.jpg"
  },
  {
    id: 8,
    title: "Top 10 Learning Strategies",
    snippet: `Successful students employ multiple learning strategies. Techniques like spaced repetition, active recall, mind mapping, and practice testing boost knowledge retention. Combining reading, writing, and teaching others strengthens understanding. Evaluate what works best for you and adapt methods to your learning style. A consistent approach leads to long-term mastery of subjects.`,
    date: "2025-09-30",
    image: "https://ignitebizmasters.com/wp-content/uploads/2025/06/image_68cba26b124f56.73041476-1024x585.webp"
  },
  {
    id: 9,
    title: "Understanding Online Course Platforms",
    snippet: `Online course platforms offer flexible learning options for students. They provide video lectures, quizzes, forums, and progress tracking. You can learn from experts worldwide without leaving home. Interactive content and real-time feedback enhance engagement and retention. Platforms like APCLOTE also offer certifications, adding value to your profile.`,
    date: "2025-09-28",
    image: "https://img.freepik.com/free-photo/portrait-concentrated-girl-doing-homework-attending-online-course-making-notes-while-working-l_1258-125695.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 10,
    title: "How to Balance Studies and Hobbies",
    snippet: `Balancing academics with hobbies prevents burnout and promotes holistic growth. Allocate specific time slots for hobbies, physical activity, and relaxation. Prioritize tasks and avoid procrastination. Hobbies enhance creativity and reduce stress, making you more productive in studies. Regular breaks improve focus and overall well-being.`,
    date: "2025-09-25",
    image: "https://images.pexels.com/photos/1181351/pexels-photo-1181351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    id: 11,
    title: "Benefits of Group Study",
    snippet: `Group study encourages discussion, knowledge sharing, and peer learning. Explaining concepts to others reinforces your understanding. It helps identify knowledge gaps and improves communication skills. Set clear goals and stay focused during sessions. Collaborative learning makes studying more interactive and less monotonous.`,
    date: "2025-09-22",
    image: "https://img.freepik.com/free-photo/young-woman-with-glasses-cafe_273609-3975.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 12,
    title: "Mind Maps for Effective Learning",
    snippet: `Mind maps visually organize information, making it easier to understand and memorize. Use colors, keywords, and images to highlight relationships between concepts. They simplify complex topics and promote creative thinking. Review and revise mind maps regularly to reinforce memory and retain knowledge effectively.`,
    date: "2025-09-20",
    image: "https://img.freepik.com/free-photo/high-angle-blogger-lifestyle-home_23-2148360145.jpg?semt=ais_hybrid&w=740&q=80"
  },
  {
    id: 13,
    title: "Preparing for Online Interviews",
    snippet: `Online interviews require preparation and confidence. Test your equipment and internet connection beforehand. Dress professionally, maintain eye contact with the camera, and keep your environment quiet. Research the company and practice common questions. Stay calm, confident, and concise in your answers. First impressions matter even in virtual settings.`,
    date: "2025-09-18",
    image: "https://img.freepik.com/free-photo/medium-shot-happy-woman-writing_23-2148769753.jpg?semt=ais_hybrid&w=740&q=80"
  }
];

const APCLOTEBlog = () => {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">
        Latest Blogs
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 flex flex-col justify-between h-[350px]">
              <div>
                <h3 className="text-xl font-semibold text-blue-700 mb-4">{post.title}</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">{post.snippet}</p>
              </div>
              <span className="text-gray-500 text-xs mt-4">{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default APCLOTEBlog;
