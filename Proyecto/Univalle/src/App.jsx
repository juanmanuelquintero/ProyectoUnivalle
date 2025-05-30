import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [Codigo, setCodigo] = useState("");
  const [Informacion, setInformacion] = useState([]);
  const [bandera, setBandera] = useState("False");
  const navegar = useNavigate();

  useEffect(() => {
    if (Codigo.length === 9) {
      Estudiante();
    }
  }, [Codigo]);

  function Estudiante() {
    if (Codigo) {
      axios
        .get(`http://127.0.0.1:8000/api/usuarios/${Codigo}`)
        .then((Response) => {
          const datos = Response.data;
          setInformacion(Response.data);
          if (datos.bandera === "FALSE") {
            axios
              .post(`http://127.0.0.1:8000/api/asistencia/`, {
                codigo: Codigo,
                ES: "Entrada",
              })
              .then(() => {
                setBandera("TRUE");
                CambiarBandera("TRUE");
              })
              .catch((Error) => {
                console.log(Error);
              });
          } else if (datos.bandera === "TRUE") {
            axios
              .post(`http://127.0.0.1:8000/api/asistencia/`, {
                codigo: Codigo,
                ES: "Salida",
              })
              .then(() => {
                setBandera("False");
                CambiarBandera("FALSE");
              })
              .catch((Error) => {
                console.log(Error);
              });
          }
        })

        .catch(() => {
          alert("El usuario no existe");
          setInformacion([]);
          setCodigo("");
        });
    }
  }

  function Navegar() {
    navegar("/AdminLogin");
  }

  // function Post() {
  //   axios
  //     .post("http://127.0.0.1:8000/api/crear-admins/", {
  //       codigo: 200338741,
  //       nombre: "Cesar",
  //       apellido: "Penilla",
  //       contraseña: "Univalle",
  //       correo: "Cesar.penilla@correo.com",
  //     })

  //     .then(() => {
  //       alert("admin creado");
  //     })

  //     .catch((Error) => {
  //       console.log(Error);
  //     });
  // }

  function CambiarBandera(banderas) {
    axios
      .patch(`http://127.0.0.1:8000/api/usuarios/${Codigo}/`, {
        bandera: banderas,
      })
      .then(() => {
        console.log("se cambio la bandera");
        setCodigo("");
      })
      .catch((Error) => {
        console.log(Error);
        setCodigo("");
      });
  }

  function Limpiar() {
    setCodigo("");
    setInformacion([]);
  }

  return (
    <div className="contenedor1">
      <div className="contenedor2">
        <label className="label1">Sistema de ingreso estudiantil</label>
      </div>
      <img
        src="./logoUnivalle.jpg"
        style={{
          position: "absolute",
          top: "70%",
          left: "85%",
          width: "120px",
          height: "180px",
        }}
      />
      <label
        className="label2"
        style={{ position: "absolute", top: "15%", left: "3%" }}
      >
        Codigo Estudiantil
      </label>
      <label
        className="label2"
        style={{
          position: "absolute",
          top: "13%",
          left: "37%",
          fontSize: "30px",
        }}
      >
        Informacion Estudiante
      </label>
      <input
        className="inputs1"
        value={Codigo}
        onChange={(e) => setCodigo(e.target.value)}
        placeholder="Codigo"
        autoFocus
        style={{
          position: "absolute",
          top: "20%",
          left: "2%",
          fontSize: "20px",
        }}
      />
      <textarea
        className="tarea"
        value={
          Informacion.codigo
            ? `Código: ${Informacion.codigo}\n\nNombre: ${
                Informacion.nombre1
              } ${Informacion.nombre2 || ""}\n\nApellido: ${
                Informacion.apellido1
              } ${Informacion.apellido2 || ""}\n\nIndentificacion: ${
                Informacion.identificacion
              }\n\n${
                Informacion.programa ? `Programa:${Informacion.programa}` : ""
              }\n\nRol: ${Informacion.tipo_usuario}`
            : ""
        }
        readOnly
        style={{ position: "absolute", top: "20%", left: "25%" }}
      ></textarea>
      <img
        className={Informacion.foto ? "foto" : "none"}
        src={Informacion.foto}
        style={{
          position: "absolute",
          top: "30%",
          left: "83%",
          width: "160px",
          height: "190px",
        }}
      />
      <label
        className="label3"
        onClick={Navegar}
        style={{ position: "absolute", top: "95%", left: "5%" }}
      >
        Admin
      </label>
      <img
        className="barrer"
        onClick={Limpiar}
        src="./barriendo.png"
        style={{
          position: "absolute",
          top: "45%",
          left: "7%",
          width: "60px",
          height: "60px",
        }}
      />
    </div>
  );
}

export default App;
