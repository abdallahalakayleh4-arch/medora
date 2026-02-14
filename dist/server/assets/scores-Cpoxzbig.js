import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { A as AppShell } from "./AppShell-ChV9Eya4.js";
import "@tanstack/react-router";
import "lucide-react";
import "./router-DbyaQ_tD.js";
import "./use-medora-theme-BcdTr06G.js";
const SCORES = [
  {
    name: "APGAR Score",
    keywords: ["apgar", "newborn", "neonatal"],
    html: `
<h4>Definition</h4>
<p>The APGAR score is a rapid clinical assessment tool used to evaluate the physiological adaptation of a newborn immediately after birth.</p>

<h4>Historical Background</h4>
<p>Developed in 1952 by Dr. Virginia Apgar, an anesthesiologist.</p>

<h4>Components (0–2 each)</h4>
<ul>
<li><b>Appearance:</b> Blue/pale → pink</li>
<li><b>Pulse:</b> Absent → ≥100 bpm</li>
<li><b>Grimace:</b> No response → Cry</li>
<li><b>Activity:</b> Limp → Active motion</li>
<li><b>Respiration:</b> Absent → Good cry</li>
</ul>

<h4>Scoring</h4>
<p>Total: 0–10 at 1 and 5 minutes.</p>

<h4>Interpretation</h4>
<ul>
<li>7–10: Normal</li>
<li>4–6: Moderate depression</li>
<li>0–3: Severe distress</li>
</ul>

<h4>Clinical Use</h4>
<ul>
<li>Immediate neonatal resuscitation</li>
<li>Outcome comparison</li>
</ul>

<h4>Limitations</h4>
<ul>
<li>Not predictive of long-term outcomes</li>
<li>Affected by prematurity & drugs</li>
</ul>

<h4>Exam Pearl</h4>
<p>5-minute APGAR is more prognostic.</p>
`
  },
  {
    name: "Glasgow Coma Scale (GCS)",
    keywords: ["gcs", "coma", "neurology", "trauma"],
    html: `
<h4>Definition</h4>
<p>Standardized assessment of consciousness.</p>

<h4>Components</h4>
<ul>
<li><b>Eye (E):</b> 4–1</li>
<li><b>Verbal (V):</b> 5–1</li>
<li><b>Motor (M):</b> 6–1</li>
</ul>

<h4>Total Score</h4>
<p>3–15</p>

<h4>Severity</h4>
<ul>
<li>13–15: Mild</li>
<li>9–12: Moderate</li>
<li>≤8: Severe (coma)</li>
</ul>

<h4>Clinical Use</h4>
<ul>
<li>Trauma</li>
<li>ICU monitoring</li>
<li>Coma prognosis</li>
</ul>

<h4>Limitations</h4>
<ul>
<li>Intubation affects verbal score</li>
<li>Sedatives confound results</li>
</ul>

<h4>Exam Pearl</h4>
<p>GCS ≤8 → Intubate.</p>
`
  },
  {
    name: "Bishop Score",
    keywords: ["bishop", "labor", "induction"],
    html: `
<h4>Definition</h4>
<p>Predicts success of labor induction.</p>

<h4>Components</h4>
<ul>
<li>Dilation</li>
<li>Effacement</li>
<li>Station</li>
<li>Consistency</li>
<li>Position</li>
</ul>

<h4>Total Score</h4>
<p>0–13</p>

<h4>Interpretation</h4>
<ul>
<li>≤5: Unfavorable</li>
<li>≥8: Favorable</li>
</ul>

<h4>Clinical Use</h4>
<p>Guides induction strategy.</p>

<h4>Limitations</h4>
<p>Subjective examiner variability.</p>

<h4>Exam Pearl</h4>
<p>Low score → cervical ripening.</p>
`
  },
  {
    name: "Wells Score – Deep Vein Thrombosis",
    keywords: ["wells dvt", "dvt", "thrombosis"],
    html: `
<h4>Purpose</h4>
<p>Estimates pre-test probability of DVT.</p>

<h4>Interpretation</h4>
<ul>
<li>≤0: Low</li>
<li>1–2: Moderate</li>
<li>≥3: High</li>
</ul>

<h4>Clinical Algorithm</h4>
<ul>
<li>Low → D-dimer</li>
<li>High → Ultrasound</li>
</ul>

<h4>Limitation</h4>
<p>Not diagnostic alone.</p>
`
  },
  {
    name: "Wells Score – Pulmonary Embolism",
    keywords: ["wells pe", "pulmonary embolism"],
    html: `
<h4>Purpose</h4>
<p>Estimates probability of pulmonary embolism.</p>

<h4>Interpretation</h4>
<ul>
<li>≤4: PE unlikely</li>
<li>>4: PE likely</li>
</ul>

<h4>Clinical Use</h4>
<p>Guides need for CT pulmonary angiography.</p>
`
  },
  {
    name: "CHA₂DS₂-VASc Score",
    keywords: ["cha2ds2vasc", "af", "stroke"],
    html: `
<h4>Purpose</h4>
<p>Estimates stroke risk in atrial fibrillation.</p>

<h4>Interpretation</h4>
<ul>
<li>0: No anticoagulation</li>
<li>1: Consider</li>
<li>≥2: Anticoagulation indicated</li>
</ul>

<h4>Exam Pearl</h4>
<p>More sensitive than CHADS₂.</p>
`
  },
  {
    name: "HAS-BLED Score",
    keywords: ["has-bled", "bleeding", "af"],
    html: `
<h4>Purpose</h4>
<p>Assesses bleeding risk in AF patients.</p>

<h4>Interpretation</h4>
<p>Score ≥3 → high bleeding risk (not contraindication).</p>
`
  },
  {
    name: "CURB-65 Score",
    keywords: ["curb-65", "pneumonia"],
    html: `
<h4>Purpose</h4>
<p>Pneumonia severity assessment.</p>

<h4>Management</h4>
<ul>
<li>0–1: Outpatient</li>
<li>2: Admit</li>
<li>≥3: ICU</li>
</ul>
`
  },
  {
    name: "SOFA Score",
    keywords: ["sofa", "sepsis", "organ failure"],
    html: `
<h4>Purpose</h4>
<p>Quantifies organ failure severity.</p>

<h4>Key Concept</h4>
<p>Increase ≥2 points = organ dysfunction.</p>
`
  },
  {
    name: "qSOFA",
    keywords: ["qsofa", "sepsis", "icu"],
    html: `
<h4>Criteria</h4>
<ul>
<li>RR ≥22</li>
<li>SBP ≤100</li>
<li>Altered mental status</li>
</ul>

<h4>Interpretation</h4>
<p>≥2 → high mortality risk.</p>
`
  },
  {
    name: "APACHE II Score",
    keywords: ["apache", "apache ii", "icu", "mortality", "critical care", "severity"],
    html: `
<h4>Definition</h4>
<p>A severity-of-disease classification system used to estimate hospital mortality in ICU patients.</p>

<h4>Components</h4>
<ul>
<li>Acute Physiology Score (12 variables)</li>
<li>Age points</li>
<li>Chronic health points</li>
</ul>

<h4>Total Score</h4>
<p>0–71 (higher score = higher mortality)</p>

<h4>Clinical Use</h4>
<p>Prognosis, ICU outcome comparison, research stratification.</p>

<h4>Limitations</h4>
<ul>
<li>Calculated only in first 24 hours</li>
<li>Not for individual treatment decisions</li>
</ul>

<h4>Exam Pearl</h4>
<p>APACHE II is prognostic, not diagnostic.</p>
`
  },
  {
    name: "NIH Stroke Scale (NIHSS)",
    keywords: ["nihss", "nih stroke scale", "stroke", "neurology", "tpa"],
    html: `
<h4>Definition</h4>
<p>A standardized neurological examination to quantify stroke severity.</p>

<h4>Score Range</h4>
<p>0–42</p>

<h4>Severity</h4>
<ul>
<li>0: No stroke</li>
<li>1–4: Minor</li>
<li>5–15: Moderate</li>
<li>16–20: Moderate–severe</li>
<li>>20: Severe</li>
</ul>

<h4>Clinical Use</h4>
<p>Thrombolysis eligibility, stroke unit monitoring, prognosis.</p>

<h4>Limitations</h4>
<p>Underestimates posterior circulation strokes.</p>

<h4>Exam Pearl</h4>
<p>NIHSS >25 increases hemorrhagic transformation risk after tPA.</p>
`
  },
  {
    name: "TIMI Risk Score (ACS)",
    keywords: ["timi", "timi score", "acs", "nstemi", "unstable angina"],
    html: `
<h4>Definition</h4>
<p>Risk stratification tool for unstable angina and NSTEMI.</p>

<h4>Score Range</h4>
<p>0–7</p>

<h4>Clinical Use</h4>
<p>Predicts risk of death, myocardial infarction, and urgent revascularization.</p>

<h4>Limitations</h4>
<ul>
<li>Binary variables</li>
<li>Less accurate than GRACE score</li>
</ul>
`
  },
  {
    name: "GRACE Score",
    keywords: ["grace", "grace score", "acs", "cardiology", "mortality"],
    html: `
<h4>Definition</h4>
<p>Predicts in-hospital and 6-month mortality in acute coronary syndromes.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Heart rate</li>
<li>Systolic blood pressure</li>
<li>Serum creatinine</li>
<li>Killip class</li>
<li>Cardiac arrest</li>
<li>ST deviation</li>
<li>Elevated troponin</li>
</ul>

<h4>Clinical Use</h4>
<p>ESC guideline–recommended for ACS risk stratification.</p>

<h4>Exam Pearl</h4>
<p>GRACE score >140 → early invasive strategy.</p>
`
  },
  {
    name: "Child–Pugh Score",
    keywords: ["child pugh", "cirrhosis", "liver", "hepatology"],
    html: `
<h4>Definition</h4>
<p>Assesses severity and prognosis of chronic liver disease, mainly cirrhosis.</p>

<h4>Classes</h4>
<ul>
<li>Class A (5–6): Well compensated</li>
<li>Class B (7–9): Significant disease</li>
<li>Class C (10–15): Decompensated</li>
</ul>

<h4>Clinical Use</h4>
<p>Surgical risk assessment and prognosis.</p>

<h4>Limitations</h4>
<p>Includes subjective variables; less precise than MELD.</p>
`
  },
  {
    name: "MELD Score",
    keywords: ["meld", "liver transplant", "cirrhosis", "hepatology"],
    html: `
<h4>Definition</h4>
<p>Model for End-Stage Liver Disease predicting 3-month mortality.</p>

<h4>Variables</h4>
<ul>
<li>Serum bilirubin</li>
<li>INR</li>
<li>Serum creatinine</li>
</ul>

<h4>Clinical Use</h4>
<p>Liver transplant allocation and prognosis.</p>

<h4>Limitations</h4>
<p>Underestimates cholestatic liver disease.</p>

<h4>Exam Pearl</h4>
<p>MELD is for allocation, Child–Pugh is for classification.</p>
`
  },
  {
    name: "Alvarado Score",
    keywords: ["alvarado", "appendicitis", "surgery", "abdomen"],
    html: `
<h4>Definition</h4>
<p>Clinical score estimating probability of acute appendicitis.</p>

<h4>Score Range</h4>
<p>0–10</p>

<h4>Interpretation</h4>
<ul>
<li>≤4: Appendicitis unlikely</li>
<li>5–6: Observe</li>
<li>≥7: Surgical consultation</li>
</ul>

<h4>Limitations</h4>
<p>Less accurate in women, children, and elderly.</p>
`
  },
  {
    name: "Ranson Criteria",
    keywords: ["ranson", "pancreatitis", "acute pancreatitis", "gi"],
    html: `
<h4>Definition</h4>
<p>Predicts severity and mortality in acute pancreatitis.</p>

<h4>Key Concept</h4>
<p>Criteria assessed at admission and at 48 hours.</p>

<h4>Interpretation</h4>
<p>≥3 criteria indicate severe pancreatitis.</p>

<h4>Limitations</h4>
<p>Requires 48 hours; less used today.</p>
`
  },
  {
    name: "BISAP Score",
    keywords: ["bisap", "pancreatitis", "icu", "gi"],
    html: `
<h4>Definition</h4>
<p>Early predictor of mortality in acute pancreatitis.</p>

<h4>Components</h4>
<ul>
<li>BUN >25</li>
<li>Impaired mental status</li>
<li>SIRS</li>
<li>Age >60</li>
<li>Pleural effusion</li>
</ul>

<h4>Advantage</h4>
<p>Simple and early risk stratification.</p>
`
  },
  {
    name: "Glasgow-Blatchford Score",
    keywords: ["blatchford", "gbs", "gi bleeding", "upper gi"],
    html: `
<h4>Definition</h4>
<p>Predicts need for intervention in upper gastrointestinal bleeding.</p>

<h4>Clinical Use</h4>
<p>Score 0 allows safe outpatient management.</p>

<h4>Advantage</h4>
<p>No endoscopy required initially.</p>
`
  },
  {
    name: "Rockall Score (Upper GI Bleeding)",
    keywords: ["rockall", "upper gi bleeding", "ugi bleeding", "rebleeding", "endoscopy"],
    html: `
<h4>Definition</h4>
<p>A risk stratification tool used to predict mortality and rebleeding in patients with upper gastrointestinal bleeding.</p>

<h4>Structure</h4>
<ul>
<li>Pre-endoscopy Rockall</li>
<li>Complete Rockall (post-endoscopy)</li>
</ul>

<h4>Components</h4>
<ul>
<li>Age (0–2)</li>
<li>Shock – BP & HR (0–2)</li>
<li>Comorbidity (0–3)</li>
<li>Diagnosis – endoscopic (0–2)</li>
<li>Stigmata of bleeding (0–2)</li>
</ul>

<h4>Total Score</h4>
<p>0–11</p>

<h4>Interpretation</h4>
<ul>
<li>≤2: Low risk</li>
<li>≥8: High mortality risk</li>
</ul>

<h4>Clinical Use</h4>
<p>Prognosis after UGIB and identification of patients needing intensive monitoring.</p>

<h4>Limitations</h4>
<ul>
<li>Requires endoscopy for full accuracy</li>
<li>Less sensitive than Glasgow-Blatchford for initial triage</li>
</ul>

<h4>Exam Pearl</h4>
<p>GBS predicts need for intervention, Rockall predicts mortality.</p>
`
  },
  {
    name: "Framingham Risk Score",
    keywords: ["framingham", "cv risk", "cardiovascular risk", "cholesterol", "primary prevention"],
    html: `
<h4>Definition</h4>
<p>Estimates 10-year risk of developing cardiovascular disease.</p>

<h4>Population</h4>
<p>Derived from the Framingham Heart Study (USA).</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Sex</li>
<li>Total cholesterol</li>
<li>HDL cholesterol</li>
<li>Blood pressure</li>
<li>Smoking</li>
<li>Diabetes</li>
</ul>

<h4>Output</h4>
<p>Percentage risk (e.g. 10%, 20%).</p>

<h4>Risk Categories</h4>
<ul>
<li>&lt;10%: Low</li>
<li>10–20%: Intermediate</li>
<li>&gt;20%: High</li>
</ul>

<h4>Limitations</h4>
<p>Overestimates risk in non-Western populations and largely replaced by ASCVD.</p>
`
  },
  {
    name: "ASCVD Risk Calculator",
    keywords: ["ascvd", "atherosclerotic", "statin", "cardiovascular prevention"],
    html: `
<h4>Definition</h4>
<p>Predicts 10-year and lifetime risk of atherosclerotic cardiovascular disease.</p>

<h4>Outcomes Predicted</h4>
<ul>
<li>Myocardial infarction</li>
<li>Stroke</li>
<li>Cardiovascular death</li>
</ul>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Sex</li>
<li>Race</li>
<li>Total & HDL cholesterol</li>
<li>Systolic BP</li>
<li>Diabetes</li>
<li>Smoking</li>
<li>Antihypertensive therapy</li>
</ul>

<h4>Interpretation</h4>
<p>≥7.5% → consider statin therapy.</p>

<h4>Limitations</h4>
<p>Less accurate &lt;40 years and not validated &gt;79 years.</p>
`
  },
  {
    name: "ABCD² Score (TIA)",
    keywords: ["abcd2", "tia", "stroke risk", "neurology"],
    html: `
<h4>Definition</h4>
<p>Predicts early stroke risk after transient ischemic attack.</p>

<h4>Components</h4>
<ul>
<li>Age ≥60</li>
<li>Blood pressure ≥140/90</li>
<li>Clinical features (1–2 points)</li>
<li>Duration (1–2 points)</li>
<li>Diabetes</li>
</ul>

<h4>Score Range</h4>
<p>0–7</p>

<h4>Interpretation</h4>
<ul>
<li>0–3: Low risk</li>
<li>4–5: Moderate risk</li>
<li>6–7: High risk → hospital admission</li>
</ul>

<h4>Limitations</h4>
<p>Does not include imaging and underestimates posterior circulation TIA.</p>
`
  },
  {
    name: "Barthel Index",
    keywords: ["barthel", "adl", "functional status", "rehabilitation"],
    html: `
<h4>Definition</h4>
<p>Measures functional independence in activities of daily living.</p>

<h4>Activities Assessed</h4>
<ul>
<li>Feeding</li>
<li>Bathing</li>
<li>Grooming</li>
<li>Dressing</li>
<li>Bowel & bladder control</li>
<li>Toilet use</li>
<li>Transfers</li>
<li>Mobility</li>
<li>Stairs</li>
</ul>

<h4>Score Range</h4>
<p>0–100</p>

<h4>Interpretation</h4>
<ul>
<li>0–20: Total dependence</li>
<li>21–60: Severe</li>
<li>61–90: Moderate</li>
<li>91–100: Minimal dependence</li>
</ul>

<h4>Clinical Use</h4>
<p>Rehabilitation, stroke recovery, geriatrics.</p>
`
  },
  {
    name: "Karnofsky Performance Status (KPS)",
    keywords: ["karnofsky", "performance status", "oncology"],
    html: `
<h4>Definition</h4>
<p>Quantifies functional impairment in cancer patients.</p>

<h4>Scale</h4>
<ul>
<li>100: Normal</li>
<li>70: Cares for self</li>
<li>50: Requires assistance</li>
<li>0: Death</li>
</ul>

<h4>Clinical Use</h4>
<p>Chemotherapy tolerance, prognosis, clinical trials eligibility.</p>

<h4>Limitations</h4>
<p>Subjective with inter-observer variability.</p>
`
  },
  {
    name: "ECOG Performance Status",
    keywords: ["ecog", "performance status", "oncology", "chemotherapy"],
    html: `
<h4>Definition</h4>
<p>Simplified functional assessment used in oncology.</p>

<h4>Scale</h4>
<ul>
<li>0: Fully active</li>
<li>1: Restricted strenuous activity</li>
<li>2: Ambulatory, unable to work</li>
<li>3: Limited self-care</li>
<li>4: Completely disabled</li>
<li>5: Dead</li>
</ul>

<h4>Exam Pearl</h4>
<p>ECOG ≥3 indicates poor chemotherapy tolerance.</p>
`
  },
  {
    name: "ASA Physical Status Classification",
    keywords: ["asa", "anesthesia", "preoperative risk"],
    html: `
<h4>Definition</h4>
<p>Preoperative assessment of anesthetic risk.</p>

<h4>Classes</h4>
<ul>
<li>I: Healthy</li>
<li>II: Mild systemic disease</li>
<li>III: Severe systemic disease</li>
<li>IV: Severe disease, constant threat to life</li>
<li>V: Moribund</li>
<li>VI: Brain-dead (organ donor)</li>
</ul>

<h4>Limitations</h4>
<p>Subjective and does not include operative risk.</p>
`
  },
  {
    name: "CHADS₂ Score",
    keywords: ["chads2", "atrial fibrillation", "stroke risk"],
    html: `
<h4>Definition</h4>
<p>Older scoring system for stroke risk in atrial fibrillation.</p>

<h4>Components</h4>
<ul>
<li>CHF</li>
<li>Hypertension</li>
<li>Age ≥75</li>
<li>Diabetes</li>
<li>Stroke/TIA (2 points)</li>
</ul>

<h4>Score Range</h4>
<p>0–6</p>

<h4>Status</h4>
<p>Largely replaced by CHA₂DS₂-VASc.</p>

<h4>Exam Pearl</h4>
<p>Underestimates stroke risk in low-risk patients.</p>
`
  },
  {
    name: "PESI Score",
    keywords: ["pesi", "pulmonary embolism", "pe severity", "mortality"],
    html: `
<h4>Definition</h4>
<p>Predicts 30-day mortality in pulmonary embolism.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Male sex</li>
<li>Cancer</li>
<li>Heart failure</li>
<li>Chronic lung disease</li>
<li>HR ≥110</li>
<li>SBP &lt;100</li>
<li>RR ≥30</li>
<li>Temperature &lt;36°C</li>
<li>Altered mental status</li>
<li>O₂ saturation &lt;90%</li>
</ul>

<h4>Risk Classes</h4>
<ul>
<li>I–II: Low risk (outpatient possible)</li>
<li>III–V: High risk (hospitalization)</li>
</ul>

<h4>Clinical Use</h4>
<p>Decides outpatient vs inpatient treatment.</p>
`
  },
  {
    name: "NEWS2 Score",
    keywords: ["news2", "early warning score", "sepsis", "deterioration"],
    html: `
<h4>Definition</h4>
<p>Physiological scoring system to identify early clinical deterioration.</p>

<h4>Developed By</h4>
<p>Royal College of Physicians (UK).</p>

<h4>Physiological Parameters</h4>
<ul>
<li>Respiratory rate</li>
<li>Oxygen saturation</li>
<li>Supplemental oxygen</li>
<li>Temperature</li>
<li>Systolic blood pressure</li>
<li>Heart rate</li>
<li>Level of consciousness (AVPU)</li>
</ul>

<h4>Total Score</h4>
<p>0–20</p>

<h4>Interpretation</h4>
<ul>
<li>0–4: Low risk</li>
<li>5–6: Medium risk → urgent review</li>
<li>≥7: High risk → critical care</li>
</ul>

<h4>Exam Pearl</h4>
<p>NEWS2 ≥5 requires urgent clinical escalation.</p>
`
  },
  {
    name: "Braden Scale",
    keywords: ["braden", "pressure ulcer", "bedsore", "nursing"],
    html: `
<h4>Definition</h4>
<p>Predicts risk of pressure ulcer development.</p>

<h4>Components</h4>
<ul>
<li>Sensory perception</li>
<li>Moisture</li>
<li>Activity</li>
<li>Mobility</li>
<li>Nutrition</li>
<li>Friction & shear</li>
</ul>

<h4>Score Range</h4>
<p>6–23</p>

<h4>Interpretation</h4>
<ul>
<li>≤9: Very high risk</li>
<li>10–12: High risk</li>
<li>13–14: Moderate risk</li>
<li>15–18: Mild risk</li>
</ul>

<h4>Clinical Use</h4>
<p>Nursing care planning and preventive strategies.</p>

<h4>Limitations</h4>
<ul>
<li>Subjective scoring</li>
<li>Does not replace skin assessment</li>
</ul>
`
  },
  {
    name: "Mini-Mental State Examination (MMSE)",
    keywords: ["mmse", "mini mental", "cognitive", "dementia"],
    html: `
<h4>Definition</h4>
<p>Screening tool for global cognitive function.</p>

<h4>Domains</h4>
<ul>
<li>Orientation</li>
<li>Registration</li>
<li>Attention & calculation</li>
<li>Recall</li>
<li>Language</li>
<li>Visuospatial ability</li>
</ul>

<h4>Score Range</h4>
<p>0–30</p>

<h4>Interpretation</h4>
<ul>
<li>≥24: Normal</li>
<li>18–23: Mild impairment</li>
<li>&lt;18: Severe impairment</li>
</ul>

<h4>Clinical Use</h4>
<p>Dementia screening and cognitive follow-up.</p>

<h4>Limitations</h4>
<ul>
<li>Affected by education and language</li>
<li>Poor sensitivity for mild cognitive impairment</li>
</ul>
`
  },
  {
    name: "PHQ-9",
    keywords: ["phq9", "depression", "mental health", "psychiatry"],
    html: `
<h4>Definition</h4>
<p>Self-administered questionnaire assessing depression severity.</p>

<h4>Structure</h4>
<p>9 questions corresponding to DSM criteria for major depression.</p>

<h4>Score Range</h4>
<p>0–27</p>

<h4>Severity</h4>
<ul>
<li>0–4: Minimal</li>
<li>5–9: Mild</li>
<li>10–14: Moderate</li>
<li>15–19: Moderately severe</li>
<li>≥20: Severe</li>
</ul>

<h4>Clinical Use</h4>
<p>Primary care screening and treatment monitoring.</p>

<h4>Exam Pearl</h4>
<p>Question 9 screens for suicidal ideation.</p>
`
  },
  {
    name: "GAD-7",
    keywords: ["gad7", "anxiety", "mental health", "psychiatry"],
    html: `
<h4>Definition</h4>
<p>Screening and severity tool for generalized anxiety disorder.</p>

<h4>Score Range</h4>
<p>0–21</p>

<h4>Interpretation</h4>
<ul>
<li>5: Mild</li>
<li>10: Moderate</li>
<li>15: Severe</li>
</ul>

<h4>Clinical Use</h4>
<p>Psychiatry and primary care screening.</p>

<h4>Limitations</h4>
<ul>
<li>Not diagnostic alone</li>
<li>Anxiety subtype overlap</li>
</ul>
`
  },
  {
    name: "Beck Depression Inventory (BDI)",
    keywords: ["bdi", "beck depression", "depression scale"],
    html: `
<h4>Definition</h4>
<p>Self-report inventory assessing depression severity.</p>

<h4>Structure</h4>
<p>21 items, each scored 0–3.</p>

<h4>Score Range</h4>
<p>0–63</p>

<h4>Interpretation</h4>
<ul>
<li>0–13: Minimal</li>
<li>14–19: Mild</li>
<li>20–28: Moderate</li>
<li>≥29: Severe</li>
</ul>

<h4>Clinical Use</h4>
<p>Psychiatry and research settings.</p>

<h4>Limitations</h4>
<p>Subjective with somatic symptom overlap.</p>
`
  },
  {
    name: "Ottawa Ankle Rules",
    keywords: ["ottawa ankle", "ankle xray", "trauma"],
    html: `
<h4>Definition</h4>
<p>Clinical decision rule to determine need for ankle or foot X-ray after trauma.</p>

<h4>Indications for X-ray</h4>
<ul>
<li>Bone tenderness at malleoli</li>
<li>Inability to bear weight (4 steps)</li>
<li>5th metatarsal base tenderness</li>
<li>Navicular tenderness</li>
</ul>

<h4>Clinical Impact</h4>
<ul>
<li>Reduces unnecessary imaging</li>
<li>High sensitivity (&gt;95%)</li>
</ul>

<h4>Limitation</h4>
<p>Low specificity.</p>
`
  },
  {
    name: "Canadian CT Head Rule",
    keywords: ["canadian ct", "head injury", "ct scan", "trauma"],
    html: `
<h4>Definition</h4>
<p>Identifies patients with minor head injury requiring CT scan.</p>

<h4>High-Risk Criteria</h4>
<ul>
<li>GCS &lt;15 at 2 hours</li>
<li>Suspected open skull fracture</li>
<li>Basal skull fracture signs</li>
<li>≥2 vomiting episodes</li>
<li>Age ≥65</li>
</ul>

<h4>Medium Risk</h4>
<ul>
<li>Amnesia &gt;30 minutes</li>
<li>Dangerous mechanism</li>
</ul>

<h4>Exam Pearl</h4>
<p>Applies only if GCS 13–15.</p>
`
  },
  {
    name: "Centor Score (Modified McIsaac)",
    keywords: ["centor", "mcisaac", "strep throat", "pharyngitis"],
    html: `
<h4>Definition</h4>
<p>Predicts probability of Group A streptococcal pharyngitis.</p>

<h4>Criteria</h4>
<ul>
<li>Tonsillar exudates</li>
<li>Tender anterior cervical nodes</li>
<li>Fever</li>
<li>Absence of cough</li>
<li>Age modifier</li>
</ul>

<h4>Score Range</h4>
<p>−1 to +5</p>

<h4>Management</h4>
<ul>
<li>≤1: No testing</li>
<li>2–3: Rapid antigen test</li>
<li>≥4: Empiric antibiotics</li>
</ul>
`
  },
  {
    name: "Duke Criteria (Infective Endocarditis)",
    keywords: ["duke", "endocarditis", "ie"],
    html: `
<h4>Definition</h4>
<p>Diagnostic criteria for infective endocarditis.</p>

<h4>Major Criteria</h4>
<ul>
<li>Positive blood cultures (typical organisms)</li>
<li>Evidence of endocardial involvement (echo)</li>
</ul>

<h4>Minor Criteria</h4>
<ul>
<li>Predisposing condition</li>
<li>Fever</li>
<li>Vascular phenomena</li>
<li>Immunologic phenomena</li>
<li>Microbiologic evidence</li>
</ul>

<h4>Diagnosis</h4>
<ul>
<li>Definite: 2 major OR 1 major + 3 minor</li>
<li>Possible: 1 major + 1 minor</li>
</ul>
`
  },
  {
    name: "Modified Rankin Scale (mRS)",
    keywords: ["mrs", "rankin", "stroke outcome"],
    html: `
<h4>Definition</h4>
<p>Global disability scale used to assess functional outcome after stroke.</p>

<h4>Scale</h4>
<ul>
<li>0: No symptoms</li>
<li>1: No significant disability</li>
<li>2: Slight disability</li>
<li>3: Moderate disability</li>
<li>4: Moderately severe disability</li>
<li>5: Severe disability</li>
<li>6: Death</li>
</ul>

<h4>Clinical Use</h4>
<p>Stroke outcome measurement and rehabilitation planning.</p>

<h4>Exam Pearl</h4>
<p>mRS ≤2 indicates functional independence.</p>
`
  },
  {
    name: "SIRS Criteria",
    keywords: ["sirs", "sepsis", "inflammatory response"],
    html: `
<h4>Definition</h4>
<p>Defines systemic inflammatory response syndrome.</p>

<h4>Criteria (≥2)</h4>
<ul>
<li>Temperature &gt;38°C or &lt;36°C</li>
<li>Heart rate &gt;90 bpm</li>
<li>Respiratory rate &gt;20 or PaCO₂ &lt;32 mmHg</li>
<li>WBC &gt;12,000 or &lt;4,000 or &gt;10% bands</li>
</ul>

<h4>Clinical Role</h4>
<p>Older sepsis screening tool.</p>

<h4>Limitations</h4>
<ul>
<li>Poor specificity</li>
<li>Replaced by SOFA/qSOFA in Sepsis-3</li>
</ul>

<h4>Exam Pearl</h4>
<p>SIRS ≠ infection necessarily.</p>
`
  },
  {
    name: "HScore (HLH)",
    keywords: ["hscore", "hlh", "hemophagocytic", "ferritin", "cytopenia"],
    html: `
<h4>Definition</h4>
<p>Estimates probability of secondary hemophagocytic lymphohistiocytosis (HLH).</p>

<h4>Variables</h4>
<ul>
<li>Immunosuppression</li>
<li>Fever</li>
<li>Organomegaly</li>
<li>Cytopenias</li>
<li>Ferritin</li>
<li>Triglycerides</li>
<li>Fibrinogen</li>
<li>AST</li>
<li>Bone marrow hemophagocytosis</li>
</ul>

<h4>Score Range</h4>
<p>0–337</p>

<h4>Interpretation</h4>
<p>≥169 → High probability of HLH.</p>

<h4>Clinical Use</h4>
<p>Hematology and ICU evaluation of unexplained fever and cytopenia.</p>

<h4>Limitations</h4>
<ul>
<li>Not validated in pediatrics</li>
<li>Bone marrow findings may be absent early</li>
</ul>
`
  },
  {
    name: "CHA₂DS₂-VASc-HS Score",
    keywords: ["cha2ds2", "vasc-hs", "stroke", "afib"],
    html: `
<h4>Definition</h4>
<p>Extended version of CHA₂DS₂-VASc score to improve stroke risk prediction.</p>

<h4>Added Factors</h4>
<ul>
<li>Hyperlipidemia</li>
<li>Smoking</li>
</ul>

<h4>Clinical Status</h4>
<p>Research-based score, not yet guideline standard.</p>

<h4>Limitation</h4>
<p>Limited external validation.</p>
`
  },
  {
    name: "PADUA Prediction Score",
    keywords: ["padua", "vte", "thrombosis", "medical patients"],
    html: `
<h4>Definition</h4>
<p>Assesses risk of venous thromboembolism in hospitalized medical patients.</p>

<h4>High-Risk Factors</h4>
<ul>
<li>Active cancer</li>
<li>Previous VTE</li>
<li>Reduced mobility</li>
<li>Thrombophilia</li>
<li>Trauma or surgery</li>
<li>Age ≥70</li>
</ul>

<h4>Interpretation</h4>
<p>Score ≥4 → High VTE risk → pharmacologic prophylaxis.</p>

<h4>Clinical Use</h4>
<p>Internal medicine wards and thromboprophylaxis decisions.</p>
`
  },
  {
    name: "Caprini Score",
    keywords: ["caprini", "vte", "surgery", "dvt risk"],
    html: `
<h4>Definition</h4>
<p>Risk assessment model for venous thromboembolism in surgical patients.</p>

<h4>Factors</h4>
<ul>
<li>Age</li>
<li>BMI</li>
<li>Surgery type</li>
<li>Malignancy</li>
<li>Hormonal therapy</li>
<li>Previous VTE</li>
</ul>

<h4>Risk Categories</h4>
<ul>
<li>Low: 0–1</li>
<li>Moderate: 2</li>
<li>High: 3–4</li>
<li>Highest: ≥5</li>
</ul>

<h4>Clinical Use</h4>
<p>Pre-operative planning and guideline-recommended prophylaxis.</p>
`
  },
  {
    name: "MUST Score",
    keywords: ["must", "malnutrition", "nutrition screening"],
    html: `
<h4>Definition</h4>
<p>Malnutrition Universal Screening Tool for adults.</p>

<h4>Components</h4>
<ul>
<li>BMI</li>
<li>Unintentional weight loss</li>
<li>Acute illness effect</li>
</ul>

<h4>Score</h4>
<ul>
<li>0: Low risk</li>
<li>1: Medium risk</li>
<li>≥2: High risk</li>
</ul>

<h4>Clinical Use</h4>
<p>Hospital and community nutrition screening.</p>
`
  },
  {
    name: "FIB-4 Index",
    keywords: ["fib4", "liver fibrosis", "nafld", "hepatitis"],
    html: `
<h4>Definition</h4>
<p>Non-invasive marker used to estimate liver fibrosis.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>AST</li>
<li>ALT</li>
<li>Platelet count</li>
</ul>

<h4>Interpretation</h4>
<ul>
<li>&lt;1.3: Low fibrosis</li>
<li>≥2.67: Advanced fibrosis likely</li>
</ul>

<h4>Clinical Use</h4>
<p>Chronic hepatitis and NAFLD assessment.</p>

<h4>Advantage</h4>
<p>Avoids liver biopsy.</p>
`
  },
  {
    name: "SAPS II",
    keywords: ["saps2", "icu score", "mortality"],
    html: `
<h4>Definition</h4>
<p>Simplified Acute Physiology Score II predicting hospital mortality in ICU patients.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Vital signs</li>
<li>Laboratory values</li>
<li>Chronic disease</li>
<li>Admission type</li>
</ul>

<h4>Comparison</h4>
<ul>
<li>Less complex than APACHE II</li>
<li>Mainly used in research</li>
</ul>

<h4>Limitation</h4>
<p>Population-based, not for individual clinical decisions.</p>
`
  },
  {
    name: "Shock Index",
    keywords: ["shock index", "sepsis", "trauma", "hemodynamics"],
    html: `
<h4>Definition</h4>
<p>Simple hemodynamic marker of early circulatory compromise.</p>

<h4>Formula</h4>
<p>Shock Index = Heart Rate / Systolic Blood Pressure</p>

<h4>Interpretation</h4>
<ul>
<li>0.5–0.7: Normal</li>
<li>≥1: Severe shock, high mortality</li>
</ul>

<h4>Clinical Use</h4>
<p>Trauma, sepsis, and emergency triage.</p>

<h4>Exam Pearl</h4>
<p>Shock index rises before hypotension appears.</p>
`
  },
  {
    name: "Hunt–Hess Scale",
    keywords: ["hunt hess", "sah", "subarachnoid hemorrhage"],
    html: `
<h4>Definition</h4>
<p>Clinical grading system assessing severity of subarachnoid hemorrhage.</p>

<h4>Scale</h4>
<ul>
<li>I: Asymptomatic or mild headache</li>
<li>II: Moderate headache, nuchal rigidity</li>
<li>III: Drowsiness, confusion</li>
<li>IV: Stupor, severe deficit</li>
<li>V: Coma</li>
</ul>

<h4>Clinical Use</h4>
<p>Prognosis estimation, surgical timing, ICU triage.</p>

<h4>Exam Pearl</h4>
<p>Higher grade correlates with higher mortality and vasospasm risk.</p>
`
  },
  {
    name: "Fisher Scale",
    keywords: ["fisher scale", "sah ct", "vasospasm"],
    html: `
<h4>Definition</h4>
<p>CT-based grading system predicting vasospasm risk after SAH.</p>

<h4>Scale</h4>
<ul>
<li>I: No blood</li>
<li>II: Thin diffuse blood</li>
<li>III: Thick clot (&gt;1 mm)</li>
<li>IV: Intraventricular or intracerebral hemorrhage</li>
</ul>

<h4>Clinical Use</h4>
<p>Vasospasm risk stratification and ICU monitoring.</p>

<h4>Limitation</h4>
<p>Does not assess clinical status.</p>
`
  },
  {
    name: "Wells–Riley Score",
    keywords: ["wells riley", "tb transmission", "tuberculosis"],
    html: `
<h4>Definition</h4>
<p>Epidemiological model estimating airborne tuberculosis transmission risk.</p>

<h4>Formula Includes</h4>
<ul>
<li>Number of infectious individuals</li>
<li>Ventilation rate</li>
<li>Exposure time</li>
<li>Infectious quanta</li>
</ul>

<h4>Clinical Use</h4>
<p>Public health, infection control, hospital isolation planning.</p>

<h4>Limitation</h4>
<ul>
<li>Assumption-based</li>
<li>Not used for individual diagnosis</li>
</ul>
`
  },
  {
    name: "Maddrey’s Discriminant Function (DF)",
    keywords: ["maddrey", "df", "alcoholic hepatitis", "steroids"],
    html: `
<h4>Definition</h4>
<p>Predicts mortality in alcoholic hepatitis and guides corticosteroid therapy.</p>

<h4>Formula</h4>
<p>DF = 4.6 × (PT prolongation) + serum bilirubin (mg/dL)</p>

<h4>Interpretation</h4>
<ul>
<li>DF ≥32: Severe disease → consider corticosteroids</li>
</ul>

<h4>Clinical Use</h4>
<p>Hepatology management and ICU admission decisions.</p>

<h4>Limitations</h4>
<ul>
<li>PT variability</li>
<li>Less accurate than MELD in some studies</li>
</ul>

<h4>Exam Pearl</h4>
<p>DF ≥32 = high short-term mortality.</p>
`
  },
  {
    name: "Lille Score",
    keywords: ["lille score", "alcoholic hepatitis", "steroid response"],
    html: `
<h4>Definition</h4>
<p>Evaluates response to corticosteroids in severe alcoholic hepatitis.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Albumin</li>
<li>Bilirubin (day 0 and day 7)</li>
<li>Creatinine</li>
<li>Prothrombin time</li>
</ul>

<h4>Interpretation</h4>
<p>Score >0.45 → Non-responder → stop steroids.</p>

<h4>Clinical Use</h4>
<p>Prevents unnecessary steroid exposure.</p>

<h4>Advantage</h4>
<p>Dynamic, response-based score.</p>
`
  },
  {
    name: "CRB-65 Score",
    keywords: ["crb-65", "pneumonia", "severity", "primary care"],
    html: `
<h4>Definition</h4>
<p>Simplified pneumonia severity score excluding urea measurement.</p>

<h4>Components</h4>
<ul>
<li>Confusion</li>
<li>Respiratory rate ≥30</li>
<li>Blood pressure <90/60</li>
<li>Age ≥65</li>
</ul>

<h4>Interpretation</h4>
<p>Score ≥2 → hospital admission.</p>

<h4>Clinical Use</h4>
<p>Primary care and resource-limited settings.</p>
`
  },
  {
    name: "Child–Turcotte Score",
    keywords: ["child turcotte", "liver disease", "cirrhosis"],
    html: `
<h4>Definition</h4>
<p>Original scoring system for liver disease severity before INR inclusion.</p>

<h4>Components</h4>
<ul>
<li>Ascites</li>
<li>Encephalopathy</li>
<li>Nutritional status</li>
<li>Albumin</li>
<li>Bilirubin</li>
</ul>

<h4>Historical Importance</h4>
<p>Basis for the modern Child–Pugh score.</p>

<h4>Limitations</h4>
<ul>
<li>Subjective nutritional assessment</li>
<li>Largely obsolete</li>
</ul>
`
  },
  {
    name: "McCabe Score",
    keywords: ["mccabe", "prognosis", "sepsis"],
    html: `
<h4>Definition</h4>
<p>Classifies severity of underlying disease based on life expectancy.</p>

<h4>Categories</h4>
<ul>
<li>Non-fatal disease</li>
<li>Ultimately fatal disease (≤5 years)</li>
<li>Rapidly fatal disease (≤1 year)</li>
</ul>

<h4>Clinical Use</h4>
<p>Infection prognosis studies and sepsis research.</p>

<h4>Limitation</h4>
<p>Broad categories; rarely used clinically today.</p>
`
  },
  {
    name: "pSOFA Score",
    keywords: ["psofa", "pediatric sepsis", "organ failure"],
    html: `
<h4>Definition</h4>
<p>Pediatric adaptation of SOFA score for organ dysfunction.</p>

<h4>Systems Assessed</h4>
<ul>
<li>Respiratory</li>
<li>Cardiovascular</li>
<li>Hepatic</li>
<li>Coagulation</li>
<li>Renal</li>
<li>Neurologic (age-adjusted GCS)</li>
</ul>

<h4>Clinical Use</h4>
<p>Pediatric sepsis diagnosis and ICU prognosis.</p>

<h4>Advantage</h4>
<p>Age-adjusted variables.</p>
`
  },
  {
    name: "LACE Index",
    keywords: ["lace index", "readmission", "discharge planning"],
    html: `
<h4>Definition</h4>
<p>Predicts 30-day readmission or death after hospital discharge.</p>

<h4>Components</h4>
<ul>
<li>Length of stay</li>
<li>Acuity of admission</li>
<li>Comorbidities (Charlson Index)</li>
<li>Emergency visits (past 6 months)</li>
</ul>

<h4>Score Range</h4>
<p>0–19</p>

<h4>Interpretation</h4>
<p>Score ≥10 → high readmission risk.</p>

<h4>Clinical Use</h4>
<p>Discharge planning and transitional care programs.</p>
`
  },
  {
    name: "CHADS₂ Score",
    keywords: ["chads2", "afib", "stroke risk"],
    html: `
<h4>Definition</h4>
<p>Early clinical prediction rule estimating annual stroke risk in atrial fibrillation.</p>

<h4>Components</h4>
<ul>
<li>Congestive heart failure</li>
<li>Hypertension</li>
<li>Age ≥75</li>
<li>Diabetes mellitus</li>
<li>Stroke/TIA (2 points)</li>
</ul>

<h4>Score Range</h4>
<p>0–6</p>

<h4>Limitations</h4>
<ul>
<li>Underestimates risk in low-risk patients</li>
<li>Does not include vascular disease or age 65–74</li>
</ul>

<h4>Exam Pearl</h4>
<p>Foundation for CHA₂DS₂-VASc.</p>
`
  },
  {
    name: "AIMS65 Score",
    keywords: ["aims65", "ugi bleeding", "icu risk"],
    html: `
<h4>Definition</h4>
<p>Predicts in-hospital mortality in upper gastrointestinal bleeding.</p>

<h4>Components</h4>
<ul>
<li>Albumin <3.0 g/dL</li>
<li>INR >1.5</li>
<li>Altered mental status</li>
<li>Systolic BP ≤90 mmHg</li>
<li>Age ≥65</li>
</ul>

<h4>Score Range</h4>
<p>0–5</p>

<h4>Interpretation</h4>
<ul>
<li>≥2: Increased mortality risk</li>
<li>≥3: ICU consideration</li>
</ul>

<h4>Limitation</h4>
<p>Does not predict rebleeding well.</p>
`
  },
  {
    name: "CALL Score (COVID-19)",
    keywords: ["call score", "covid", "pneumonia severity"],
    html: `
<h4>Definition</h4>
<p>Predicts progression to severe COVID-19 pneumonia.</p>

<h4>Components</h4>
<ul>
<li>Comorbidity</li>
<li>Age</li>
<li>Lymphocyte count</li>
<li>LDH level</li>
</ul>

<h4>Interpretation</h4>
<p>Higher score → higher risk of respiratory deterioration.</p>

<h4>Clinical Use</h4>
<p>COVID ward triage and resource allocation.</p>

<h4>Limitation</h4>
<p>Disease-specific and less relevant post-pandemic.</p>
`
  },
  {
    name: "CURB Score (Without Age)",
    keywords: ["curb", "pneumonia", "severity"],
    html: `
<h4>Definition</h4>
<p>Simplified pneumonia severity score derived from CURB-65 excluding age.</p>

<h4>Components</h4>
<ul>
<li>Confusion</li>
<li>Urea >7 mmol/L</li>
<li>Respiratory rate ≥30</li>
<li>Blood pressure <90/60</li>
</ul>

<h4>Clinical Use</h4>
<p>Younger patients or situations where age skews severity.</p>

<h4>Limitation</h4>
<p>Less validated than CURB-65.</p>
`
  },
  {
    name: "CHA₂DS₂-VASc-R Score",
    keywords: ["cha2ds2-vasc-r", "afib", "renal", "ckd", "stroke risk"],
    html: `
<h4>Definition</h4>
<p>Modified stroke risk score including renal dysfunction.</p>

<h4>Added Variable</h4>
<p>Renal impairment (eGFR &lt;60 mL/min).</p>

<h4>Purpose</h4>
<p>Improves stroke risk prediction in CKD patients with atrial fibrillation.</p>

<h4>Status</h4>
<ul>
<li>Research-based</li>
<li>Not guideline standard</li>
</ul>
`
  },
  {
    name: "QUICKI Index",
    keywords: ["quicki", "insulin sensitivity", "diabetes", "endocrinology"],
    html: `
<h4>Definition</h4>
<p>Quantitative Insulin Sensitivity Check Index estimating insulin sensitivity.</p>

<h4>Formula</h4>
<p>1 / [log(fasting insulin) + log(fasting glucose)]</p>

<h4>Interpretation</h4>
<p>Lower QUICKI values indicate insulin resistance.</p>

<h4>Clinical Use</h4>
<p>Endocrinology and metabolic syndrome research.</p>

<h4>Limitation</h4>
<p>Requires fasting insulin, not routinely measured.</p>
`
  },
  {
    name: "NAFLD Fibrosis Score (NFS)",
    keywords: ["nafld", "fibrosis", "nfs", "liver"],
    html: `
<h4>Definition</h4>
<p>Non-invasive score predicting advanced fibrosis in NAFLD.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>BMI</li>
<li>Diabetes</li>
<li>AST/ALT ratio</li>
<li>Platelet count</li>
<li>Albumin</li>
</ul>

<h4>Interpretation</h4>
<ul>
<li>Low score → excludes advanced fibrosis</li>
<li>High score → advanced fibrosis likely</li>
</ul>

<h4>Advantage</h4>
<p>Reduces need for liver biopsy.</p>
`
  },
  {
    name: "BODE Index",
    keywords: ["bode", "copd", "prognosis", "pulmonology"],
    html: `
<h4>Definition</h4>
<p>Predicts mortality in chronic obstructive pulmonary disease (COPD).</p>

<h4>Components</h4>
<ul>
<li>BMI</li>
<li>Airflow obstruction (FEV₁)</li>
<li>Dyspnea (mMRC scale)</li>
<li>Exercise capacity (6-minute walk)</li>
</ul>

<h4>Score Range</h4>
<p>0–10</p>

<h4>Interpretation</h4>
<p>Higher score indicates worse prognosis.</p>

<h4>Exam Pearl</h4>
<p>BODE index is more prognostic than FEV₁ alone.</p>
`
  },
  {
    name: "MELD-XI Score",
    keywords: ["meld-xi", "liver", "heart failure", "anticoagulation"],
    html: `
<h4>Definition</h4>
<p>Modified MELD score excluding INR when INR is unreliable.</p>

<h4>Variables</h4>
<ul>
<li>Serum creatinine</li>
<li>Serum bilirubin</li>
</ul>

<h4>Clinical Use</h4>
<p>Patients on anticoagulation or advanced heart failure.</p>

<h4>Limitation</h4>
<p>Less accurate than MELD-Na.</p>
`
  },
  {
    name: "FOUR Score",
    keywords: ["four score", "coma", "icu", "neurology"],
    html: `
<h4>Definition</h4>
<p>Full Outline of UnResponsiveness neurological coma scale.</p>

<h4>Components</h4>
<ul>
<li>Eye response</li>
<li>Motor response</li>
<li>Brainstem reflexes</li>
<li>Respiration pattern</li>
</ul>

<h4>Score Range</h4>
<p>0–16</p>

<h4>Advantages</h4>
<ul>
<li>No verbal component</li>
<li>Better ICU prognostic value</li>
</ul>

<h4>Exam Pearl</h4>
<p>Superior to GCS in intubated patients.</p>
`
  },
  {
    name: "Charlson Comorbidity Index (CCI)",
    keywords: ["charlson", "comorbidity", "mortality", "lace"],
    html: `
<h4>Definition</h4>
<p>Weighted index predicting 10-year mortality based on comorbid conditions.</p>

<h4>Components</h4>
<p>19 conditions with weights from 1–6 (e.g. CHF, CKD, malignancy, AIDS).</p>

<h4>Scoring</h4>
<p>Higher total score indicates higher mortality risk.</p>

<h4>Clinical Use</h4>
<ul>
<li>Prognostic stratification</li>
<li>Research adjustment</li>
<li>Used within LACE index</li>
</ul>

<h4>Exam Pearl</h4>
<p>CCI is prognostic, not a treatment guide.</p>
`
  },
  {
    name: "Killip–Kimball Classification",
    keywords: ["killip", "acs", "heart failure", "mi"],
    html: `
<h4>Definition</h4>
<p>Clinical classification of heart failure severity in acute myocardial infarction.</p>

<h4>Classes</h4>
<ul>
<li>I: No heart failure</li>
<li>II: S3 gallop, basal crackles</li>
<li>III: Acute pulmonary edema</li>
<li>IV: Cardiogenic shock</li>
</ul>

<h4>Prognostic Value</h4>
<p>Higher class indicates higher in-hospital mortality.</p>

<h4>Exam Pearl</h4>
<p>Killip IV = highest mortality.</p>
`
  },
  {
    name: "Blatchford–Rockall Combined Score",
    keywords: ["blatchford", "rockall", "ugi bleeding"],
    html: `
<h4>Definition</h4>
<p>Combines Glasgow-Blatchford Score (triage) with Rockall Score (mortality).</p>

<h4>Clinical Logic</h4>
<ul>
<li>GBS → need for intervention</li>
<li>Rockall → mortality and rebleeding risk</li>
</ul>

<h4>Clinical Use</h4>
<p>Upper GI bleeding pathways and audits.</p>

<h4>Limitation</h4>
<p>Requires endoscopy for full application.</p>
`
  },
  {
    name: "MELD-Na Score",
    keywords: ["meld-na", "liver transplant", "cirrhosis"],
    html: `
<h4>Definition</h4>
<p>Updated MELD score including serum sodium.</p>

<h4>Variables</h4>
<ul>
<li>Bilirubin</li>
<li>INR</li>
<li>Creatinine</li>
<li>Sodium</li>
</ul>

<h4>Clinical Importance</h4>
<p>Current standard for liver transplant allocation.</p>

<h4>Exam Pearl</h4>
<p>MELD-Na replaced MELD in most transplant systems.</p>
`
  },
  {
    name: "De Ritis Ratio (AST/ALT)",
    keywords: ["de ritis", "ast alt", "liver disease"],
    html: `
<h4>Definition</h4>
<p>Biochemical ratio used to assess liver disease etiology and severity.</p>

<h4>Interpretation</h4>
<ul>
<li>&lt;1: Viral hepatitis</li>
<li>≈2: Alcoholic liver disease</li>
<li>≈1: Advanced fibrosis or cirrhosis</li>
</ul>

<h4>Clinical Use</h4>
<p>Hepatology and prognostic assessment.</p>

<h4>Limitation</h4>
<p>Affected by muscle injury and hemolysis.</p>
`
  },
  {
    name: "CURS Score (Cardiac Surgery Risk Score)",
    keywords: ["curs", "cardiac surgery", "perioperative mortality"],
    html: `
<h4>Definition</h4>
<p>Simplified risk score predicting perioperative mortality in cardiac surgery.</p>

<h4>Variables</h4>
<ul>
<li>Age</li>
<li>Left ventricular function</li>
<li>Renal dysfunction</li>
<li>Urgency of surgery</li>
</ul>

<h4>Clinical Use</h4>
<ul>
<li>Preoperative counseling</li>
<li>Surgical risk stratification</li>
</ul>

<h4>Limitation</h4>
<p>Superseded by EuroSCORE II in many centers.</p>
`
  },
  {
    name: "EuroSCORE II",
    keywords: ["euroscore ii", "cardiac surgery", "operative mortality"],
    html: `
<h4>Definition</h4>
<p>Predicts operative mortality in cardiac surgery patients.</p>

<h4>Variables</h4>
<ul>
<li>Patient factors (age, renal function)</li>
<li>Cardiac status</li>
<li>Operation complexity</li>
</ul>

<h4>Output</h4>
<p>Predicted mortality percentage.</p>

<h4>Clinical Use</h4>
<ul>
<li>Cardiac surgery planning</li>
<li>Benchmarking surgical outcomes</li>
</ul>

<h4>Exam Pearl</h4>
<p>EuroSCORE II is more accurate than the original EuroSCORE.</p>
`
  },
  {
    name: "STOP-BANG Questionnaire",
    keywords: ["stop-bang", "sleep apnea", "osa", "anesthesia"],
    html: `
<h4>Definition</h4>
<p>Screening questionnaire for obstructive sleep apnea (OSA).</p>

<h4>Components</h4>
<ul>
<li>Snoring</li>
<li>Tiredness</li>
<li>Observed apnea</li>
<li>Pressure (hypertension)</li>
<li>BMI &gt;35</li>
<li>Age &gt;50</li>
<li>Neck circumference</li>
<li>Male gender</li>
</ul>

<h4>Interpretation</h4>
<p>Score ≥3 indicates high risk of OSA.</p>

<h4>Clinical Use</h4>
<ul>
<li>Preoperative assessment</li>
<li>Sleep clinic screening</li>
</ul>

<h4>Limitation</h4>
<p>High sensitivity but low specificity.</p>
`
  },
  {
    name: "SOAR Score",
    keywords: ["soar", "stroke prognosis", "ischemic stroke"],
    html: `
<h4>Definition</h4>
<p>Predicts mortality after acute ischemic stroke.</p>

<h4>Components</h4>
<ul>
<li>Stroke subtype</li>
<li>Oxfordshire classification</li>
<li>Age</li>
<li>Pre-stroke disability</li>
</ul>

<h4>Clinical Use</h4>
<ul>
<li>Early prognostic counseling</li>
<li>Research stratification</li>
</ul>

<h4>Limitation</h4>
<p>Less commonly used than NIHSS combined with mRS.</p>
`
  },
  {
    name: "CURB-RS Score",
    keywords: ["curb-rs", "pneumonia", "renal dysfunction"],
    html: `
<h4>Definition</h4>
<p>Renal-sensitive pneumonia severity score.</p>

<h4>Components</h4>
<ul>
<li>CURB-65 variables</li>
<li>Renal impairment (eGFR &lt;60 mL/min)</li>
</ul>

<h4>Purpose</h4>
<p>Improves mortality prediction in elderly and CKD patients.</p>

<h4>Status</h4>
<ul>
<li>Research-based</li>
<li>Limited clinical adoption</li>
</ul>
`
  }
];
function normalize(input) {
  return input.toLowerCase().replace(/[^a-z0-9]/g, "");
}
function ScoresPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const matches = useMemo(() => {
    const normalized = normalize(query);
    if (!normalized) return [];
    return SCORES.filter((score) => normalize(score.name).includes(normalized) || normalize(score.keywords.join(" ")).includes(normalized)).slice(0, 15);
  }, [query]);
  return /* @__PURE__ */ jsxs(AppShell, { title: "Medical Scores Library", subtitle: "Search 70+ validated medical scoring systems and open details in-place.", children: [
    /* @__PURE__ */ jsxs("section", { className: "medora-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "medora-search-wrap", children: [
        /* @__PURE__ */ jsx("input", { className: "medora-input", value: query, onChange: (event) => setQuery(event.target.value), placeholder: "Search by name, abbreviation, or keyword" }),
        matches.length > 0 && /* @__PURE__ */ jsx("div", { className: "medora-suggestions", children: matches.map((score) => /* @__PURE__ */ jsx("button", { className: "medora-suggestion", onClick: () => {
          setSelected(score);
          setQuery("");
        }, children: score.name }, score.name)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "medora-grid medora-grid-3", style: {
        marginTop: 16
      }, children: SCORES.slice(0, 24).map((score) => /* @__PURE__ */ jsxs("button", { className: "medora-card", onClick: () => setSelected(score), style: {
        textAlign: "left",
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsx("h4", { children: score.name }),
        /* @__PURE__ */ jsx("p", { children: score.keywords.join(", ") })
      ] }, score.name)) })
    ] }),
    selected && /* @__PURE__ */ jsx("div", { className: "medora-modal", onClick: () => setSelected(null), children: /* @__PURE__ */ jsxs("div", { className: "medora-modal-box", onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsxs("div", { className: "medora-inline", style: {
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsx("h3", { children: selected.name }),
        /* @__PURE__ */ jsx("button", { className: "medora-btn medora-btn-secondary", onClick: () => setSelected(null), children: "Close" })
      ] }),
      /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: {
        __html: selected.html
      } })
    ] }) })
  ] });
}
export {
  ScoresPage as component
};
