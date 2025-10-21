// src/pages/Home.jsx
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBatchs } from "../../State/BatchsAndCoursesAndSubjects/Action";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import store from "../../Store/store";
import Batch from "../Batch";
import { getUser } from "../../State/Auth/Action";
import BatchCard from "./BatchCard";

const Home=()=> {
  const {auth}=useSelector(store=>store)
  const {batchs}=useSelector(store=>store)
  const page=batchs.page
  
  
    const dispatch= useDispatch()
  useEffect(() => {
    
    dispatch(getAllBatchs(page))
    // dispatch(getUser())
  }, [dispatch])

  

  

  


  
  const ltBatchs=batchs?.allBatchs.slice(0,3)
  return (
    <div className="bg-gray-50 text-gray-900 font-sans">

     
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-r from-blue-50 to-blue-100 "
     
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Learn Anytime, Anywhere with{" "}
              <span className="text-blue-600">APCLOTE</span>
            </h2>
            <p className="text-lg text-gray-600">
              Your trusted online coaching platform for competitive exams, programming, 
              and skill development. Join thousands of students achieving their dreams!
            </p>
            <div className="space-x-4">
              <Link
                to={"/allBatchs"}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700"
              >
                Explore Courses
              </Link>
              {!localStorage.getItem("JWT")&&
              <Link
                to="/register"
                className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50"
              >
                Get Started
              </Link>
              }
              
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37481.jpg"
              alt="APCLOTE Learning"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

    


      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-12">Why Choose APCLOTE?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3 text-blue-600">Expert Mentors</h4>
              <p className="text-gray-600">
                Learn from industry professionals and subject experts with years of experience.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3 text-blue-600">Flexible Learning</h4>
              <p className="text-gray-600">
                Access courses anytime, anywhere, on any device with lifetime access.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-3 text-blue-600">Affordable Pricing</h4>
              <p className="text-gray-600">
                Quality education at the most affordable prices to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <div className="flex items-center justify-center py-5">
        <h2 className="text-3xl font-bold mx-10">Provided Courses</h2>
      </div>
      
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-15">
        {ltBatchs.length > 0 ? (
          ltBatchs.map((batch) => (
           <BatchCard batch={batch}/>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No batches found.
          </p>
        )}
      </div>


  <div className="flex items-center justify-center py-5">
        <Link to={"/allBatchs"} className="text-blue-600 font-bold mx-auto">View All Courses <ArrowForwardIcon/></Link>
      </div>
      {/* Testimonials */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h3 className="text-3xl font-bold mb-12">What Our Students Say</h3>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "Rahul",
          text: "APCLOTE helped me crack my dream exam! The structured courses and regular practice tests kept me on track and boosted my confidence immensely."
        },
        {
          name: "Sneha",
          text: "Best platform for affordable online courses. The flexibility to learn at my own pace and access recorded lectures anytime was a game-changer."
        },
        {
          name: "Arjun",
          text: "The mentors are amazing and very supportive. They clarify doubts promptly and provide practical tips that really helped me improve my scores."
        },
        {
          name: "Priya",
          text: "I love the interactive quizzes and detailed feedback. APCLOTE makes learning engaging and ensures you truly understand each concept before moving forward."
        },
        {
          name: "Karan",
          text: "Joining APCLOTE was one of the best decisions I made for my career. The course material is up-to-date and very relevant to competitive exams."
        },
        {
          name: "Anjali",
          text: "The community support and guidance from mentors helped me stay motivated throughout my preparation. Highly recommend APCLOTE to all students!"
        },
      ].map((t, i) => (
        <div
          key={i}
          className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <p className="text-gray-700 italic mb-4">“{t.text}”</p>
          <h4 className="font-semibold text-blue-600">- {t.name}</h4>
        </div>
      ))}
    </div>
  </div>
</section>

    </div>
  );
}
export default Home;
