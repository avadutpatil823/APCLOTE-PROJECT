import React from "react";
import { FaLightbulb, FaHandshake, FaUsers, FaChartLine } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-12 px-6 md:px-20">
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-700">
          About APCLOTE
        </h1>
        <p className="text-lg leading-relaxed text-gray-600">
          APCLOTE (Advanced Platform for Collaborative Learning, Organization, Training, and Evaluation) is an innovative digital ecosystem designed to bridge the gap between students, educators, and institutions. Our mission is to create a smarter, more connected, and transparent academic environment where learning, assessment, and collaboration flourish seamlessly.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <FaLightbulb className="text-5xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-600">
            We envision a world where education is accessible, data-driven, and personalized for every learner. By combining technology, analytics, and innovation, APCLOTE aims to empower academic institutions and learners to achieve excellence through digital transformation.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <FaHandshake className="text-5xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to revolutionize academic collaboration through intelligent systems that simplify management, enhance learning experiences, and promote accountability. APCLOTE provides institutions with powerful tools for batch management, attendance tracking, automated assessments, and analytics-driven decisions.
          </p>
        </div>
      </section>

      <section className="bg-blue-100 rounded-3xl p-10 md:p-16 text-center mb-20">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow-md">
            <FaUsers className="text-4xl text-blue-600 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
            <p className="text-gray-600">
              We believe in teamwork—connecting students, teachers, and administrators through a unified, transparent platform that encourages engagement and shared growth.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <FaChartLine className="text-4xl text-green-600 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-gray-600">
              Continuous innovation drives us. From AI-assisted grading to smart dashboards, APCLOTE evolves with the needs of the modern education system.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md">
            <FaLightbulb className="text-4xl text-yellow-500 mb-3 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Integrity</h3>
            <p className="text-gray-600">
              We ensure trust, fairness, and transparency in all aspects of academic data and operations, creating an environment where every stakeholder feels confident and respected.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Our Journey</h2>
        <p className="text-gray-600 text-lg leading-relaxed text-center">
          Founded with a passion for academic excellence and digital empowerment, APCLOTE began as a collaborative initiative among educators and technologists. Over time, it has evolved into a comprehensive learning ecosystem adopted by institutions for seamless management and smarter education delivery.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed text-center mt-4">
          From streamlining student assessments to enabling real-time communication between lecturers and students, APCLOTE continues to redefine how education systems operate in the digital era.
        </p>
      </section>

      <section className="bg-gray-100 rounded-3xl p-10 md:p-16 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Join Us in Shaping the Future</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          Whether you are an educator, institution, or learner, APCLOTE welcomes you to be a part of our vision for smarter, connected education. Together, we can build a future where learning is efficient, inclusive, and inspiring.
        </p>
        <button className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
          Get Started with APCLOTE
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
