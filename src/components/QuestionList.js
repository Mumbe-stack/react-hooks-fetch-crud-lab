import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => {
        if (isMounted) setQuestions(data);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  function handleDelete(id) {
    setQuestions((questions) => questions.filter((q) => q.id !== id));
  }

  function handleUpdate(updatedQuestion) {
    setQuestions((questions) =>
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            question={q}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
