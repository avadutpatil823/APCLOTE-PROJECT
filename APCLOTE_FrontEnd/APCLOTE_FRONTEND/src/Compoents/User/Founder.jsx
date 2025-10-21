import React from "react";

const founders = [
  {
    name: "Avadut Patil",
    role: "Main Founder & CEO",
    image: "/i1.jpeg",
    description: "Avadut Patil is the visionary behind APCLOTE, leading the platform with passion and innovation. He ensures the platform delivers top-quality online coaching for students pursuing their academic dreams.",
  },
  {
    name: "BasavChetan Patil",
    role: "Co-Founder",
    image: "/i2.jpeg",
    description: "BasavChetan Patil is a dedicated co-founder who focuses on course development and educational content, ensuring APCLOTE offers the best learning materials.",
  },
  {
    name: "Vinayak Pasale",
    role: "Co-Founder",
    image: "/i3.jpeg",
    description: "Vinayak Pasale manages the technical aspects of APCLOTE, making sure the platform is fast, secure, and user-friendly for students across India.",
  },
  {
    name: "KedarLing Kanade",
    role: "Co-Founder",
    image: "/i4.jpeg",
    description: "KedarLing Kanade handles platform operations and user experience, ensuring students have smooth navigation and efficient learning paths.",
  },
  {
    name: "Prasad Bedge",
    role: "Co-Founder",
    image: "/i5.jpeg",
    description: "Prasad Bedge handles Marketing operations and Course Designing, ensuring The Trending And UseFull Conent Has Delivered To Students.",
  },
  {
    name: "Omkar Patole",
    role: "Co-Founder",
    image: "/i6.jpeg",
    description: "Omkar Patole focuses on outreach and collaborations, building connections with educational institutions and expanding APCLOTE's reach.",
  },
  {
    name: "Sakshi Patil",
    role: "Co-Founder",
    image:"/i7.jpeg",
    description: "Sakshi Patil oversees the content quality and student engagement, ensuring the platform provides interactive and effective learning solutions.",
  },
];

const Founders = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Meet The Founders of APCLOTE
        </h1>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          APCLOTE is an online coaching platform founded by a group of passionate professionals who all hold a Master of Computer Application (MCA) degree from GM University, Davangere. Together, they bring technology, education, and vision to provide the best learning experience.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {founders.map((founder, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-3xl p-6 flex flex-col items-center text-center transition transform hover:scale-105 duration-300`}
            >
              <img
                src={founder.image}
                alt={founder.name}
                className={`w-32 h-32 rounded-full object-contain  mb-4 ${index === 0 ? "ring-4 ring-blue-600" : "ring-4 ring-blue-300"}`}
              />
              <h2 className="text-xl font-semibold text-blue-800">{founder.name}</h2>
              <p className="text-sm font-medium text-gray-500 mb-3">{founder.role}</p>
              <p className="text-gray-700 text-sm">{founder.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Founders;
