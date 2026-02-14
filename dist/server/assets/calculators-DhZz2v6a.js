import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import "@tanstack/react-router";
import "lucide-react";
import "./router-DbyaQ_tD.js";
import "./use-medora-theme-BcdTr06G.js";
const CALCULATORS = [
  {
    id: "bmi",
    title: "Body Mass Index (BMI)",
    inputs: [
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "h", label: "Height (cm)", type: "number" }
    ],
    logic: (data) => {
      const h = data.h / 100;
      const bmi = data.w / (h * h);
      const category = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
      return `${bmi.toFixed(2)} kg/m² | ${category}`;
    }
  },
  {
    id: "bsa",
    title: "Body Surface Area (Mosteller)",
    inputs: [
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "h", label: "Height (cm)", type: "number" }
    ],
    logic: (data) => `${Math.sqrt(data.w * data.h / 3600).toFixed(2)} m²`
  },
  {
    id: "map",
    title: "Mean Arterial Pressure (MAP)",
    inputs: [
      { id: "sbp", label: "Systolic BP (mmHg)", type: "number" },
      { id: "dbp", label: "Diastolic BP (mmHg)", type: "number" }
    ],
    logic: (data) => `${((data.sbp + 2 * data.dbp) / 3).toFixed(1)} mmHg`
  },
  {
    id: "crcl",
    title: "Creatinine Clearance (Cockcroft-Gault)",
    inputs: [
      { id: "age", label: "Age (years)", type: "number" },
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "cr", label: "Serum Creatinine (mg/dL)", type: "number" },
      { id: "g", label: "Gender (1=Male, 0=Female)", type: "number" }
    ],
    logic: (data) => {
      let crcl = (140 - data.age) * data.w / (72 * data.cr);
      if (data.g === 0) crcl *= 0.85;
      return `${crcl.toFixed(1)} mL/min`;
    }
  },
  {
    id: "egfr",
    title: "eGFR (MDRD)",
    inputs: [
      { id: "age", label: "Age (years)", type: "number" },
      { id: "cr", label: "Serum Creatinine (mg/dL)", type: "number" },
      { id: "g", label: "Gender (1=Male, 0=Female)", type: "number" },
      { id: "aa", label: "African American? (1=Yes, 0=No)", type: "number" }
    ],
    logic: (data) => {
      let egfr = 175 * Math.pow(data.cr, -1.154) * Math.pow(data.age, -0.203);
      if (data.g === 0) egfr *= 0.742;
      if (data.aa === 1) egfr *= 1.212;
      return `${egfr.toFixed(1)} mL/min/1.73m²`;
    }
  },
  {
    id: "aniongap",
    title: "Anion Gap",
    inputs: [
      { id: "na", label: "Sodium (Na+)", type: "number" },
      { id: "cl", label: "Chloride (Cl-)", type: "number" },
      { id: "hco3", label: "Bicarbonate (HCO3-)", type: "number" }
    ],
    logic: (data) => `${(data.na - (data.cl + data.hco3)).toFixed(1)} mEq/L`
  },
  {
    id: "osm",
    title: "Serum Osmolarity",
    inputs: [
      { id: "na", label: "Sodium (mEq/L)", type: "number" },
      { id: "glu", label: "Glucose (mg/dL)", type: "number" },
      { id: "bun", label: "BUN (mg/dL)", type: "number" }
    ],
    logic: (data) => `${(2 * data.na + data.glu / 18 + data.bun / 2.8).toFixed(1)} mOsm/kg`
  },
  {
    id: "sodium",
    title: "Corrected Sodium",
    inputs: [
      { id: "na", label: "Measured Sodium (mEq/L)", type: "number" },
      { id: "glu", label: "Serum Glucose (mg/dL)", type: "number" }
    ],
    logic: (data) => `${(data.na + 0.016 * (data.glu - 100)).toFixed(1)} mEq/L`
  },
  {
    id: "calcium",
    title: "Corrected Calcium",
    inputs: [
      { id: "ca", label: "Measured Calcium (mg/dL)", type: "number" },
      { id: "alb", label: "Serum Albumin (g/dL)", type: "number" }
    ],
    logic: (data) => `${(data.ca + 0.8 * (4 - data.alb)).toFixed(2)} mg/dL`
  },
  {
    id: "parkland",
    title: "Parkland Formula",
    inputs: [
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "tbsa", label: "TBSA Burned (%)", type: "number" }
    ],
    logic: (data) => {
      const total = 4 * data.w * data.tbsa;
      return `${total.toFixed(0)} mL total | 8h: ${(total / 2).toFixed(0)} mL | 16h: ${(total / 2).toFixed(0)} mL`;
    }
  },
  {
    id: "wells",
    title: "Wells Score (DVT)",
    inputs: [
      { id: "ca", label: "Active Cancer (+1)", type: "number" },
      { id: "par", label: "Paralysis/Immobilization (+1)", type: "number" },
      { id: "bed", label: "Bedridden >3d / Major Surg (+1)", type: "number" },
      { id: "ten", label: "Tenderness along veins (+1)", type: "number" },
      { id: "swell", label: "Entire leg swollen (+1)", type: "number" },
      { id: "calf", label: "Calf swelling >3cm (+1)", type: "number" },
      { id: "pit", label: "Pitting edema (+1)", type: "number" },
      { id: "coll", label: "Collateral veins (+1)", type: "number" },
      { id: "alt", label: "Alternative diagnosis likely (-2)", type: "number" }
    ],
    logic: (data) => {
      let score = data.ca + data.par + data.bed + data.ten + data.swell + data.calf + data.pit + data.coll;
      if (data.alt === 1) score -= 2;
      const risk = score <= 0 ? "Low" : score <= 2 ? "Moderate" : "High";
      return `Score ${score} | ${risk} probability`;
    }
  },
  {
    id: "cha2ds2vasc",
    title: "CHA2DS2-VASc",
    inputs: [
      { id: "c", label: "CHF (+1)", type: "number" },
      { id: "h", label: "Hypertension (+1)", type: "number" },
      { id: "a2", label: "Age ≥ 75 (+2)", type: "number" },
      { id: "d", label: "Diabetes (+1)", type: "number" },
      { id: "s2", label: "Stroke/TIA (+2)", type: "number" },
      { id: "v", label: "Vascular Disease (+1)", type: "number" },
      { id: "a", label: "Age 65-74 (+1)", type: "number" },
      { id: "sc", label: "Sex Category Female (+1)", type: "number" }
    ],
    logic: (data) => `Score ${(data.c + data.h + data.a2 * 2 + data.d + data.s2 * 2 + data.v + data.a + data.sc).toFixed(0)} | Stroke risk rises with score`
  },
  {
    id: "childpugh",
    title: "Child-Pugh",
    inputs: [
      { id: "bil", label: "Bilirubin (mg/dL)", type: "number" },
      { id: "alb", label: "Albumin (g/dL)", type: "number" },
      { id: "inr", label: "INR", type: "number" },
      { id: "asc", label: "Ascites (1,2,3)", type: "number" },
      { id: "enc", label: "Encephalopathy (1,2,3)", type: "number" }
    ],
    logic: (data) => {
      let score = 0;
      score += data.bil < 2 ? 1 : data.bil <= 3 ? 2 : 3;
      score += data.alb > 3.5 ? 1 : data.alb >= 2.8 ? 2 : 3;
      score += data.inr < 1.7 ? 1 : data.inr <= 2.3 ? 2 : 3;
      score += data.asc + data.enc;
      const grade = score <= 6 ? "A" : score <= 9 ? "B" : "C";
      return `Score ${score} | Class ${grade}`;
    }
  },
  {
    id: "meld",
    title: "MELD",
    inputs: [
      { id: "bil", label: "Bilirubin (mg/dL)", type: "number" },
      { id: "inr", label: "INR", type: "number" },
      { id: "cr", label: "Creatinine (mg/dL)", type: "number" }
    ],
    logic: (data) => {
      const b = data.bil < 1 ? 1 : data.bil;
      const i = data.inr < 1 ? 1 : data.inr;
      const c = data.cr < 1 ? 1 : data.cr;
      const meld = 3.78 * Math.log(b) + 11.2 * Math.log(i) + 9.57 * Math.log(c) + 6.43;
      return `${Math.round(meld)}`;
    }
  },
  {
    id: "ldl",
    title: "LDL (Friedewald)",
    inputs: [
      { id: "tc", label: "Total Cholesterol (mg/dL)", type: "number" },
      { id: "hdl", label: "HDL (mg/dL)", type: "number" },
      { id: "tg", label: "Triglycerides (mg/dL)", type: "number" }
    ],
    logic: (data) => {
      if (data.tg >= 400) return "Invalid (Triglycerides >= 400 mg/dL)";
      return `${(data.tc - data.hdl - data.tg / 5).toFixed(1)} mg/dL`;
    }
  },
  {
    id: "curb65",
    title: "CURB-65",
    inputs: [
      { id: "c", label: "Confusion", type: "number" },
      { id: "u", label: "Urea > 7 mmol/L", type: "number" },
      { id: "r", label: "Respiratory rate >= 30", type: "number" },
      { id: "b", label: "BP < 90/60", type: "number" },
      { id: "a", label: "Age >= 65", type: "number" }
    ],
    logic: (data) => {
      const score = data.c + data.u + data.r + data.b + data.a;
      const risk = score <= 1 ? "Low" : score === 2 ? "Moderate" : "High";
      return `Score ${score} | ${risk} risk`;
    }
  },
  {
    id: "apache",
    title: "APACHE II (Simplified)",
    inputs: [
      { id: "aps", label: "Acute Physiology Score", type: "number" },
      { id: "age", label: "Age points", type: "number" },
      { id: "chr", label: "Chronic health points", type: "number" }
    ],
    logic: (data) => `${(data.aps + data.age + data.chr).toFixed(0)}`
  },
  {
    id: "nihss",
    title: "NIHSS (Simplified)",
    inputs: [
      { id: "loc", label: "LOC", type: "number" },
      { id: "gaze", label: "Gaze", type: "number" },
      { id: "vis", label: "Visual", type: "number" },
      { id: "face", label: "Facial palsy", type: "number" },
      { id: "mot", label: "Motor arms/legs sum", type: "number" },
      { id: "atax", label: "Ataxia", type: "number" },
      { id: "sens", label: "Sensory", type: "number" },
      { id: "lang", label: "Language", type: "number" },
      { id: "dys", label: "Dysarthria", type: "number" },
      { id: "ext", label: "Extinction/inattention", type: "number" }
    ],
    logic: (data) => {
      const score = data.loc + data.gaze + data.vis + data.face + data.mot + data.atax + data.sens + data.lang + data.dys + data.ext;
      const severity = score < 5 ? "Minor" : score < 16 ? "Moderate" : score < 21 ? "Moderate-Severe" : "Severe";
      return `Score ${score} | ${severity}`;
    }
  }
];
function CalculatorsPage() {
  const [selectedCalculatorId, setSelectedCalculatorId] = useState("");
  const [values, setValues] = useState({});
  const [result, setResult] = useState("");
  const activeCalculator = useMemo(() => CALCULATORS.find((calculator) => calculator.id === selectedCalculatorId), [selectedCalculatorId]);
  const calculate = () => {
    if (!activeCalculator) return;
    const payload = {};
    for (const input of activeCalculator.inputs) {
      const raw = values[input.id];
      if (raw == null || raw.trim() === "") {
        window.alert("Please fill all required fields.");
        return;
      }
      payload[input.id] = Number(raw);
    }
    try {
      setResult(activeCalculator.logic(payload));
    } catch {
      setResult("Calculation error.");
    }
  };
  const reset = () => {
    setSelectedCalculatorId("");
    setValues({});
    setResult("");
  };
  return /* @__PURE__ */ jsx(AppShell, { title: "Medical Calculators", subtitle: "Clinical equations and scores migrated from the legacy calculator suite.", children: /* @__PURE__ */ jsxs("section", { className: "medora-card", style: {
    maxWidth: 760,
    margin: "0 auto"
  }, children: [
    /* @__PURE__ */ jsxs("select", { className: "medora-select", value: selectedCalculatorId, onChange: (event) => {
      setSelectedCalculatorId(event.target.value);
      setValues({});
      setResult("");
    }, children: [
      /* @__PURE__ */ jsx("option", { value: "", children: "Select a calculator" }),
      CALCULATORS.map((calculator) => /* @__PURE__ */ jsx("option", { value: calculator.id, children: calculator.title }, calculator.id))
    ] }),
    /* @__PURE__ */ jsx("div", { className: "medora-grid", style: {
      marginTop: 16
    }, children: activeCalculator?.inputs.map((input) => /* @__PURE__ */ jsxs("label", { className: "medora-kv", children: [
      /* @__PURE__ */ jsx("b", { children: input.label }),
      /* @__PURE__ */ jsx("input", { type: "number", className: "medora-input", placeholder: input.placeholder, value: values[input.id] ?? "", onChange: (event) => setValues((previous) => ({
        ...previous,
        [input.id]: event.target.value
      })) })
    ] }, input.id)) }),
    /* @__PURE__ */ jsxs("div", { className: "medora-inline", style: {
      marginTop: 16
    }, children: [
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: reset, children: "Reset" }),
      /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-primary", onClick: calculate, children: "Calculate" })
    ] }),
    result && /* @__PURE__ */ jsxs("div", { className: "medora-card", style: {
      marginTop: 16
    }, children: [
      /* @__PURE__ */ jsx("h4", { children: "Result" }),
      /* @__PURE__ */ jsx("p", { className: "medora-code", children: result })
    ] })
  ] }) });
}
export {
  CalculatorsPage as component
};
