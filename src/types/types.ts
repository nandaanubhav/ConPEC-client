export interface UploadItem {
  contentType: string;
  description: string;
  file: string;
}

export const UserFields = [
  { key: "email", label: "Email", sortable: true, sortDirection: "desc" },
  { key: "firstName", label: "First Name", sortable: true },
  { key: "lastName", label: "Last Name", sortable: true },
  { key: "title", label: "Title" },
  { key: "gender", label: "Gender" },
  { key: "ethnicity", label: "Ethnicity" },
  {
    key: "nameOrg",
    label: "Name of Organization",
    formatter: (value, key, item) => {
      return value ? "Yes" : "No";
    },
    sortable: true,
    sortByFormatted: true,
    filterByFormatted: true,
  },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Last Updated" },
  // { key: "actions", label: "Actions" },
];
//   "email",
//   "firstName",
//   "lastName",
//   "title",
//   "gender",
//   "ethnicity",
//   "nameOrg",
//   "createdAt",
//   "updatedAt",
// ];

export const InstructorFields = [
  "location",
  "department",
  "physicalDis",
  "ageRange",
  "insType",
];

export const IndustryPractitionerFields = [
  "ageRange",
  "department",
  "ethnicDiv",
  "expertise",
  "genderDiv",
  "levelEducation",
  "location",
  "organPolicy",
  "physicalDis",
  "position",
  "size",
  "type",
  "website",
  "yearsOfExp",
];

export const CourseRequestFields = [
  "academicLevel",
  "ageRange",
  "areaOfExpertise",
  "classSize",
  "countryStudy",
  "courseRequestType",
  "date",
  "duration",
  "ethnicDiv",
  "ethnicity",
  "gender",
  "genderProp",
  "indusSupportSize",
  "learning",
  "levelEducation",
  "needForPreVisit",
  "noOfFreq",
  "physicalDis",
  "physicalDisConcern",
  "siteOffice",
  "studentDept",
  "time",
  "topic",
  "visualRep",
  "yearsOfExp",
  "status",
  "insDeliveryType",
];

export const AvailabilityFields = [
  "availSeniorPersonnel",
  "city",
  "courseRequestType",
  "ethnicity",
  "gender",
  "insState",
  "insType",
  "limitAccess",
  "noOfStudent",
  "others",
  "physicalDis",
  "physicalDisConcern",
  "projectOverview",
  "projectStage",
  "safetyRequirement",
  "sizeCourseSupport",
  "classSize",
  "academicLevel",
  "studentDept",
  "genderProp",
  "ethnicDiv",
  "stuPhysicalDis",
  "insDeliveryType",
];

export const UploadFields = [
  "type",
  "description",
  "visibility",
  "fileName",
  "filePath",
  "mimetype",
  "size",
];
