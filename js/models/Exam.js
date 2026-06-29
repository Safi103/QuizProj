export class Exam {
  constructor(title) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.questions = [];
    this.createdAt = new Date().toISOString();
  }

  // get Question class object
  addQuestion(question) {
    // No validation here, but we can add it
    this.questions.push(question);
  }

  getQuestionCount() {
    return this.questions.length;
  }
}