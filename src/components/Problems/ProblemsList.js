import React, { useState, useEffect } from "react";
import questions from "../../public/data/questions.json";
import { useNavigate } from "react-router-dom";
import problemsImg from "../../assets/problems.jpg";

const ProblemsList = () => {
  const navigate = useNavigate();

  const allQuestions = [
    ...questions.easy,
    ...questions.medium,
    ...questions.hard,
  ];

  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [submittedQuestionIds, setSubmittedQuestionIds] = useState([]);
  const entriesPerPage = 15;

  useEffect(() => {
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);

    const user = JSON.parse(localStorage.getItem("LoggedinUser"));
    const submissions = JSON.parse(localStorage.getItem("submissions")) || {};
    if (user?.id && submissions[user.id]) {
      const userSubmissions = submissions[user.id].map((q) => q.questionId);
      setSubmittedQuestionIds(userSubmissions);
    }

    setDisplayedQuestions(shuffledQuestions);
  }, []);

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedQuestions = [...displayedQuestions].sort((a, b) => {
      const difficultyA = a.difficulty || "";
      const difficultyB = b.difficulty || "";

      if (newSortOrder === "asc") {
        return difficultyA.localeCompare(difficultyB);
      } else {
        return difficultyB.localeCompare(difficultyA);
      }
    });
    setSortOrder(newSortOrder);
    setDisplayedQuestions(sortedQuestions);
  };

  const difficultyColor = (difficulty) => {
    let colorClass = "";
    if (difficulty === "easy") {
      colorClass = "text-green-600";
    } else if (difficulty === "medium") {
      colorClass = "text-yellow-600";
    } else {
      colorClass = "text-red-600";
    }

    return <span className={colorClass}>{difficulty}</span>;
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = displayedQuestions.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(displayedQuestions.length / entriesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="flex w-full overflow-hidden pl-28 py-5">
        <p className="text-gray-800 text-xl w-[80%]">
          Embark on your coding journey today! Whether you're solving problems,
          building projects, or learning new skills, every step brings you
          closer to unlocking endless possibilities in the world of technology.
          Let’s dive in and create something amazing together!
        </p>
        <img
          src={problemsImg}
          className="h-60 w-full object-contain ml-40"
          alt="Image 2"
        />
      </div>

      <p className="text-3xl font-bold text-center py-10">
        <i>
          "Innovate. Code. Repeat.. Transform ideas into reality, one line at a
          time!"
        </i>
      </p>

      <div className="container mt-4">
        <p className="text-4xl font-bold text-gray-800">Let's get started</p>
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>S No.</th>
              <th>Title</th>
              <th>
                Difficulty
                <i
                  className="pi pi-sort ms-2 cursor-pointer"
                  onClick={handleSort}
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((question, index) => (
              <tr key={index}>
                <td>{indexOfFirstEntry + index + 1}</td>
                <td
                  className="hover:bg-gray-200 cursor-pointer flex justify-between"
                  onClick={() => {
                    navigate(`./${question.difficulty}/${question.id}`);
                  }}
                >
                  {question.title}
                  {submittedQuestionIds.includes(question.id) && (
                    <i className="text-green-500 pi pi-check-circle text-xl" title="Submitted" />
                  )}
                </td>
                <td>{difficultyColor(question.difficulty)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination rounded-xl">
              {[...Array(totalPages).keys()].map((page) => (
                <li
                  key={page}
                  className={`page-item ${
                    currentPage === page + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProblemsList;
