import React, { useState } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers } = question;
  const [selectedCorrectIndex, setSelectedCorrectIndex] = useState(question.correctIndex);

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleCorrectIndexChange(e) {
    const newIndex = parseInt(e.target.value);

    setSelectedCorrectIndex(newIndex);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onUpdate(updatedQuestion));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedCorrectIndex} onChange={handleCorrectIndexChange}>
          {answers.map((ans, idx) => (
            <option key={idx} value={idx}>
              {ans}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
