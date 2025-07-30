import React, { useState } from "react";
import "./Adminlogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  inf1,
  inf2,
  inf3,
  inf4,
  inf5,
  inf6,
  inf7,
  inf8,
  inf9,
  inf10,
} from "./inf";

function LoginAdmin() {
  const navegar = useNavigate();
  const [Codigo, setCodigo] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const EntrarInput = (e) => {
    if (e.key == "Enter") {
      Ingresar();
    }
  };

  function Ingresar() {
    if (Codigo && Contraseña) {
      axios
        .post(`http://127.0.0.1:8000/api/login-admin/`, {
          codigo: Codigo,
          contraseña: Contraseña,
        })
        .then((Response) => {
          if (Response.data.mensaje == "Login exitoso") {
            navegar("/PaginaAdmin", { state: { Acceso: "permitido" } });
          }
        })
        .catch(() => {
          alert("error");
        });
    } else {
      alert("llene los campos");
    }
  }

  return (
    <div>
      <div className="contenedorinf">
        <div className="contenedorinf2">
          <h1>Universidad Del Valle</h1>
          <h4>{inf1}</h4>
          <h4>{inf2}</h4>
          <h4>{inf3}</h4>
          <h4>{inf4}</h4>
          <h4>{inf5}</h4>
          <h2>{inf6}</h2>
        </div>
        <div className="contenedorinf3">
          <h1>contacto</h1>
          <h4>{inf7}</h4>
          <h4>{inf8}</h4>
          <h4>{inf9}</h4>
          <h4>{inf10}</h4>
        </div>
      </div>
      <div className="contenedor2LOGIN">
        <div className="contenedorEncabezado">
          <img
            src="./logoUnivalle.jpg"
            style={{
              width: "50px",
              height: "70px",
              opacity: "0.9",
            }}
          />
          <label className="labelLOGIN" style={{ marginTop: "20px" }}>
            LOGIN
          </label>
        </div>
      </div>
      <div className="contenedorLOGIN">
        <input
          className="inputsLOGIN"
          placeholder="Codigo"
          value={Codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={EntrarInput}
        />
        <form>
          <input
            className="inputsLOGIN"
            placeholder="Contraseña"
            type="password"
            autoComplete="off"
            value={Contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            onKeyDown={EntrarInput}
          />
        </form>

        <button className="botonLOGIN" onClick={Ingresar}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default LoginAdmin;
