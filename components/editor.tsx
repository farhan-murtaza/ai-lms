// "use client";

// import dynamic from "next/dynamic";
// import { useMemo } from "react";

// import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/qu"

// interface EditorProps {
//   onChange: (value: string) => void;
//   value: string;
// }

// export const Editor = ({ onChange, value }: EditorProps) => {
//   const ReactQuill = useMemo(
//     () => dynamic(() => import("react-quill"), { ssr: false }),
//     []
//   );
//   return (
//     <div className="bg-white">
//       <ReactQuill theme="snow" value={value} onChange={onChange} />
//     </div>
//   );
// };

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { useEffect } from "react";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Underline, Strike],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync content if value changes externally
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="bg-white border p-4 rounded space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="Underline"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          label="Strike"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          label="Bullet List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Ordered List"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="H1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        />
        <ToolbarButton
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          label="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        />
      </div>

      {/* Rich Text Editor */}
      <EditorContent
        editor={editor}
        className=" editor-content border rounded p-2 w-full break-words overflow-auto"
        style={{
          minHeight: "150px", // makes input area taller
        }}
      />
    </div>
  );
};

// ✅ Toolbar button component for cleaner code
function ToolbarButton({
  label,
  onClick,
  active,
}: {
  label: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1 text-sm border rounded ${
        active ? "bg-blue-600 text-white" : "bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}
