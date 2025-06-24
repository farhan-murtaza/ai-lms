import { auth } from "@clerk/nextjs/server";
import { isTeacher } from "@/lib/teacher";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  const isAuthorized = isTeacher(userId);
  if (!userId || !isAuthorized) throw new Error("User is not authenticated");
  return { userId };
};
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { userId } = await auth(); // Clerk server-side
      if (!userId) throw new Error("User not authenticated");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload completed:", file.ufsUrl);
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: { maxFileSize: "512GB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
