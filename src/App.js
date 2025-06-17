import React, { useState } from "react";

const quizData = [
  {
    question: "前転で気をつけることは？",
    options: ["目を閉じる", "あごを引く", "手を広げる", "ジャンプする"],
    answer: "あごを引く",
  },
  {
    question: "跳び箱の踏み切りで使うのは？",
    options: ["ひざ", "手", "足", "おしり"],
    answer: "足",
  },
];

function App() {
  const [q, setQ] = useState(0);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false);

  const checkAnswer = (option) => {
    if (option === quizData[q].answer) setScore(score + 1);
    if (q + 1 < quizData.length) setQ(q + 1);
    else setEnd(true);
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>WiNG GYM クイズ</h1>
      {end ? (
        <h2>スコア: {score} / {quizData.length}</h2>
      ) : (
        <>
          <h2>{quizData[q].question}</h2>
          {quizData[q].options.map((op) => (
            <button
              key={op}
              onClick={() => checkAnswer(op)}
              style={{
                margin: 10,
                padding: 10,
                fontSize: 16,
                background: "#4dd0e1",
                border: "none",
                color: "white",
                borderRadius: 8,
              }}
            >
              {op}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
