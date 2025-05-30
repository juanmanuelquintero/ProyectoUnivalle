import React, { useState } from "react";
import "./Adminlogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="contenedorLOGIN">
      <div className="contenedor2LOGIN">
        <label className="labelLOGIN">LOGIN</label>
      </div>
      <input
        className="inputsLOGIN"
        placeholder="Codigo"
        value={Codigo}
        onChange={(e) => setCodigo(e.target.value)}
        onKeyDown={EntrarInput}
        style={{ position: "absolute", top: "25%", left: "30%" }}
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
          style={{ position: "absolute", top: "45%", left: "30%" }}
        />
      </form>

      <button
        className="botonLOGIN"
        onClick={Ingresar}
        style={{ position: "absolute", top: "65%", left: "38%" }}
      >
        Ingresar
      </button>
      <img
        src="./logoUnivalle.jpg"
        style={{
          position: "absolute",
          top: "75%",
          left: "78%",
          width: "110px",
          height: "160px",
          opacity: "0.9",
        }}
      />
    </div>
  );
}

export default LoginAdmin;
