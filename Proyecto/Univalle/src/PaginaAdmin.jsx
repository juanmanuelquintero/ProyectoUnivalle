import React from "react";
import "./PaginaAdmin.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function PaginaAdmin() {
  const { state } = useLocation();
  const navegar = useNavigate();
  const { Acceso } = state || "sin acceso";
  const Informacion =
    "\n\n Usted no tiene acceso a esta \n pagina, por favor vuelvase a logear";

  function Navegar() {
    navegar("/AdminLogin");
  }

  function GenerarReporteExcel() {
    axios
      .get(`http://127.0.0.1:8000/api/asistencia/`)
      .then((Response) => {
        const datos = Response.data;

        const work = XLSX.utils.json_to_sheet(datos);
        const hojaTrabajo = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(hojaTrabajo, work, "asistencia");

        const Excel = XLSX.write(hojaTrabajo, {
          bookType: "xlsx",
          type: "array",
        });

        const Archivo = new Blob([Excel], { type: "application/octet-stream" });
        saveAs(Archivo, "Repote_asistencia.xlsx");
      })

      .catch((Error) => {
        console.log("Error descargando reporte:", Error);
      });
  }

  if (Acceso !== "permitido") {
    return (
      <div className="contenedor3PaginaAD">
        <div className="contenedor4PaginaAD">
          <textarea className="textareaPaginaAD" readOnly value={Informacion} />
          <button
            className="botonPaginaAD"
            onClick={Navegar}
            style={{
              position: "absolute",
              top: "80%",
              left: "40%",
              width: "100px",
              height: "40px",
              fontSize: "13px",
            }}
          >
            Regresar
          </button>
          <div className="contenedor5PaginaAD">
            <label className="labelPaginaAD">Informacion</label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contenedorPaginaAD">
      <div className="contenedor2PaginaAD">
        <label className="labelPaginaAD">PaginaAD</label>
      </div>
      <button
        className="botonPaginaAD"
        onClick={GenerarReporteExcel}
        style={{
          position: "absolute",
          top: "25%",
          left: "35%",
          width: "200px",
          height: "80px",
          fontSize: "22px",
        }}
      >
        Generar reporte
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

export default PaginaAdmin;
