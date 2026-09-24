export function calculateIMC(peso, alturaCentimetros) {
  const heightInMeters = alturaCentimetros / 100;
  const value = peso / (heightInMeters * heightInMeters);

  if (value < 18.5 || value >= 30) {
    return {
      value: value.toFixed(1),
      emoji: value < 18.5 ? "😕" : "⚠️",
      message:
        value < 18.5
          ? "Seu IMC está abaixo da média."
          : "Seu IMC está acima da média.",
      tone: "warning",
    };
  }

  if (value < 25) {
    return {
      value: value.toFixed(1),
      emoji: "😊",
      message: "Seu IMC está bom.",
      tone: "good",
    };
  }

  return {
    value: value.toFixed(1),
    emoji: "🙂",
    message: "Seu IMC está na média.",
    tone: "average",
  };
}

export function calculateTMB(peso, alturaCentimetros, idade, sexo) {
  const ajusteSexo = sexo === "masculino" ? 5 : -161;
  const value = 10 * peso + 6.25 * alturaCentimetros - 5 * idade + ajusteSexo;

  if (value < 1200) {
    return {
      value: value.toFixed(0),
      emoji: "🔋",
      message: "Sua estimativa de gasto energético é baixa.",
      tone: "warning",
    };
  }

  if (value <= 1800) {
    return {
      value: value.toFixed(0),
      emoji: "⚡",
      message: "Sua estimativa de gasto energético está na média.",
      tone: "average",
    };
  }

  return {
    value: value.toFixed(0),
    emoji: "🔥",
    message: "Sua estimativa de gasto energético é alta.",
    tone: "good",
  };
}
