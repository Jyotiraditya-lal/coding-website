import { useParams } from "react-router-dom";
import IDE from "../IDE/IDE";
import React, { useEffect, useState } from "react";
import questions from "../../../public/data/questions.json";

const Problems = () => {
  const params = useParams();
  const [question, setQuestion] = useState(null);

  const allQuestions = [
    ...questions.easy,
    ...questions.medium,
    ...questions.hard,
  ];

  useEffect(() => {
    const filteredQuestion = allQuestions.filter(
      (q) => q.id === params.questionId
    );
    setQuestion(filteredQuestion[0]);
  }, [params.questionId]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <div className="flex w-full justify-between">
        <div className="w-2/3">
          <p className="text-3xl font-bold text-center py-10">
            {question.title}
          </p>
          <p className="text-xl px-5">{question.description}</p>
          <div className={`rounded-full text-white shadow-lg ${question.difficulty==='easy'? 'bg-green-500':''} ${question.difficulty==='medium'?'bg-yellow-500':''} ${question.difficulty==='hard'?'bg-red-500':''} w-min px-2 py-1 ml-12 mb-3`}>{question.difficulty}</div>
          {question.examples.map((ex, index) => (
            <div className="px-5" key={index}>
              <p className="text-xl font-bold">Example {index + 1}</p>
              <div className="flex">
                <p className="text-xl font-semibold">Input:</p>
                <p className="text-xl">
                  {typeof ex.input === "object"
                    ? JSON.stringify(ex.input)
                    : ex.input}
                </p>
              </div>
              <div className="flex">
                <p className="text-xl font-semibold">Output:</p>
                <p className="text-xl">
                  {typeof ex.output === "object"
                    ? JSON.stringify(ex.output)
                    : ex.output}
                </p>
              </div>
            </div>
          ))}
        </div>
        <IDE questionId={params.questionId} />
      </div>
    </React.Fragment>
  );
};

export default Problems;
