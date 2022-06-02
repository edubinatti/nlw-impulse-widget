import { useState } from "react";
import { Bug, ChatCenteredDots, Lightbulb } from "phosphor-react";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problemas",
    image: {
      source: <Bug />,
      alt: "Imagem de um inseto!",
    },
  },
  IDEA: {
    title: "Idéias",
    image: {
      source: <Lightbulb />,
      alt: "Imagem de uma lampada acesa!",
    },
  },
  OTHER: {
    title: "Outros",
    image: {
      source: <ChatCenteredDots />,
      alt: "Imagem de balão de pensamento!",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  function contentShowned() {
    if (feedbackSent) {
      return (<FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />);
    }

    return (
      <>
        {!feedbackType ? (
          <FeedbackTypeStep onFeedbackTypeChance={setFeedbackType} />
        ) : (
          <FeedbackContentStep
            feedbackType={feedbackType}
            onFeedbackRestartRequested={handleRestartFeedback}
            onFeedbackSent={() => setFeedbackSent(true)}
          />
        )}
      </>
    );

  }


  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] sm:w-auto">

      {contentShowned()}

      <footer className="text-xs text-neutral-400">
        <span>
          Feito por:
          <a
            className="underline px-1 underline-offset-4 text-brand-default focus:text-brand-hover transition-colors"
            href="https://twitter.com/edubinatti" target="_blank">
            eDU
          </a>
        </span>
      </footer>
    </div>
  );
}
