import React from "react";
import { Link } from "react-router-dom";

// Icons
import { PiMedal } from "react-icons/pi";
import { LuGraduationCap, LuHandshake } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { CgFileDocument } from "react-icons/cg";
import { MdNavigateNext } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";

import Footer from "@/components/footer/Footer";

const Home = () => {
  return (
    <>
      {/* ======================== HERO SECTION ======================== */}
      <div
        className="bg-cover bg-center min-h-[100vh] w-full flex items-center justify-center relative"
        style={{ backgroundImage: "url('./hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative w-full px-6 sm:px-12 md:px-24 max-w-4xl text-white text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg">
            Unlock Your Academic Potential
          </h1>
          <p className="mt-4 mb-6 text-base sm:text-lg md:text-xl font-semibold drop-shadow">
            Find and apply for bursaries that match your goals and aspirations
          </p>
          <Link to="/register">
            <button className="cursor-pointer bg-cyan-800 hover:bg-cyan-700 px-6 sm:px-8 py-3 rounded-md text-white font-bold shadow-lg border-2 border-cyan-900">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* ======================== TYPES OF BURSARIES ======================== */}
      <div className="bg-gray-100 py-10 px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl text-cyan-700 font-bold mb-10">
            Explore Types of Bursaries
          </h2>
        </div>

        {/* Grid of bursary types */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <PiMedal className="text-5xl text-cyan-700 mb-4" />,
              title: "Merit-Based Bursaries",
              text: "Awarded based on academic or extracurricular achievements.",
            },
            {
              icon: <LuGraduationCap className="text-5xl text-cyan-700 mb-4" />,
              title: "Need-Based Bursaries",
              text: "Designed to assist students with financial needs.",
            },
            {
              icon: <LuHandshake className="text-5xl text-cyan-700 mb-4" />,
              title: "Community Service Bursaries",
              text: "For students who have demonstrated commitment to community service.",
            },
            {
              icon: <FaRegStar className="text-5xl text-cyan-700 mb-4" />,
              title: "Athletic Bursaries",
              text: "Supporting student athletes pursuing higher education.",
            },
            {
              icon: (
                <HiOutlineLightningBolt className="text-5xl text-cyan-700 mb-4" />
              ),
              title: "Innovation Bursaries",
              text: "Encouraging students in technology and entrepreneurial fields.",
            },
            {
              icon: <CgFileDocument className="text-5xl text-cyan-700 mb-4" />,
              title: "Research Bursaries",
              text: "Funding opportunities for students engaged in research projects.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col "
            >
              <div className="flex  w-full">{item.icon}</div>
              <h3 className="text-xl font-semibold ">{item.title}</h3>
              <p className="mt-2 text-gray-600 flex-grow ">{item.text}</p>
              <a
                href="#"
                className="inline-flex items-center mt-4 text-cyan-700 hover:text-cyan-500 gap-1"
              >
                <span>Learn More</span>
                <MdNavigateNext className="align-middle mt-1.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ======================== STEP-BY-STEP GUIDE ======================== */}
      <div className="bg-gray-100 py-10 min-h-[70vh] px-2 sm:px-1 md:px-6 lg:px-16 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl text-cyan-700 font-bold mb-12">
            Your Path to Funding
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            {
              no: "1",
              icon: <FiCheckCircle className="text-3xl text-cyan-700 mb-4" />,
              title: "Create an Account",
              description: "Sign up for free and set up your student profile.",
            },
            {
              no: "2",
              icon: <CgFileDocument className="text-3xl text-cyan-700 mb-4" />,
              title: "Complete Application",
              description:
                "Fill out the multi-step application form accurately.",
            },
            {
              no: "3",
              icon: <LuGraduationCap className="text-3xl text-cyan-700 mb-4" />,
              title: "Upload Documents",
              description:
                "Attach required documents to support your application.",
            },
            {
              no: "4",
              icon: <LuHandshake className="text-3xl text-cyan-700 mb-4" />,
              title: "Track your Status",
              description:
                "Moniter your application status through your dashboard.",
            },
          ].map((bursary, index) => (
            <div
              key={index}
              className="p-6 rounded-lg h-full flex flex-col text-center align-center justify-center items-center"
            >
              <div className="flex items-center justify-center mb-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full mb-4 bg-cyan-700 text-2xl text-white">
                  {bursary.no}
                </span>
              </div>
              <div className="flex justify-center w-full mb-2">
                {bursary.icon}
              </div>
              <h3 className="text-xl font-semibold">{bursary.title}</h3>
              <p className="mt-2 text-gray-600 flex-grow">
                {bursary.description}
              </p>
            </div>
          ))}
        </div>

        {/* ======================== TESTIMONIALS ======================== */}
        <div className="bg-gray-100 py-10 px-2 sm:px-2 md:px-6 lg:px-14">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl text-cyan-700 font-bold mb-10">
              Hear From Our Successful Students
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {[
              {
                quote:
                  "The KnM Bursary App made it so easy to find and apply for funding. I received updates every step of the way!",
                profile: "./student1.jpg",
                studentName: "Thabo Mokoena",
                University: "University of Cape Town",
              },
              {
                quote:
                  "Thanks to this app, I discovered bursaries I never knew existed. The application process was simple and stress-free.",
                profile: "./student2.jpg",
                studentName: "Ayanda Nkosi",
                University: "University of Limpopo",
              },
              {
                quote:
                  "I loved how the dashboard helped me track my application status. I felt supported throughout my journey.",
                profile: "./student3.jpg",
                studentName: "Naledi Dlamini",
                University: "University of Johannesburg",
              },
              {
                quote:
                  "The reminders and document upload feature made sure I never missed a deadline. Highly recommended!",
                profile: "./student4.jpg",
                studentName: "Sipho Khumalo",
                University: "University of Pretoria",
              },
              {
                quote:
                  "With the KnM Bursary App, I could focus on my studies while the app handled the admin. It changed my life!",
                profile: "./student5.jpg",
                studentName: "Zanele Mthembu",
                University: "University of Stellenbosch",
              },
              {
                quote:
                  "With the KnM Bursary App, I could focus on my studies while the app handled the admin. It changed my life!",
                profile: "./student6.jpg",
                studentName: "Ferdinand Morena",
                University: "University of Limpopo",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white w-full max-w-[420px] p-6 rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 mx-auto"
              >
                <img
                  src={item.profile}
                  alt={item.studentName}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-cyan-100 shadow"
                />
                <p className="italic text-gray-700 text-sm sm:text-base mb-4">
                  "{item.quote}"
                </p>
                <h4 className="font-semibold text-cyan-800">
                  {item.studentName}
                </h4>
                <span className="text-gray-500 text-sm">{item.University}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ======================== CONTACT/INFORMATION SECTION ======================== */}
        <div className="bg-gray-100 py-10 px-2 sm:px-1 md:px-6 lg:px-14 mb-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl text-cyan-700 font-bold mb-10">
              Need More Information?
            </h2>
          </div>

          {/* Cards for contact/info/help */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
            {[
              {
                icon: <MdMailOutline className="text-4xl text-cyan-700 mb-4" />,
                title: "Contact Us",
                text: "Get in touch with our support team.",
              },
              {
                icon: (
                  <IoLocationOutline className="text-4xl text-cyan-700 mb-4" />
                ),
                title: "Find Universities",
                text: "Explore universities and their bursary offerings.",
              },
              {
                icon: <FiPhone className="text-4xl text-cyan-700 mb-4" />,
                title: "Support and Help",
                text: "Access FAQs and support resources.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white w-full max-w-[420px] p-6 rounded-lg shadow-lg h-full flex flex-col  mx-auto"
              >
                <div className="flex  w-full">{item.icon}</div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-gray-600 flex-grow">{item.text}</p>
                <a
                  href="#"
                  className="inline-flex items-center mt-4 text-cyan-700 hover:text-cyan-500 gap-1"
                >
                  <span>Learn More</span>
                  <MdNavigateNext className="align-middle mt-1.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
