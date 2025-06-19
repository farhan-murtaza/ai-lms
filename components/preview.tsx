// "use client";

// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// import "react-quill/dist/quill.bubble.css";

// interface PreviewProps {
//   value: string;
// }

// export const Preview = ({ value }: PreviewProps) => {
//   const ReactQuill = useMemo(
//     () => dynamic(() => import("react-quill"), { ssr: false }),
//     []
//   );
//   return <ReactQuill theme="bubble" value={value} readOnly />;
// };

"use client";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  return (
    <div
      className="prose max-w-none bg-white p-4 border rounded"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};
