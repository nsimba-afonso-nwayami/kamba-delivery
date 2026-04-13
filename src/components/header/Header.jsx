import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function Header() {

  return (
    <header>
      <Link to="/" className="logo">Kamba Delivery</Link>

      <nav className="navbar">
        <Link to="/">Início</Link>
        <HashLink to="/#como-funciona">Como Funciona</HashLink>
        <HashLink to="/#sou-solicitante">Sou Solicitante</HashLink>
        <HashLink to="/#sou-entregador">Sou Entregador</HashLink>
      </nav>

      <div className="fas fa-bars-staggered"></div>
    </header>
  );
}