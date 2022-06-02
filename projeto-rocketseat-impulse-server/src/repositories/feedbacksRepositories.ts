export interface FeedbacksCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepositories {
    create: (data: FeedbacksCreateData ) => Promise<void>
}