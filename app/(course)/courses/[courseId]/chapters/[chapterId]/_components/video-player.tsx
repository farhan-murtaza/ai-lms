"use client";

import { useEffect, useRef, useState } from "react";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import MuxPlayer, { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import QuizModal from "@/components/QuizModal";
import ResultModal from "@/components/ResultModal";

import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;
}

// Static quiz for now
const quizData = [
  {
    question: "What is React?",
    options: ["Library", "Language", "Database", "API"],
    answer: "Library",
  },
];

export const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const muxRef = useRef<MuxPlayerRefAttributes | null>(null);
  const [quizShown, setQuizShown] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const router = useRouter();
  const confetti = useConfettiStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (muxRef.current) {
        const currentTime = muxRef.current.currentTime || 0;
        if (currentTime >= 120 && !quizShown) {
          // pause the video
          muxRef.current.pause?.();
          setShowQuiz(true);
          setQuizShown(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizShown]);

  const handleQuizSubmit = (answers: any) => {
    setUserAnswers(answers);
    setShowQuiz(false);
    setTimeout(() => setShowResult(true), 400);
  };

  const handleResultClose = () => {
    setShowResult(false);
    muxRef.current?.play?.();
  };

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );
      }
      if (!nextChapterId) {
        confetti.onOpen();
      }

      toast.success("Progress updated");

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative aspect-video ">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div>
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
            <Lock className="h-8 w-8" />
            <p className="text-sm">This chapter is locker</p>
          </div>
        </div>
      )}
      {!isLocked && (
        <>
          <MuxPlayer
            ref={muxRef}
            streamType="on-demand"
            title={title}
            //   className={cn(isReady && "hidden")}
            onCanPlay={() => setIsReady(true)}
            onEnded={onEnd}
            autoPlay
            playbackId={playbackId}
            className="relative z-0"
          />

          {showQuiz && (
            <QuizModal questions={quizData} onSubmit={handleQuizSubmit} />
          )}
          {showResult && (
            <ResultModal
              answers={userAnswers}
              questions={quizData}
              onClose={handleResultClose}
            />
          )}
        </>
      )}
    </div>
  );
};
