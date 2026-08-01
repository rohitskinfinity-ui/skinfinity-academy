export type TreatmentStage = "theory" | "observation" | "training" | "hands-on";

export type VideoKind = "lecture" | "ai_procedure" | "clinical";

export type StageStatus = "locked" | "available" | "in_progress" | "completed";

export type VideoPlatform = "zoom" | "google_meet";

export type RecordingStatus = "pending" | "processing" | "ready" | "failed";

export type VideoLesson = {
  id: string;
  title: string;
  duration: string;
  kind: VideoKind;
  instructor?: string;
  done?: boolean;
  /** Set when video was published from a live-class recording. */
  sourceEventId?: string;
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

export type EventAttachment = {
  id: string;
  fileName: string;
  fileUrl: string;
  mimeType?: string;
  sizeLabel?: string;
};

export type EventQuiz = {
  id: string;
  title: string;
  passPercent: number;
  isRequired: boolean;
  questionCount: number;
};

export type LiveSession = {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  status: "live" | "upcoming" | "completed";
  attendees: number;
  platform: VideoPlatform;
  meetingUrl: string;
  driveUrl?: string;
  bookletLabel?: string;
  /** Required for live classes — recording publishes into this treatment folder. */
  treatmentId: string;
  /** Zoom recording pipeline status (completed classes). */
  recordingStatus?: RecordingStatus;
  /** treatment_videos.id once recording is published (only when ready). */
  recordingVideoId?: string;
  recordingTitle?: string;
  /** iCal RRULE when part of a recurring series (weekly / alternate-day). */
  recurrenceRule?: string;
  seriesId?: string;
  attachments?: EventAttachment[];
  /** Optional post-class quiz (separate from treatment theory quiz). */
  quiz?: EventQuiz;
  quizAttemptPassed?: boolean;
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
