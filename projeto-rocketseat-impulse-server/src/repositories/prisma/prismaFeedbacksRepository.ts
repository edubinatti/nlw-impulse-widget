import { prisma } from "../../prisma";
import { FeedbacksRepositories, FeedbacksCreateData } from "../feedbacksRepositories";

export class PrismaFeedbacksRepository implements FeedbacksRepositories {
    async create(data: FeedbacksCreateData) {
        await prisma.feedback.create({
            data: {
                type: data.type,
                comment: data.comment,
                screenshot: data.screenshot
            }
        });
    }
}