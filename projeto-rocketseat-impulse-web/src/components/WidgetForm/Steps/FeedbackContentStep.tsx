import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackRestartRequested: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);
        
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot
        })

        setIsSendingFeedback(false);
        onFeedbackSent();
    }

    return (
        <>
            <header >
                <button type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={onFeedbackRestartRequested}>
                    <ArrowLeft weight="bold" className="w-4 h-4"></ArrowLeft>
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    {feedbackTypeInfo.image.source}
                    <span >{feedbackTypeInfo.title}</span>
                </span>

                <CloseButton />
            </header>

            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-default focus:ring-brand-default focus:ring-1 focus:outline-none resize-none"
                    placeholder="Conte com detalhes o que está acontecendo..."
                    onChange={event => setComment(event.target.value)}
                >
                </textarea>
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        screenshot={screenshot}
                        onScreenshotTook={setScreenshot}
                    />
                    <button type="submit"
                        disabled={comment.length == 0 || isSendingFeedback}
                        className="p-2 text-zinc-100 bg-brand-default rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-default transition-colors disabled:opacity-50 disabled:bg-brand-default">
                        {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
                    </button>
                </footer>
            </form>
        </>
    );
}