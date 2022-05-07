import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from './../feedbacks-repository';

export class PrismaFeedbacksReposotory implements FeedbacksRepository{
  async create({comment, type, screenshot}: FeedbackCreateData) {
    await prisma.feedback.create({
      data:{
        comment,
        type,
        screenshot
      }
    });
  };
}