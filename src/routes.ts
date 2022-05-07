import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksReposotory } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express';

export const routes = express.Router();


  routes.post('/feedbacks', async (req, res)=>{
    const {type, comment, screenshot} = req.body;
    try{
      const prismaFeedbacksReposotory = new PrismaFeedbacksReposotory();
      const nodemailerMailAdapter = new NodemailerMailAdapter();
    
      const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksReposotory, nodemailerMailAdapter);
    
      await submitFeedbackUseCase.execute({
        type, 
        comment, 
        screenshot
      });
      
      return res.status(201).send();
    }catch(err){
      console.error(err);
      return res.status(500).send();
    }

})
