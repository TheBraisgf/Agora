// Components
import NavBar from "../components/NavBar";
import logoAgora from "../assets/img/logoAgora.png"; // Importa el logo

function MainPage() {
  return (
    <main className="mainPage">
      {/* <NavBar /> */}
      <div className="hero-section">
        <img src={logoAgora} alt="Logo del Ágora" className="logoAgora" />

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
        <div className="links-section">
        <h2>¡Únete a nosotros!</h2>
        <ul>
          <li>
            <a href="https://www.eventbrite.com/e/entradas-agora-1-1002258982597?aff=ebdsshother&utm_share_source=listing_android" target="_blank" rel="noopener noreferrer">
              Evento en Eventbrite
            </a>
          </li>
          <li>
            <a href="https://chat.whatsapp.com/BvngxgKN7bJA9nrtwXz4GU" target="_blank" rel="noopener noreferrer">
              Grupo de WhatsApp
            </a>
          </li>
          <li>
            <a href="https://discord.gg/UTyxH5SD" target="_blank" rel="noopener noreferrer">
              Grupo de Discord
            </a>
          </li>
        </ul>
      </div>
      </div>
      <footer> Ⓒ2024 Agora Group - WEB IN PROGRESS</footer>
    </main>
  );
}

export default MainPage;
