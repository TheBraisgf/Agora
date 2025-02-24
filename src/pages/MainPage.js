import React, { useState, useEffect } from "react";
import questionsData from "../assets/questions.json";
import "../styles/pages/_MainPage.scss";
import logoAgora from "../assets/img/logoAgora.png";

const PASSING_SCORE = 16;

function MainPage() {
  let [step, setStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState(
    Array(questionsData.length).fill(null)
  );
  const [finished, setFinished] = useState(false);
  if (step === 2 && navigator.vibrate) {
    navigator.vibrate(200);
  }

  if (localStorage.getItem("failedAgoraQuiz")) {
    step = 3;
  }

  useEffect(() => {
    // Exponer palabras mágicas al window para que sean accesibles en consola
    window.RESET_WORD = "renascitur";
    window.DARK_MODE_WORD = "darkmode";
    window.MATRIX_WORD = "thematrix";
    window.ARCONTE_WORD = "arconte";
    window.CHAOS_WORD = "chaos";
    window.consoleInput = ""; // Variable donde el usuario escribirá en la consola

    console.log(
      "%c⚖️ EL ARCONTE TE OBSERVA... ⚖️",
      "color: gold; font-size: 18px; font-weight: bold;"
    );
    console.log(
      "%cEscribe una palabra mágica y presiona Enter...",
      "color: darkgreen; font-size: 16px;"
    );
    console.log(
      "%cPrueba con: %cwindow.consoleInput = 'tupalabramagica'",
      "color: gray; font-size: 14px;",
      "color: red; font-size: 14px; font-weight: bold;"
    );

    // Observar cambios en `window.consoleInput`
    Object.defineProperty(window, "consoleInput", {
      set: function (word) {
        if (typeof word !== "string") return;

        word = word.toLowerCase().trim();

        if (word === window.RESET_WORD) {
          localStorage.removeItem("failedAgoraQuiz");
          console.log(
            "%c🔥 Como un Fénix, has renacido. Vuelve a intentarlo.",
            "color: gold; font-size: 16px;"
          );
        } else if (word === window.DARK_MODE_WORD) {
          document.body.classList.toggle("dark-mode");
          console.log(
            "%c🌑 Modo Oscuro Activado",
            "color: cyan; font-size: 16px;"
          );
        } else if (word === window.MATRIX_WORD) {
          document.body.style.background = "black";
          document.body.style.color = "lime";
          console.log(
            "%c☠️ Bienvenido a la realidad...",
            "color: lime; font-size: 16px;"
          );
        } else if (word === window.ARCONTE_WORD) {
          console.log(
            "%c📜 Una voz susurra en la oscuridad... %c“Los verdaderos elegidos verán más allá del velo...”",
            "color: purple; font-size: 16px;",
            "color: cyan; font-size: 16px; font-style: italic;"
          );
        } else if (word === window.CHAOS_WORD) {
          document.body.style.transform = "rotate(180deg)";
          document.body.style.transition = "transform 0.8s ease-in-out";
          console.log(
            "%c💀 El orden se ha perdido...",
            "color: red; font-size: 16px;"
          );
        } else {
          console.log(
            "%c❌ Palabra desconocida... ¿Seguro que eres digno?",
            "color: gray; font-size: 16px;"
          );
        }
      },
    });
  }, []);

  const handleAnswer = (optionIndex) => {
    const updatedAnswers = [...answers];
    const previousAnswer = answers[currentQuestion];
    updatedAnswers[currentQuestion] = optionIndex;
    setAnswers(updatedAnswers);

    let newScore = score;
    if (previousAnswer === null) {
      newScore += questionsData[currentQuestion].points[optionIndex];
    } else {
      newScore =
        newScore -
        questionsData[currentQuestion].points[previousAnswer] +
        questionsData[currentQuestion].points[optionIndex];
    }
    setScore(newScore);

    if (currentQuestion < questionsData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinished(true);
      if (newScore >= PASSING_SCORE) {
        setStep(2);
      } else {
        setStep(3);
        localStorage.setItem("failedAgoraQuiz", "true");
      }
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  step = 2;
  return (
    <div className="mainPage">
      <img src={logoAgora} alt="Logo del Ágora" className="logoAgora" />

      {step === 0 && (
        <div className="intro">
          <h1 className="main-title">¿Eres digno de entrar al Ágora?</h1>
          <p className="main-description">
            Una voz profunda resuena en tu mente... "Solo aquellos con el
            conocimiento y la curiosidad suficientes pueden cruzar estas
            puertas..."
          </p>
          <button onClick={() => setStep(1)} className="start-button">
            Estoy listo para la prueba
          </button>
          <footer>Ⓒ2024 Ágora Group</footer>
        </div>
      )}

      {step === 1 && !finished && (
        <div className="quiz">
          <h2 className="progress">
            Pregunta {currentQuestion + 1} / {questionsData.length}
          </h2>
          <div className="question-card">
            <p>{questionsData[currentQuestion].question}</p>
            {questionsData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="answer-button"
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button onClick={goBack} className="back-button">
                Atrás
              </button>
            )}
          </div>
          <footer>Ⓒ2024 Ágora Group</footer>
        </div>
      )}

      {step === 2 && (
        <div className="result accepted">
          <h2>⚡EL ARCONTE TE SALUDA⚡</h2>

          <p className="arconte-message">
            <strong>
              Has demostrado ser digno. Tu conocimiento, tu curiosidad y tu
              espíritu te han abierto las puertas del Ágora. Pocos logran llegar
              hasta aquí... pero la verdadera prueba comienza ahora.
            </strong>
          </p>

          <h3>📖 ¿Qué es el Ágora?</h3>
          <p>
            <strong>El Ágora es un refugio para los que buscan más.</strong> No
            es solo un grupo, sino un punto de encuentro para aquellos que aman
            el conocimiento, la tecnología, la filosofía, la literatura, el
            cine, los videojuegos y el aprendizaje en todas sus formas. Aquí no
            hay espacio para la mediocridad ni el conformismo.
          </p>

          <h3>⚖️ ¿Cómo funciona?</h3>
          <p>
            Somos una comunidad en crecimiento, aún no somos muchos, pero cada
            miembro cuenta. Nos reunimos en <strong>WhatsApp y Discord</strong>"
            para compartir ideas, debatir y organizarnos. No es un grupo de
            memes ni de spam. Aquí valoramos el
            <strong>pensamiento, la creatividad y la curiosidad.</strong>
          </p>

          <h3>📜 ¿Qué esperamos de ti?</h3>
          <ul>
            <li>
              🔥 <strong>Preséntate</strong> al entrar. No somos tantos aún, así
              que cada voz es importante.
            </li>
            <li>
              🧠 <strong>Comparte ideas, preguntas y conocimientos.</strong> No
              tengas miedo de hablar.
            </li>
            <li>
              ⚔️ <strong>Sé parte de la construcción de este lugar.</strong>{" "}
              Ayúdanos a hacer del Ágora una comunidad vibrante.
            </li>
          </ul>

          <h3>⚔️ Código de Honor del Ágora</h3>
          <p className="arconte-message">
            <strong>
              {" "}
              "Buscamos la verdad, no el dogma. Cuestionamos todo, incluso a
              nosotros mismos. Aprendemos, compartimos, crecemos. El Ágora no es
              un lugar, es quienes lo habitan."
            </strong>
          </p>

          <h3>🔗 Únete ahora:</h3>
          <div className="join-buttons">
            <a
              href="https://chat.whatsapp.com/BvngxgKN7bJA9nrtwXz4GU"
              target="_blank"
              className="whatsapp"
              rel="noreferrer"
            >
              📲 Unirme a WhatsApp
            </a>
            <a
              href="https://discord.gg/UTyxH5SD"
              target="_blank"
              className="discord"
              rel="noreferrer"
            >
              🎙️ Unirme a Discord
            </a>
            <a
              href="https://www.tiktok.com/@theagorahub"
              target="_blank"
              className="tiktok"
              rel="noreferrer"
            >
              📷 Tiktok
            </a>
          </div>
          <footer>Ⓒ2024 Ágora Group</footer>
        </div>
      )}

      {step === 3 && (
        <div className="result rejected">
          <h2>🔥 ¡NO HAS SIDO ELEGIDO! 🔥</h2>
          <p>
            "Tu espíritu no ha demostrado la chispa necesaria para cruzar estas
            puertas. Tal vez tu mente aún no ha despertado, tal vez prefieres
            las corrientes cómodas del conformismo, o quizás simplemente no es
            tu camino.
          </p>
          <p>
            Regresa a tu mundo y evoluciona, aprende y experimenta. Aquí
            buscamos curiosos, creadores, exploradores del conocimiento… y tú,
            hoy, no eres uno de ellos."
          </p>
          <p className="burning-text">
            El fuego del juicio consume tus expectativas, dejándote solo con la
            duda…
          </p>
          <footer>Ⓒ2024 Ágora Group</footer>
        </div>
      )}
    </div>
  );
}

export default MainPage;
