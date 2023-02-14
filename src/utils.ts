// export const websiteURL = "http://localhost:8080/";
export const websiteURL = "http://conpec.mlsoc.vt.edu:8443/";

export const displayLabels = (values) => {
  const value = JSON.parse(JSON.stringify(values)).map((x) => x["label"]);
  return value.join(", ");
};

export const physicalDisOptions = [
  "None",
  "Mobility impairment",
  "Hearing impairment",
  "Vision impairment",
  "Speech impairment",
  "Autism",
  "Attention-deficit/hyperactivity disorder (ADHD)",
  "Others",
];
