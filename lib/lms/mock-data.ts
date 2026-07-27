import type {
  LiveSession,
  PracticalAssignment,
  StudentCourse,
  Treatment,
  TreatmentStage,
  VideoLesson,
} from "./types";

export const STAGE_ORDER: TreatmentStage[] = [
  "theory",
  "observation",
  "training",
  "hands-on",
];

export const STAGE_LABELS: Record<TreatmentStage, string> = {
  theory: "Theory",
  observation: "Observation",
  training: "Training",
  "hands-on": "Hands-on",
};

export const treatments: Treatment[] = [
  {
    id: "botox",
    name: "Botulinum Toxin",
    summary: "Pharmacology, landmarks, injection technique, and complication management.",
    theory: {
      videos: [
        {
          id: "botox-v1",
          title: "Pharmacology of Botulinum Toxin",
          duration: "35 min",
          kind: "lecture",
          instructor: "Dr. Priya Menon",
          done: true,
        },
        {
          id: "botox-v2",
          title: "AI Procedure: Forehead & Glabella Mapping",
          duration: "18 min",
          kind: "ai_procedure",
          done: true,
        },
        {
          id: "botox-v3",
          title: "Injection Techniques & Landmarks",
          duration: "42 min",
          kind: "lecture",
          instructor: "Dr. Priya Menon",
          done: false,
        },
        {
          id: "botox-v4",
          title: "AI Procedure: Crow's Feet Technique Walkthrough",
          duration: "14 min",
          kind: "ai_procedure",
          done: false,
        },
        {
          id: "botox-v5",
          title: "Managing Complications",
          duration: "30 min",
          kind: "clinical",
          instructor: "Dr. Priya Menon",
          done: false,
        },
      ],
      booklets: [
        { id: "botox-b1", name: "Botulinum Toxin Booklet.pdf", size: "4.2 MB" },
        { id: "botox-b2", name: "Injection Landmarks Chart.pdf", size: "1.8 MB" },
        { id: "botox-b3", name: "Complication Management Protocol.pdf", size: "2.4 MB" },
      ],
      quiz: [
        {
          id: "botox-q1",
          prompt: "Botulinum toxin primarily acts by blocking release of which neurotransmitter?",
          options: ["Dopamine", "Acetylcholine", "Serotonin", "GABA"],
          correctIndex: 1,
        },
        {
          id: "botox-q2",
          prompt: "Which is the safest starting approach for forehead lines in beginners?",
          options: [
            "High dose in one point",
            "Conservative dosing with mapped injection points",
            "Deep periosteal injection only",
            "Skip mapping and inject by feel",
          ],
          correctIndex: 1,
        },
        {
          id: "botox-q3",
          prompt: "Immediate blanching with pain after injection most suggests:",
          options: [
            "Normal erythema",
            "Vascular compromise",
            "Allergic dermatitis only",
            "Expected post-procedure edema",
          ],
          correctIndex: 1,
        },
      ],
    },
    observation: {
      title: "Clinical Observation",
      description: "Watch live or recorded clinic sessions for botulinum toxin cases.",
      items: [
        "Observe consultation and consent workflow",
        "Watch landmark marking on live patients",
        "Note complication triage discussion",
      ],
    },
    training: {
      title: "Guided Training",
      description: "Practice marking and dose planning under faculty guidance.",
      items: [
        "Complete facial mapping worksheet",
        "Dose calculation drill for upper face",
        "Complication response checklist",
      ],
    },
    handsOn: {
      title: "Hands-on Practical",
      description: "1:1 supervised injection on clinic patients where enrolled.",
      items: [
        "Supervised upper-face injection session",
        "Post-procedure documentation",
        "Faculty sign-off",
      ],
    },
  },
  {
    id: "fillers",
    name: "Dermal Fillers",
    summary: "Filler rheology, facial anatomy, injection planes, and safety.",
    theory: {
      videos: [
        {
          id: "fillers-v1",
          title: "Filler Types & Properties",
          duration: "32 min",
          kind: "lecture",
          instructor: "Dr. Neha Gupta",
          done: false,
        },
        {
          id: "fillers-v2",
          title: "AI Procedure: Lip Augmentation Step-by-Step",
          duration: "16 min",
          kind: "ai_procedure",
          done: false,
        },
        {
          id: "fillers-v3",
          title: "Facial Anatomy for Fillers",
          duration: "38 min",
          kind: "lecture",
          instructor: "Dr. Neha Gupta",
          done: false,
        },
        {
          id: "fillers-v4",
          title: "AI Procedure: Cheek Contouring Planes",
          duration: "12 min",
          kind: "ai_procedure",
          done: false,
        },
      ],
      booklets: [
        { id: "fillers-b1", name: "Dermal Fillers Booklet.pdf", size: "5.1 MB" },
        { id: "fillers-b2", name: "Vascular Danger Zones Map.pdf", size: "2.0 MB" },
      ],
      quiz: [
        {
          id: "fillers-q1",
          prompt: "Hyaluronic acid fillers can be reversed with:",
          options: ["Steroids", "Hyaluronidase", "Antibiotics", "Laser"],
          correctIndex: 1,
        },
        {
          id: "fillers-q2",
          prompt: "Aspiration alone is:",
          options: [
            "100% reliable for vascular safety",
            "Not a standalone guarantee of safety",
            "Required only for lips",
            "Unnecessary in all cases",
          ],
          correctIndex: 1,
        },
        {
          id: "fillers-q3",
          prompt: "Which plane is typically used for deep cheek structural support?",
          options: ["Intradermal", "Supraperiosteal", "Epidermal only", "Subcutaneous hair follicle"],
          correctIndex: 1,
        },
      ],
    },
    observation: {
      title: "Clinical Observation",
      description: "Observe filler consultations, marking, and injection sessions.",
      items: ["Watch lip and midface cases", "Review danger-zone briefing", "Observe emergency kit setup"],
    },
    training: {
      title: "Guided Training",
      description: "Cannula vs needle drills and product selection exercises.",
      items: ["Product selection worksheet", "Plane identification drill", "Emergency response simulation"],
    },
    handsOn: {
      title: "Hands-on Practical",
      description: "Supervised filler practical when included in enrollment.",
      items: ["Supervised lip or midface session", "Case documentation", "Faculty sign-off"],
    },
  },
  {
    id: "threads",
    name: "Threads",
    summary: "Thread types, vector planning, insertion technique, and aftercare.",
    theory: {
      videos: [
        {
          id: "threads-v1",
          title: "Thread Types & Indications",
          duration: "28 min",
          kind: "lecture",
          instructor: "Dr. Aisha Sharma",
          done: false,
        },
        {
          id: "threads-v2",
          title: "AI Procedure: Midface Vector Placement",
          duration: "15 min",
          kind: "ai_procedure",
          done: false,
        },
        {
          id: "threads-v3",
          title: "Insertion Technique & Aftercare",
          duration: "34 min",
          kind: "clinical",
          instructor: "Dr. Aisha Sharma",
          done: false,
        },
      ],
      booklets: [
        { id: "threads-b1", name: "Threads Booklet.pdf", size: "3.6 MB" },
        { id: "threads-b2", name: "Vector Planning Worksheet.pdf", size: "1.2 MB" },
      ],
      quiz: [
        {
          id: "threads-q1",
          prompt: "PDO threads are primarily known for:",
          options: [
            "Permanent bone augmentation",
            "Collagen stimulation and temporary lift",
            "Replacing surgical facelifts permanently",
            "Laser resurfacing",
          ],
          correctIndex: 1,
        },
        {
          id: "threads-q2",
          prompt: "Correct vector planning should prioritize:",
          options: [
            "Random placement for volume",
            "Tissue support aligned with facial descent patterns",
            "Only vertical lines regardless of anatomy",
            "Avoiding all superficial fat compartments",
          ],
          correctIndex: 1,
        },
        {
          id: "threads-q3",
          prompt: "Patients should typically avoid strenuous exercise for:",
          options: ["1 hour", "A few days as advised", "6 months", "Never restricted"],
          correctIndex: 1,
        },
      ],
    },
    observation: {
      title: "Clinical Observation",
      description: "Observe thread consultations and insertion workflows.",
      items: ["Watch marking and vector planning", "Observe insertion sequence", "Review aftercare counseling"],
    },
    training: {
      title: "Guided Training",
      description: "Practice vector maps and insertion sequence on models.",
      items: ["Vector worksheet", "Entry-point planning", "Complication checklist"],
    },
    handsOn: {
      title: "Hands-on Practical",
      description: "Supervised thread placement when included in enrollment.",
      items: ["Supervised insertion session", "Aftercare documentation", "Faculty sign-off"],
    },
  },
  {
    id: "chemical-peels",
    name: "Chemical Peels",
    summary: "Peel selection, depth control, protocols, and post-care.",
    theory: {
      videos: [
        {
          id: "peels-v1",
          title: "Peel Chemistry & Depth Classification",
          duration: "26 min",
          kind: "lecture",
          instructor: "Dr. Arjun Reddy",
          done: true,
        },
        {
          id: "peels-v2",
          title: "AI Procedure: Superficial Peel Application",
          duration: "11 min",
          kind: "ai_procedure",
          done: true,
        },
        {
          id: "peels-v3",
          title: "Protocol Design & Post-Care",
          duration: "24 min",
          kind: "lecture",
          instructor: "Dr. Arjun Reddy",
          done: false,
        },
      ],
      booklets: [
        { id: "peels-b1", name: "Chemical Peels Booklet.pdf", size: "3.1 MB" },
        { id: "peels-b2", name: "Post-Peel Care Guide.pdf", size: "0.9 MB" },
      ],
      quiz: [
        {
          id: "peels-q1",
          prompt: "Frosting is most associated with which peel depth?",
          options: ["Very superficial only", "Medium-depth peels", "Moisturizer application", "Sunscreen"],
          correctIndex: 1,
        },
        {
          id: "peels-q2",
          prompt: "A key contraindication screening item is:",
          options: [
            "Recent isotretinoin use history",
            "Patient likes skincare",
            "Patient owns sunscreen",
            "Clinic lighting quality",
          ],
          correctIndex: 0,
        },
        {
          id: "peels-q3",
          prompt: "Post-peel patients should be advised to:",
          options: [
            "Skip sunscreen for a week",
            "Prioritize gentle care and strict sun protection",
            "Start aggressive scrubbing immediately",
            "Use undiluted acids at home next day",
          ],
          correctIndex: 1,
        },
      ],
    },
    observation: {
      title: "Clinical Observation",
      description: "Observe peel consultations, application, and endpoint assessment.",
      items: ["Watch skin priming discussion", "Observe application timing", "Review endpoint assessment"],
    },
    training: {
      title: "Guided Training",
      description: "Protocol design drills and complication response practice.",
      items: ["Peel selection worksheet", "Endpoint recognition drill", "Post-care counseling script"],
    },
    handsOn: {
      title: "Hands-on Practical",
      description: "Supervised peel application when included in enrollment.",
      items: ["Supervised peel session", "Case notes", "Faculty sign-off"],
    },
  },
  {
    id: "lasers",
    name: "Laser & Energy Devices",
    summary: "Laser physics, safety, common indications, and parameter selection.",
    theory: {
      videos: [
        {
          id: "lasers-v1",
          title: "Laser Physics Essentials",
          duration: "40 min",
          kind: "lecture",
          instructor: "Dr. Neha Gupta",
          done: true,
        },
        {
          id: "lasers-v2",
          title: "AI Procedure: Hair Reduction Parameter Walkthrough",
          duration: "13 min",
          kind: "ai_procedure",
          done: false,
        },
        {
          id: "lasers-v3",
          title: "Safety Protocols & Eye Protection",
          duration: "22 min",
          kind: "clinical",
          instructor: "Dr. Neha Gupta",
          done: false,
        },
      ],
      booklets: [
        { id: "lasers-b1", name: "Laser Safety Booklet.pdf", size: "2.8 MB" },
        { id: "lasers-b2", name: "Parameter Selection Sheet.pdf", size: "1.1 MB" },
      ],
      quiz: [
        {
          id: "lasers-q1",
          prompt: "Selective photothermolysis depends on matching wavelength to:",
          options: ["Room temperature", "Target chromophore", "Clinic branding", "Patient preference only"],
          correctIndex: 1,
        },
        {
          id: "lasers-q2",
          prompt: "Mandatory before every laser session:",
          options: [
            "Skip eyewear for speed",
            "Eye protection and safety checklist",
            "Increase fluence arbitrarily",
            "Disable smoke evacuator always",
          ],
          correctIndex: 1,
        },
        {
          id: "lasers-q3",
          prompt: "Fitzpatrick skin type primarily affects:",
          options: [
            "Invoice format",
            "Parameter selection and risk counseling",
            "Chair height",
            "Appointment reminder tone",
          ],
          correctIndex: 1,
        },
      ],
    },
    observation: {
      title: "Clinical Observation",
      description: "Observe laser safety setup and treatment sessions.",
      items: ["Watch safety checklist", "Observe parameter briefing", "Review endpoint assessment"],
    },
    training: {
      title: "Guided Training",
      description: "Parameter worksheets and simulated safety drills.",
      items: ["Parameter worksheet", "Eyewear & zone drill", "Adverse event response"],
    },
    handsOn: {
      title: "Hands-on Practical",
      description: "Supervised device operation when included in enrollment.",
      items: ["Supervised treatment session", "Logbook entry", "Faculty sign-off"],
    },
  },
];

/** Customized enrollment: BDS advanced path — no fillers/threads; botox without hands-on. */
export const studentCourses: StudentCourse[] = [
  {
    id: "custom-injectables",
    title: "Custom Aesthetic Injectables",
    color: "from-teal-600 to-teal-800",
    status: "in-progress",
    treatments: [
      {
        treatmentId: "botox",
        handsOnIncluded: false,
        completedStages: [],
        currentStage: "theory",
      },
      {
        treatmentId: "chemical-peels",
        handsOnIncluded: true,
        completedStages: ["theory"],
        currentStage: "observation",
      },
    ],
  },
  {
    id: "laser-devices",
    title: "Laser & Energy Devices",
    color: "from-cyan-600 to-blue-800",
    status: "in-progress",
    treatments: [
      {
        treatmentId: "lasers",
        handsOnIncluded: true,
        completedStages: [],
        currentStage: "theory",
      },
    ],
  },
  {
    id: "full-injectables",
    title: "Advanced Injectables & Fillers",
    color: "from-emerald-600 to-teal-800",
    status: "in-progress",
    treatments: [
      {
        treatmentId: "botox",
        handsOnIncluded: true,
        completedStages: ["theory", "observation"],
        currentStage: "training",
      },
      {
        treatmentId: "fillers",
        handsOnIncluded: true,
        completedStages: [],
        currentStage: "theory",
      },
      {
        treatmentId: "threads",
        handsOnIncluded: false,
        completedStages: [],
        currentStage: "theory",
      },
    ],
  },
  {
    id: "facial-anatomy",
    title: "Facial Anatomy & Assessment",
    color: "from-slate-600 to-slate-800",
    status: "completed",
    treatments: [
      {
        treatmentId: "botox",
        handsOnIncluded: false,
        completedStages: ["theory", "observation", "training"],
        currentStage: "training",
      },
    ],
  },
];

export const liveSessions: LiveSession[] = [
  {
    id: "live-1",
    title: "Weekly Theory Review: Botulinum Toxin",
    instructor: "Dr. Priya Menon",
    date: "Jul 27, 2026",
    time: "3:00 PM",
    duration: "1 hour",
    status: "live",
    attendees: 4,
    meetUrl: "https://meet.google.com/abc-defg-hij",
    driveUrl: "https://drive.google.com/drive/folders/botox-booklet-ppt",
    bookletLabel: "Botox booklet PPT (Google Drive)",
  },
  {
    id: "live-2",
    title: "Weekly Doctor Class: Fillers Safety",
    instructor: "Dr. Neha Gupta",
    date: "Aug 3, 2026",
    time: "5:00 PM",
    duration: "1 hour",
    status: "upcoming",
    attendees: 0,
    meetUrl: "https://meet.google.com/klm-nopq-rst",
    driveUrl: "https://drive.google.com/drive/folders/fillers-booklet-ppt",
    bookletLabel: "Fillers booklet PPT (Google Drive)",
  },
  {
    id: "live-3",
    title: "Weekly Doctor Class: Chemical Peels",
    instructor: "Dr. Arjun Reddy",
    date: "Aug 10, 2026",
    time: "4:00 PM",
    duration: "1 hour",
    status: "upcoming",
    attendees: 0,
    meetUrl: "https://meet.google.com/uvw-xyza-bcd",
    driveUrl: "https://drive.google.com/drive/folders/peels-booklet-ppt",
    bookletLabel: "Peels booklet PPT (Google Drive)",
  },
  {
    id: "live-4",
    title: "Weekly Doctor Class: Laser Safety",
    instructor: "Dr. Aisha Sharma",
    date: "Aug 17, 2026",
    time: "6:00 PM",
    duration: "1 hour",
    status: "upcoming",
    attendees: 0,
    meetUrl: "https://meet.google.com/efg-hijk-lmn",
    driveUrl: "https://drive.google.com/drive/folders/laser-booklet-ppt",
    bookletLabel: "Laser safety PPT (Google Drive)",
  },
];

export const practicalAssignments: PracticalAssignment[] = [
  {
    id: 1,
    title: "Case Study: Vascular Complication Management",
    course: "Advanced Injectables & Fillers",
    treatment: "Botulinum Toxin",
    stage: "training",
    due: "Aug 18",
    status: "pending",
    marks: null,
    brief:
      "Submit a comprehensive case study on managing vascular complications in aesthetic procedures. Include patient history, assessment, intervention, and outcome analysis. Minimum 1500 words with supporting images.",
  },
  {
    id: 2,
    title: "Observation Log: Chemical Peel Clinic",
    course: "Custom Aesthetic Injectables",
    treatment: "Chemical Peels",
    stage: "observation",
    due: "Aug 22",
    status: "submitted",
    marks: null,
    brief:
      "Document three observed peel cases including indication, peel type, endpoint notes, and aftercare counseling points discussed in clinic.",
  },
  {
    id: 3,
    title: "Hands-on Sign-off: Superficial Peel",
    course: "Custom Aesthetic Injectables",
    treatment: "Chemical Peels",
    stage: "hands-on",
    due: "Aug 28",
    status: "pending",
    marks: null,
    brief:
      "Upload your supervised peel practical checklist signed by faculty, plus clinical photos and post-care instructions given to the patient.",
  },
  {
    id: 4,
    title: "Patient Assessment Case Report",
    course: "Facial Anatomy & Assessment",
    treatment: "Botulinum Toxin",
    stage: "training",
    due: "Aug 10",
    status: "graded",
    marks: 92,
    brief:
      "Submit a facial assessment case report covering proportions, aging patterns, and recommended treatment sequencing.",
  },
  {
    id: 5,
    title: "Laser Safety Protocol Documentation",
    course: "Laser & Energy Devices",
    treatment: "Laser & Energy Devices",
    stage: "training",
    due: "Aug 5",
    status: "graded",
    marks: 88,
    brief:
      "Document the full laser room safety protocol including eyewear, zoning, checklist, and adverse-event response steps.",
  },
];

export function getTreatment(id: string): Treatment | undefined {
  return treatments.find((t) => t.id === id);
}

export function getCourse(id: string): StudentCourse | undefined {
  const decoded = decodeURIComponent(id);
  return (
    studentCourses.find((c) => c.id === decoded) ||
    studentCourses.find((c) => c.title === decoded) ||
    studentCourses.find(
      (c) => c.title.toLowerCase() === decoded.toLowerCase()
    )
  );
}

export function courseProgress(course: StudentCourse): number {
  let total = 0;
  let done = 0;
  for (const et of course.treatments) {
    const stages: TreatmentStage[] = et.handsOnIncluded
      ? STAGE_ORDER
      : STAGE_ORDER.filter((s) => s !== "hands-on");
    total += stages.length;
    done += et.completedStages.filter((s) => stages.includes(s)).length;
  }
  if (total === 0) return 0;
  return Math.round((done / total) * 100);
}

export function currentFocusLabel(course: StudentCourse): string {
  const et = course.treatments.find(
    (t) => !t.completedStages.includes(t.currentStage)
  ) || course.treatments[0];
  if (!et) return "All treatments complete";
  const treatment = getTreatment(et.treatmentId);
  return `${treatment?.name ?? et.treatmentId} · ${STAGE_LABELS[et.currentStage]}`;
}

export function stagesForEnrollment(handsOnIncluded: boolean): TreatmentStage[] {
  return handsOnIncluded
    ? [...STAGE_ORDER]
    : STAGE_ORDER.filter((s) => s !== "hands-on");
}

export function isStageUnlocked(
  completedStages: TreatmentStage[],
  stage: TreatmentStage,
  handsOnIncluded: boolean
): boolean {
  const stages = stagesForEnrollment(handsOnIncluded);
  if (!stages.includes(stage)) return false;
  const index = stages.indexOf(stage);
  if (index === 0) return true;
  const previous = stages[index - 1];
  return completedStages.includes(previous);
}

export function videoKindLabel(kind: VideoLesson["kind"]): string {
  switch (kind) {
    case "ai_procedure":
      return "AI Procedure";
    case "clinical":
      return "Clinical";
    default:
      return "Lecture";
  }
}
