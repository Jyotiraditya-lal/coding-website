import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faReadme } from "@fortawesome/free-brands-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import user1 from "../../assets/User1.png";
import user2 from "../../assets/User2.jpg";
import user3 from "../../assets/User3.jpg";
import codingImg from "../../assets/codingImg.jpg";
import NavBar from "../Layout/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Interactive Coding Challenges",
      description:
        "Sharpen your skills with hands-on problem-solving in a wide range of coding challenges. Whether you're a beginner or an experienced coder, these challenges are designed to push your abilities and help you learn through trial and error.",
      icon: faLightbulb,
    },
    {
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals and seasoned developers who bring years of experience to the table. These courses are crafted to provide you with practical knowledge, industry insights, and the tools needed to stay ahead in the tech world.",
      icon: faReadme,
    },
    {
      title: "Community Support",
      description:
        "Join a thriving community of coders, ready to help and inspire. From troubleshooting your code to sharing best practices and offering career advice, the community is here to foster collaboration and growth among developers of all skill levels.",
      icon: faUsers,
    },
    {
      title: "Real World Projects",
      description:
        "Build portfolio-ready projects that showcase your skills and enhance your resume. These projects are based on real-world scenarios, helping you gain practical experience while creating tangible examples of your work to show potential employers.",
      icon: faEarthAmericas,
    },
  ];

  const faq = [
    {
      question: "What are coding challenges?",
      answer:
        "Coding challenges are problem-solving exercises that help you practice and improve your programming skills. They vary in difficulty and cover a wide range of topics to keep you engaged and learning.",
    },
    {
      question: "How do the expert-led courses work?",
      answer:
        "Our expert-led courses are structured lessons taught by industry professionals. They include video lectures, hands-on exercises, and real-world examples to help you gain practical experience and learn new skills.",
    },
    {
      question: "Is there a community where I can ask for help?",
      answer:
        "Yes! We have an active community of developers who are always ready to offer advice, answer questions, and share experiences. You can engage with others through forums, chat rooms, and project collaboration.",
    },
    {
      question: "Can I build a portfolio with real-world projects?",
      answer:
        "Absolutely! Our platform includes real-world projects that are designed to help you build a strong portfolio. These projects will showcase your skills to potential employers and help you stand out in the job market.",
    },
    {
      question: "Are the courses suitable for beginners?",
      answer:
        "Yes, we offer courses that cater to all skill levels, including beginners. You can start with foundational concepts and gradually progress to more advanced topics as you gain confidence and experience.",
    },
  ];

  const reviews = [
    {
      name: "Alice Smith",
      review:
        "This platform has been a game-changer for my coding journey. The interactive challenges are engaging and have really helped me improve my problem-solving skills.",
      rating: 5,
      img: user1,
    },
    {
      name: "John Doe",
      review:
        "The expert-led courses are top-notch. The instructors break down complex concepts into easily digestible lessons that I can apply right away to my projects.",
      rating: 5,
      img: user2,
    },
    {
      name: "Maria Johnson",
      review:
        "The community support is amazing! I was able to get quick answers to my questions and connect with other developers. It’s really motivating to be part of such a positive and helpful environment.",
      rating: 5,
      img: user3,
    },
  ];

  return (
    <React.Fragment>
      <NavBar />

      
      <div className="relative w-full">
        <img
          src="https://img.freepik.com/premium-photo/person-coding-computer-vibrant-gradient-background-focusing-programming-text-displayed-monitor_923559-28370.jpg?w=1380"
          alt=""
          className="w-full h-72 object-cover"
        />
        <div className="absolute px-8 top-1/2 left-8 transform -translate-y-1/2 space-y-2">
          <p className="text-3xl text-white">Welcome to the coding world</p>
          <p className="text-sm text-white text-center mt-3">
            Innovate. Code. Repeat.
            <br />
            Turning ideas into reality, one line at a time.
          </p>

          <div className="flex justify-center">
            <button
              className="bg-white text-gray-800 text-md mt-3 rounded-lg p-2 transition ease-in-out delay-150 hover:bg-blue-500"
              onClick={() => {
                navigate("/problems");
              }}
            >
              Go to Problems{" "}
              <FontAwesomeIcon
                icon={faArrowRight}
                className="ml-1 text-sm"
              ></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>

      <div className="flex mt-10 px-16">
        <p className="text-lg text-blue-900 w-1/2">
          A coding website serves as a dynamic platform designed to empower
          individuals to learn, practice, and master programming skills. It
          provides a comprehensive range of resources, including interactive
          coding challenges, expert-led tutorials, and real-world projects,
          catering to learners of all levels, from beginners to advanced
          developers. These platforms often foster a collaborative environment
          by integrating community support, where users can connect, share
          insights, and troubleshoot issues together. With features like skill
          assessments, portfolio-building opportunities, and up-to-date industry
          trends, a coding website becomes a one-stop solution for anyone
          aspiring to excel in the ever-evolving world of technology
        </p>
        <img
          src={codingImg}
          alt=""
          className="h-80 ml-40 w-80 object-contain"
        />
      </div>

      <div class="bg-gray-500 mt-16 h-full">
        <div class="pt-16"></div>

        <h1 class="text-3xl text-center font-bold text-white px-8 sm:px-12 lg:px-20">
          We provide
        </h1>

        <div class="grid grid-cols-4 gap-8 mt-10 px-8 sm:px-12 lg:px-20">
          {features.map((feature) => (
            <div class="bg-gray-100 border-gray-300 p-6 rounded">
              <div class="mb-5">
                <FontAwesomeIcon
                  icon={feature.icon}
                  className="text-left text-2xl text-blue-400"
                ></FontAwesomeIcon>
                <p class="text-xl font-semibold mt-2">{feature.title}</p>
              </div>

              <p class="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div class="pb-16"></div>
      </div>
    </React.Fragment>
  );
};

export default Home;
