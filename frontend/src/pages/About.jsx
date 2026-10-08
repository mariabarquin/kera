import React from "react";

export default function About() {
  return (
    <main className="about-page">
      {/* 1. SECCIÓN HERO / PORTADA */}
      <section className="about-hero">
        <div className="hero-image-container">
          <img
            src="https://cdn.cosmos.so/ad7e979f-2531-4ae5-a370-a3bce35f6071?format=webp"
            alt="Kera Hero"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hero-logo">kera</h1>
          </div>
        </div>
      </section>

      {/* 2. CITA EDITORIAL */}
      <section className="about-quote-section">
        <blockquote className="about-quote">
          “Creamos fórmulas respetuosas nacidas del ritmo de la naturaleza, 
          diseñadas para devolver la calma y la intención a tu rutina diaria.”
        </blockquote>
      </section>

      {/* 3. COMPOSICIÓN 3 COLUMNAS */}
      <section className="about-grid-section">
        <div className="about-grid">
          {/* Columna 1: Imagen */}
          <div className="grid-column image-column">
            <img
              src="https://cdn.cosmos.so/a047859d-5b31-47c6-8569-21d8937ebbdc?format=webp"
              alt="Kera Formulation"
            />
          </div>

          {/* Columna 2: Imagen con desplazamiento sutil */}
          <div className="grid-column image-column offset-image">
            <img
              src="https://cdn.cosmos.so/ed24c12d-8f12-42bd-9dbd-df7cc3eb6b9e?format=webp"
              alt="Kera Detail"
            />
          </div>

          {/* Columna 3: Texto e Historia + Redes */}
          <div className="grid-column text-column">
            <div className="column-content">
              <h2>Nuestra Filosofía</h2>
              <p>
                KERA nace con la misión de simplificar el cuidado personal a través de
                ingredientes naturales cuidadosamente seleccionados. Creemos en una
                cosmética transparente, consciente y libre de excesos.
              </p>
              <p>
                Cada producto es el resultado de un proceso artesanal donde cada
                detalle cuenta, desde el origen de la materia prima hasta la forma
                en que llega a tus manos.
              </p>

              <div className="about-socials">
                <span className="socials-title">SÍGUENOS</span>
                <div className="social-links">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer">
                    Pinterest
                  </a>
                  <a href="https://vimeo.com" target="_blank" rel="noreferrer">
                    Vimeo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}