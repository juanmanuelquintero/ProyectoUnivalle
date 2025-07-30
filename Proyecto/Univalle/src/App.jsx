import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const ahora = new Date();
  const offset = ahora.getTimezoneOffset(); // minutos de desfase UTC
  const fechaColombia = new Date(ahora.getTime() - offset * 60000);
  const fechaFormateada = fechaColombia.toISOString(); // ¡ya está en hora local!

  // Usar esta fecha para PATCH o POST

  const [Codigo, setCodigo] = useState("");
  const [Informacion, setInformacion] = useState([]);
  const [bandera, setBandera] = useState("False");
  const navegar = useNavigate();
  const [ip, setip] = useState("");
  let [inOu, setInOu] = useState("Entrada");
  const [entradas, setEntradas] = useState(0);

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setip(data.ip))
      .catch(() => setip("No se pudo obtener"));
  }, []);

  function Ip() {
    console.log(ip);
  }

  useEffect(() => {
    contarEntradas();
  }, []);

  useEffect(() => {
    if (Codigo.length === 9) {
      Estudiante();
    }
  }, [Codigo]);

  function Estudiante() {
    if (!Codigo) return;

    axios
      .get(`http://127.0.0.1:8000/api/usuarios/${Codigo}`)
      .then((Response) => {
        const datosUsuario = Response.data;
        setInformacion(datosUsuario);

        // Determinar tipo de movimiento (Entrada o Salida)
        const entradaOSalida =
          datosUsuario.bandera === "FALSE" ? "Entrada" : "Salida";

        // Buscar si ya existe asistencia del estudiante
        axios
          .get(`http://127.0.0.1:8000/api/asistencia/?codigo=${Codigo}`)
          .then((res) => {
            const asistencia = res.data;

            // Datos comunes para PATCH o POST
            const datosAsistencia = {
              ES: entradaOSalida,
              fecha: fechaFormateada,
              IP: ip,
              codigo: Codigo, // Requerido para POST
            };

            if (asistencia.length > 0) {
              // Existe asistencia → hacer PATCH
              const id_actualizar = asistencia[0].id;

              axios
                .patch(
                  `http://127.0.0.1:8000/api/asistencia/${id_actualizar}/`,
                  datosAsistencia
                )
                .then(() => {
                  setBandera("TRUE");
                  CambiarBandera(
                    datosUsuario.bandera === "FALSE" ? "TRUE" : "FALSE"
                  );
                  setInOu(entradaOSalida);
                  contarEntradas();
                })
                .catch((err) => {
                  console.error("Error actualizando asistencia", err);
                });
            } else {
              // No existe → crear nueva asistencia con POST
              axios
                .post(`http://127.0.0.1:8000/api/asistencia/`, datosAsistencia)
                .then(() => {
                  setBandera("TRUE");
                  CambiarBandera(
                    datosUsuario.bandera === "FALSE" ? "TRUE" : "FALSE"
                  );
                  setInOu(entradaOSalida);
                  contarEntradas();
                })
                .catch((err) => {
                  console.error("Error creando asistencia", err);
                });
            }
          })
          .catch((err) => {
            console.error("Error buscando asistencia", err);
          });
      })
      .catch(() => {
        alert("El usuario no existe");
        setInformacion([]);
        setCodigo("");
      });
  }

  /*
    function Estudiante() {
    if (Codigo) {
      axios
        .get(`http://127.0.0.1:8000/api/usuarios/${Codigo}`)
        .then((Response) => {
          const datos = Response.data;
          setInformacion(Response.data);
          if (datos.bandera === "FALSE") {
            inOu= "Entrada";
            axios
              .post(`http://127.0.0.1:8000/api/asistencia/`, {
                codigo: Codigo,
                ES: "Entrada",
                IP: ip,
                
              })
              .then(() => {
                setBandera("TRUE");
                CambiarBandera("TRUE");
                setInOu("Entrada");
                contarEntradas();
              })
              .catch((Error) => {
                console.log(Error);
              });
          } else if (datos.bandera === "TRUE") {
            inOu= "Entrada";
            axios
              .post(`http://127.0.0.1:8000/api/asistencia/`, {
                codigo: Codigo,
                ES: "Salida",
                IP: ip,
              })
              .then(() => {
                setBandera("False");
                CambiarBandera("FALSE");
                setInOu("Salida");
                contarEntradas();
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
  */

  function Navegar() {
    navegar("/");
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

  function contarEntradas() {
    axios
      .get("http://127.0.0.1:8000/api/asistencia/")
      .then((response) => {
        const datos = response.data;
        const totalEntradas = datos.filter(
          (registro) => registro.ES === "Entrada"
        ).length;
        setEntradas(totalEntradas);
      })
      .catch((error) => {
        console.error("Error al contar las entradas:", error);
      });
  }

  return (
    <div>
      <div
        className="contenedor2"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0, 2%, 15%", // opcional: agrega espacio lateral
        }}
      >
        <img
          src="./logoUnivalle.jpg"
          style={{
            width: "50px",
            height: "70px",
          }}
        />
        <label className="label1">Sistema de Ingreso Estudiantil</label>

        <label className="label1">Total Estudiantes: {entradas}</label>
      </div>
      <div className="contenedor1">
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
            top: "5%",
            left: "35%",
            fontSize: "30px",
          }}
        >
          Información del Estudiante
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
                }\n\nRol: ${Informacion.tipo_usuario}\n\nEstado: ${inOu}`
              : ""
          }
          readOnly
          style={{ position: "absolute", top: "15%", left: "25%" }}
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
          style={{ position: "absolute", top: "92%", left: "5%" }}
        >
          pagina Loguin
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
    </div>
  );
}

export default App;
