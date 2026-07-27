"use client";

type CertificateViewerProps = {
  src: string;
  title: string;
  className?: string;
  interactive?: boolean;
};

const VIEWER_PARAMS = "#toolbar=0&navpanes=0&scrollbar=0&view=FitH";

export default function CertificateViewer({
  src,
  title,
  className = "h-full w-full border-0",
  interactive = true,
}: CertificateViewerProps) {
  return (
    <div
      className="relative h-full w-full select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <iframe
        src={`${src}${VIEWER_PARAMS}`}
        title={title}
        className={`${className}${interactive ? "" : " pointer-events-none"}`}
      />
    </div>
  );
}
