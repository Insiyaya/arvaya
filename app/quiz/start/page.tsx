import { fetchQuizQuestions } from "@/lib/api";
import QuizClient from "@/components/quiz/QuizClient";

export default async function QuizStartPage() {
  const questions = await fetchQuizQuestions();
  return <QuizClient questions={questions} />;
}
