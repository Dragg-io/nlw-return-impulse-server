import { SubmitFeedbackUseCase } from './submit-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  {create: createFeedbackSpy},
  {sendMail: sendMailSpy}
);

describe('Submit feedback', ()=>{
  it('should be able to submit a feedback', () =>{
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64test.jpg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    // expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', () =>{
    expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64test.jpg',
    })).rejects.toThrow();
  });
  
  it('should not be able to submit feedback without comment', () =>{
    expect(submitFeedback.execute({
      type: 'Bug',
      comment: '',
      screenshot: 'data:image/png;base64test.jpg',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with different data type', () =>{
    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});