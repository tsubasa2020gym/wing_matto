import React, { useState, useEffect } from "react";

const quizData = [
  {
    question: "前転で気をつけることはどこ？",
    options: ["目を閉じる", "あごを引く", "手を広げる", "ジャンプする"],
    answer: "あごを引く",
    explanation: "前転はあごをしっかり引いて頭を守ることが大切です。",
  },
  {
    question: "跳び箱の踏み切りで使うのは？",
    options: ["ひざ", "手", "足", "おしり"],
    answer: "足",
    explanation: "踏み切りは足で地面を強く蹴ることで跳び上がります。",
  },
  {
    question: "倒立と逆立ちの違い？",
    options: ["ひざ", "手", "足", "おしり"],
    answer: "足",
    explanation: "踏み切りは足で地面を強く蹴ることで跳び上がります。",
    video: "https://www.youtube.com/embed/Mlpiser4ZS4?feature",
  },
];

function App() {
  const [q, setQ] = useState(0);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("score");
    return saved ? Number(saved) : 0;
  });
  const [wrongQuestions, setWrongQuestions] = useState(() => {
    const saved = localStorage.getItem("wrongQuestions");
    return saved ? JSON.parse(saved) : [];
  });
  const [end, setEnd] = useState(() => {
    const saved = localStorage.getItem("quizFinished");
    return saved === "true";
  });

  const checkAnswer = (option) => {
    if (option === quizData[q].answer) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("score", newScore);
    } else {
      const updatedWrong = [
        ...wrongQuestions,
        {
          question: quizData[q].question,
          answer: quizData[q].answer,
          explanation: quizData[q].explanation,
          selected: option,
        },
      ];
      setWrongQuestions(updatedWrong);
      localStorage.setItem("wrongQuestions", JSON.stringify(updatedWrong));
    }

    if (q + 1 < quizData.length) {
      setQ(q + 1);
    } else {
      setEnd(true);
      localStorage.setItem("quizFinished", "true");
    }
  };

  const resetQuiz = () => {
    localStorage.removeItem("score");
    localStorage.removeItem("wrongQuestions");
    localStorage.removeItem("quizFinished");
    setScore(0);
    setWrongQuestions([]);
    setQ(0);
    setEnd(false);
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>WiNG GYM マット編</h1>

      {end ? (
        <>
          <h2>スコア: {score} / {quizData.length}</h2>

          {wrongQuestions.length > 0 && (
            <>
              <h3>間違えた問題と解説</h3>
              <ul style={{ textAlign: "left", maxWidth: 500, margin: "0 auto" }}>
                {wrongQuestions.map((item, i) => (
                  <li key={i} style={{ marginBottom: 20 }}>
                    <strong>問題：</strong> {item.question}<br />
                    <strong>あなたの答え：</strong> <span style={{ color: "red" }}>{item.selected}</span><br />
                    <strong>正解：</strong> {item.answer}<br />
                    <strong>解説：</strong> {item.explanation}
                  </li>
                ))}
              </ul>
            </>
          )}

          <button
            onClick={resetQuiz}
            style={{
              marginTop: 20,
              padding: 10,
              background: "#f06292",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontSize: 16,
            }}
          >
            クイズをリセットして再挑戦！
          </button>
        </>
      ) : (
        <>
          <h2>問題{q + 1}：{quizData[q].question}</h2>

          {quizData[q].image && (
            <img
              src={quizData[q].image}
              alt="問題の画像"
              style={{ maxWidth: "100%", height: "auto", marginBottom: 20 }}
            />
          )}

          {quizData[q].video && (
            <div style={{ marginBottom: 20 }}>
              <iframe
                width="100%"
                height="200"
                src={quizData[q].video}
                title="動画"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

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
                width: "60%",
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

