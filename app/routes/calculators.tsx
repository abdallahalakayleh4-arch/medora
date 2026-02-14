import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import source from "../../calculators.html?raw";
import { extractHtml, mapLegacyLinks } from "../lib/html";
import { useAuthGuard } from "../lib/useAuthGuard";
import { usePageTitle } from "../lib/usePageTitle";

type CalculatorField = {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
};

type CalculatorDefinition = {
  inputs: CalculatorField[];
  logic: (data: Record<string, number>) => string;
};

const CALCULATORS: Record<string, CalculatorDefinition> = {
  bmi: {
    inputs: [
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "h", label: "Height (cm)", type: "number" },
    ],
    logic: (data) => {
      const h_m = data.h / 100;
      const bmi = data.w / (h_m * h_m);
      const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
      return `${bmi.toFixed(2)} kg/m²<br><span style="font-size:16px; opacity:0.7">Category: ${cat}</span>`;
    },
  },
  bsa: {
    inputs: [
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "h", label: "Height (cm)", type: "number" },
    ],
    logic: (data) => {
      const bsa = Math.sqrt((data.w * data.h) / 3600);
      return `${bsa.toFixed(2)} m²`;
    },
  },
  map: {
    inputs: [
      { id: "sbp", label: "Systolic BP (mmHg)", type: "number" },
      { id: "dbp", label: "Diastolic BP (mmHg)", type: "number" },
    ],
    logic: (data) => {
      const map = (data.sbp + 2 * data.dbp) / 3;
      return `${map.toFixed(1)} mmHg`;
    },
  },
  crcl: {
    inputs: [
      { id: "age", label: "Age (years)", type: "number" },
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "cr", label: "Serum Creatinine (mg/dL)", type: "number" },
      { id: "g", label: "Gender (1=Male, 0=Female)", type: "number", placeholder: "1 or 0" },
    ],
    logic: (data) => {
      let crcl = ((140 - data.age) * data.w) / (72 * data.cr);
      if (data.g === 0) crcl *= 0.85;
      return `${crcl.toFixed(1)} mL/min`;
    },
  },
  egfr: {
    inputs: [
      { id: "age", label: "Age (years)", type: "number" },
      { id: "cr", label: "Serum Creatinine (mg/dL)", type: "number" },
      { id: "g", label: "Gender (1=Male, 0=Female)", type: "number", placeholder: "1 or 0" },
      { id: "aa", label: "African American? (1=Yes, 0=No)", type: "number", placeholder: "1 or 0" },
    ],
    logic: (data) => {
      let egfr = 175 * Math.pow(data.cr, -1.154) * Math.pow(data.age, -0.203);
      if (data.g === 0) egfr *= 0.742;
      if (data.aa === 1) egfr *= 1.212;
      return `${egfr.toFixed(1)} mL/min/1.73m²`;
    },
  },
  aniongap: {
    inputs: [
      { id: "na", label: "Sodium (Na+)", type: "number" },
      { id: "cl", label: "Chloride (Cl-)", type: "number" },
      { id: "hco3", label: "Bicarbonate (HCO3-)", type: "number" },
    ],
    logic: (data) => {
      const ag = data.na - (data.cl + data.hco3);
      return `${ag.toFixed(1)} mEq/L`;
    },
  },
  osm: {
    inputs: [
      { id: "na", label: "Sodium (mEq/L)", type: "number" },
      { id: "glu", label: "Glucose (mg/dL)", type: "number" },
      { id: "bun", label: "BUN (mg/dL)", type: "number" },
    ],
    logic: (data) => {
      const osm = 2 * data.na + data.glu / 18 + data.bun / 2.8;
      return `${osm.toFixed(1)} mOsm/kg`;
    },
  },
  sodium: {
    inputs: [
      { id: "na", label: "Measured Sodium (mEq/L)", type: "number" },
      { id: "glu", label: "Serum Glucose (mg/dL)", type: "number" },
    ],
    logic: (data) => {
      const corr = data.na + 0.016 * (data.glu - 100);
      return `${corr.toFixed(1)} mEq/L`;
    },
  },
  calcium: {
    inputs: [
      { id: "ca", label: "Measured Calcium (mg/dL)", type: "number" },
      { id: "alb", label: "Serum Albumin (g/dL)", type: "number" },
    ],
    logic: (data) => {
      const corr = data.ca + 0.8 * (4.0 - data.alb);
      return `${corr.toFixed(2)} mg/dL`;
    },
  },
  parkland: {
    inputs: [
      { id: "w", label: "Weight (kg)", type: "number" },
      { id: "tbsa", label: "TBSA Burned (%)", type: "number" },
    ],
    logic: (data) => {
      const total = 4 * data.w * data.tbsa;
      return `${total} mL <span style="font-size:14px; display:block; opacity:0.8">(1st 8h: ${total / 2} mL | Next 16h: ${total / 2} mL)</span>`;
    },
  },
  wells: {
    inputs: [
      { id: "ca", label: "Active Cancer (+1)", type: "number", placeholder: "1 if Yes, 0 if No" },
      { id: "par", label: "Paralysis/Immobilization (+1)", type: "number", placeholder: "1 or 0" },
      { id: "bed", label: "Bedridden >3d / Major Surg (+1)", type: "number", placeholder: "1 or 0" },
      { id: "ten", label: "Tenderness along veins (+1)", type: "number", placeholder: "1 or 0" },
      { id: "swell", label: "Entire leg swollen (+1)", type: "number", placeholder: "1 or 0" },
      { id: "calf", label: "Calf swelling >3cm (+1)", type: "number", placeholder: "1 or 0" },
      { id: "pit", label: "Pitting edema (+1)", type: "number", placeholder: "1 or 0" },
      { id: "coll", label: "Collateral veins (+1)", type: "number", placeholder: "1 or 0" },
      { id: "alt", label: "Alternative diagnosis likely (-2)", type: "number", placeholder: "1 or 0" },
    ],
    logic: (data) => {
      let score = data.ca + data.par + data.bed + data.ten + data.swell + data.calf + data.pit + data.coll;
      if (data.alt === 1) score -= 2;

      const risk = score <= 0 ? "Low Probability" : score <= 2 ? "Moderate Probability" : "High Probability";
      return `Score: ${score}<br><span style="font-size:16px;">${risk}</span>`;
    },
  },
  cha2ds2vasc: {
    inputs: [
      { id: "c", label: "CHF (+1)", type: "number", placeholder: "1/0" },
      { id: "h", label: "Hypertension (+1)", type: "number", placeholder: "1/0" },
      { id: "a2", label: "Age ≥ 75 (+2)", type: "number", placeholder: "1/0" },
      { id: "d", label: "Diabetes (+1)", type: "number", placeholder: "1/0" },
      { id: "s2", label: "Stroke/TIA (+2)", type: "number", placeholder: "1/0" },
      { id: "v", label: "Vascular Disease (+1)", type: "number", placeholder: "1/0" },
      { id: "a", label: "Age 65-74 (+1)", type: "number", placeholder: "1/0" },
      { id: "sc", label: "Sex Category (Female +1)", type: "number", placeholder: "1/0" },
    ],
    logic: (data) => {
      const score = data.c + data.h + data.a2 * 2 + data.d + data.s2 * 2 + data.v + data.a + data.sc;
      return `Score: ${score}<br><span style="font-size:16px;">Annual Stroke Risk increases with score</span>`;
    },
  },
  childpugh: {
    inputs: [
      { id: "bil", label: "Bilirubin (mg/dL)", type: "number" },
      { id: "alb", label: "Albumin (g/dL)", type: "number" },
      { id: "inr", label: "INR", type: "number" },
      { id: "asc", label: "Ascites (1=None,2=Mild,3=Severe)", type: "number" },
      { id: "ence", label: "Encephalopathy (1=None,2=Grade 1-2,3=Grade 3-4)", type: "number" },
    ],
    logic: (data) => {
      const score = data.bil + data.alb + data.inr + data.asc + data.ence;
      const grade = score <= 6 ? "Class A" : score <= 9 ? "Class B" : "Class C";
      return `Score: ${score}<br><span style="font-size:16px;">${grade}</span>`;
    },
  },
  meld: {
    inputs: [
      { id: "bil", label: "Bilirubin (mg/dL)", type: "number" },
      { id: "inr", label: "INR", type: "number" },
      { id: "cr", label: "Creatinine (mg/dL)", type: "number" },
    ],
    logic: (data) => {
      const meld = 3.78 * Math.log(data.bil) + 11.2 * Math.log(data.inr) + 9.57 * Math.log(data.cr) + 6.43;
      return `MELD Score: ${Math.round(meld)}`;
    },
  },
  sofa: {
    inputs: [
      { id: "resp", label: "Respiratory (0-4)", type: "number" },
      { id: "coag", label: "Coagulation (0-4)", type: "number" },
      { id: "liver", label: "Liver (0-4)", type: "number" },
      { id: "card", label: "Cardiovascular (0-4)", type: "number" },
      { id: "cns", label: "CNS (0-4)", type: "number" },
      { id: "renal", label: "Renal (0-4)", type: "number" },
    ],
    logic: (data) => {
      const score = data.resp + data.coag + data.liver + data.card + data.cns + data.renal;
      return `Total SOFA: ${score}`;
    },
  },
  qsofa: {
    inputs: [
      { id: "rr", label: "Resp Rate ≥ 22 (1=Yes, 0=No)", type: "number", placeholder: "1 or 0" },
      { id: "sbp", label: "SBP ≤ 100 (1=Yes, 0=No)", type: "number", placeholder: "1 or 0" },
      { id: "gcs", label: "GCS < 15 (1=Yes, 0=No)", type: "number", placeholder: "1 or 0" },
    ],
    logic: (data) => {
      const score = data.rr + data.sbp + data.gcs;
      const risk = score >= 2 ? "High Risk" : "Low Risk";
      return `Score: ${score}<br><span style="font-size:16px;">${risk} Sepsis</span>`;
    },
  },
  curbs65: {
    inputs: [
      { id: "c", label: "Confusion (1=Yes)", type: "number", placeholder: "1 or 0" },
      { id: "u", label: "Urea > 7 mmol/L (1=Yes)", type: "number", placeholder: "1 or 0" },
      { id: "r", label: "RR ≥ 30 (1=Yes)", type: "number", placeholder: "1 or 0" },
      { id: "b", label: "BP < 90/60 (1=Yes)", type: "number", placeholder: "1 or 0" },
      { id: "a", label: "Age ≥ 65 (1=Yes)", type: "number", placeholder: "1 or 0" },
    ],
    logic: (data) => {
      const score = data.c + data.u + data.r + data.b + data.a;
      const risk = score <= 1 ? "Low Risk (Outpatient)" : score === 2 ? "Moderate Risk (Admit)" : "High Risk (ICU)";
      return `Score: ${score}<br><span style="font-size:16px;">${risk}</span>`;
    },
  },
  apache: {
    inputs: [
      { id: "aps", label: "Acute Physiology Score (Sum)", type: "number" },
      { id: "age", label: "Age Points (0-6)", type: "number" },
      { id: "chr", label: "Chronic Health Points (2-5)", type: "number" },
    ],
    logic: (data) => {
      return `Total: ${data.aps + data.age + data.chr}`;
    },
  },
  nihss: {
    inputs: [
      { id: "loc", label: "LOC Score (0-3)", type: "number" },
      { id: "gaze", label: "Best Gaze (0-2)", type: "number" },
      { id: "vis", label: "Visual (0-3)", type: "number" },
      { id: "face", label: "Facial Palsy (0-3)", type: "number" },
      { id: "mot", label: "Motor Arms/Legs (Sum 0-16)", type: "number" },
      { id: "atax", label: "Limb Ataxia (0-2)", type: "number" },
      { id: "sens", label: "Sensory (0-2)", type: "number" },
      { id: "lang", label: "Best Language (0-3)", type: "number" },
      { id: "dys", label: "Dysarthria (0-2)", type: "number" },
      { id: "ext", label: "Extinction/Inattention (0-2)", type: "number" },
    ],
    logic: (data) => {
      const score =
        data.loc +
        data.gaze +
        data.vis +
        data.face +
        data.mot +
        data.atax +
        data.sens +
        data.lang +
        data.dys +
        data.ext;
      const sev = score < 5 ? "Minor" : score < 16 ? "Moderate" : score < 21 ? "Mod-Severe" : "Severe";
      return `Score: ${score}<br><span style="font-size:16px;">Severity: ${sev} Stroke</span>`;
    },
  },
};

export const Route = createFileRoute("/calculators")({
  component: CalculatorsPage,
});

function CalculatorsPage() {
  usePageTitle("Medora | Professional Medical Calculators");
  useAuthGuard();

  const { styles, body } = useMemo(() => {
    const extracted = extractHtml(source);
    return {
      styles: extracted.styles,
      body: mapLegacyLinks(extracted.body),
    };
  }, []);

  useEffect(() => {
    const select = document.getElementById("calculatorSelect") as HTMLSelectElement | null;
    const formContainer = document.getElementById("form-container");
    const resultBox = document.getElementById("resultBox");
    const resultValue = document.getElementById("resultValue");
    const calcBtn = document.getElementById("calcBtn");
    const resetBtn = document.getElementById("resetBtn");

    if (!select || !formContainer || !resultBox || !resultValue || !calcBtn || !resetBtn) {
      return undefined;
    }

    let activeCalc: CalculatorDefinition | null = null;

    const handleChange = () => {
      const key = select.value;
      resultBox.style.display = "none";
      formContainer.innerHTML = "";

      if (!key || !CALCULATORS[key]) {
        formContainer.innerHTML = `
          <div style="text-align:center; padding: 40px; color: var(--text-muted); border: 2px dashed var(--border); border-radius: 16px;">
            <i class="fas fa-calculator" style="font-size: 32px; margin-bottom: 15px; display:block;"></i>
            Please select a calculator from the menu above to begin.
          </div>`;
        activeCalc = null;
        return;
      }

      activeCalc = CALCULATORS[key];

      activeCalc.inputs.forEach((field) => {
        const group = document.createElement("div");
        group.className = "input-group";

        const label = document.createElement("label");
        label.textContent = field.label;

        const input = document.createElement("input");
        input.type = field.type;
        input.id = field.id;
        if (field.placeholder) input.placeholder = field.placeholder;
        input.step = "any";

        group.appendChild(label);
        group.appendChild(input);
        formContainer.appendChild(group);
      });
    };

    const handleCalc = () => {
      if (!activeCalc) {
        alert("Please select a calculator first.");
        return;
      }

      const inputData: Record<string, number> = {};
      let allFilled = true;

      activeCalc.inputs.forEach((field) => {
        const el = document.getElementById(field.id) as HTMLInputElement | null;
        if (!el || el.value === "") {
          allFilled = false;
          if (el) {
            el.style.borderColor = "var(--accent)";
          }
        } else {
          el.style.borderColor = "var(--border)";
          inputData[field.id] = parseFloat(el.value);
        }
      });

      if (!allFilled) {
        alert("Please fill in all required fields.");
        return;
      }

      try {
        const finalResult = activeCalc.logic(inputData);
        resultValue.innerHTML = finalResult;
        resultBox.style.display = "block";
        resultBox.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error(error);
        resultValue.textContent = "Error in calculation.";
        resultBox.style.display = "block";
      }
    };

    const handleReset = () => {
      select.value = "";
      select.dispatchEvent(new Event("change"));
    };

    select.addEventListener("change", handleChange);
    calcBtn.addEventListener("click", handleCalc);
    resetBtn.addEventListener("click", handleReset);

    return () => {
      select.removeEventListener("change", handleChange);
      calcBtn.removeEventListener("click", handleCalc);
      resetBtn.removeEventListener("click", handleReset);
    };
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
