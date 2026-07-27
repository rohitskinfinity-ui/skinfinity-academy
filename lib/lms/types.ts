export type TreatmentStage = "theory" | "observation" | "training" | "hands-on";

export type VideoKind = "lecture" | "ai_procedure" | "clinical";

export type StageStatus = "locked" | "available" | "in_progress" | "completed";

export type VideoLesson = {
  id: string;
  title: string;
  duration: string;
  kind: VideoKind;
  instructor?: string;
  done?: boolean;
};

export type Booklet = {
  id: string;
  name: string;
  size: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type TheoryContent = {
  videos: VideoLesson[];
  booklets: Booklet[];
  quiz: QuizQuestion[];
};

export type StageContent = {
  title: string;
  description: string;
  items?: string[];
};

export type Treatment = {
  id: string;
  name: string;
  summary: string;
  theory: TheoryContent;
  observation: StageContent;
  training: StageContent;
  handsOn: StageContent;
};

export type EnrolledTreatment = {
  treatmentId: string;
  handsOnIncluded: boolean;
  /** Stages marked complete for this enrollment (mock progress). */
  completedStages: TreatmentStage[];
  /** Current stage the student is working on. */
  currentStage: TreatmentStage;
};

export type StudentCourse = {
  id: string;
  title: string;
  color: string;
  status: "in-progress" | "completed";
  treatments: EnrolledTreatment[];
};

export type LiveSession = {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  status: "live" | "upcoming";
  attendees: number;
  meetUrl: string;
  driveUrl?: string;
  bookletLabel?: string;
};

export type PracticalAssignment = {
  id: number;
  title: string;
  course: string;
  treatment: string;
  stage: Exclude<TreatmentStage, "theory">;
  due: string;
  status: "pending" | "submitted" | "graded";
  marks: number | null;
  brief: string;
};
