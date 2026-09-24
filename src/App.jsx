import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import UIButton from "./components/UIButton.jsx";
import UIInput from "./components/UIInput.jsx";
import UINavbar from "./components/UINavbar.jsx";
import UIResultCard from "./components/UIResultCard.jsx";
import { calculateIMC, calculateTMB } from "./utils/calculations.js";

function App() {
  const [form, setForm] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const weight = Number(form.weight);
    const height = Number(form.height);
    const age = Number(form.age);
    const gender = form.gender;

    if (!weight || !height || !age || !gender || weight <= 0 || height <= 0 || age <= 0) {
      setError("Informe peso, altura, idade e sexo corretamente.");
      setResult(null);
      return;
    }

    setResult([
      { name: "IMC", ...calculateIMC(weight, height) },
      { name: "TMB", ...calculateTMB(weight, height, age, gender) },
    ]);
  }

  async function handleExport() {
    if (!resultRef.current || !result) return;
    const canvas = await html2canvas(resultRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png"),
    );
    const file = new File([blob], "resultado-fakenatty.png", {
      type: "image/png",
    });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        title: "Meu resultado no FakeNatty",
        files: [file],
      });
      return;
    }

    const link = document.createElement("a");
    link.download = file.name;
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
    window.open(
      `https://wa.me/?text=${encodeURIComponent(`Meu resultado no FakeNatty`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="app-shell">
      <UINavbar />
      <main className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <header className="page-heading mb-4">
              <p className="eyebrow">Avaliação rápida</p>
              <h1>Descubra seus índices corporais</h1>
              <p className="lead">Preencha seus dados para gerar os índices.</p>
            </header>

            <div className="calculator-card">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-12 col-md-6">
                    <UIInput
                      label="Peso"
                      name="weight"
                      value={form.weight}
                      onChange={handleChange}
                      placeholder="Ex.: 70"
                      help="Informe seu peso atual em quilogramas (kg)."
                      min="1"
                      step="0.1"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <UIInput
                      label="Altura"
                      name="height"
                      value={form.height}
                      onChange={handleChange}
                      placeholder="Ex.: 175"
                      help="A altura deve ser informada em centímetros (cm)."
                      min="1"
                      step="0.1"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <UIInput
                      label="Idade"
                      name="age"
                      value={form.age}
                      onChange={handleChange}
                      placeholder="Ex.: 20"
                      help="Informe sua idade em anos."
                      min="1"
                      step="1"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <UIInput
                      label="Sexo"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      help="Selecione seu sexo."
                      options={[
                        { value: "masculino", label: "Masculino" },
                        { value: "feminino", label: "Feminino" },
                      ]}
                    />
                  </div>
                </div>
                {error && (
                  <div className="alert alert-danger mt-4 mb-0" role="alert">
                    {error}
                  </div>
                )}
                <UIButton
                  type="submit"
                  icon="calculator"
                  className="w-100 mt-4"
                >
                  Calcular
                </UIButton>
              </form>

              <div ref={resultRef} className={result ? "mt-4" : ""}>
                <UIResultCard result={result} />
              </div>

              {result && (
                <UIButton
                  icon="whatsapp"
                  variant="outline-success"
                  className="w-100 mt-3"
                  onClick={handleExport}
                >
                  Exportar e enviar para o WhatsApp
                </UIButton>
              )}
            </div>
            <p className="disclaimer mt-4">
              <i className="bi bi-info-circle me-2" />
              Colocar um aviso legal aqui. nao quero ser processado lol
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
