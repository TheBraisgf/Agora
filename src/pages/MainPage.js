//Assets
import backgroundImg from "../assets/img/templeback.jpg";

//Components
import NavBar from "../components/NavBar";

function MainPage() {
  return (
    <main className="mainPage">
      <NavBar />

      {/* Imagen de fondo */}
      <img src={backgroundImg} alt="Templo antiguo" className="backgroundImg" />

      {/* Título principal del grupo */}
      <div className="hero-section">
        <h1 className="main-title">Bienvenido al Ágora</h1>
        <p className="main-description">
          El Ágora es el espacio perfecto para personas que, como tú, tienen
          múltiples intereses y quieren disfrutar de diversas actividades
          culturales, juegos de mesa, deportes, y más. ¡Aquí todos los hobbies
          son bienvenidos y el conocimiento es compartido!
        </p>
        <p className="main-call-to-action">
          ¿Listo para conectar, divertirte y aprender? Únete a nosotros y
          descubre nuevas formas de disfrutar tus pasiones.
        </p>
      </div>
    </main>
  );
}

export default MainPage;
