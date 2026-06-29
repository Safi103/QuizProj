import { Exam } from "../models/Exam.js";
import { Question } from "../models/Question.js";

export class ExamService {
    constructor() {
        this.storageKey = "exams";
    }

    getAllExams() {
        // get data from localStorage
        const data = localStorage.getItem(this.storageKey);

        if (!data) {
            return [];
        }

        // parse data to array object
        const plainExams = JSON.parse(data);

        let allExamClones = plainExams.map(examData => {
            const exam = new Exam(examData.title);

            exam.id = examData.id;
            exam.createdAt = examData.createdAt;

            exam.questions = examData.questions.map(questionData => {
                const question = new Question(
                    questionData.text,
                    questionData.answers,
                    questionData.correctAnswerIndex
                );

                question.id = questionData.id;

                return question;
            });

            return exam;
        });

        return allExamClones;
    }

    // save to localStorage
    saveExam(exam) {
        const exams = this.getAllExams();
        // deleteExam(exam.id) to remove old version of this exam
        exams.push(exam);
        localStorage.setItem(this.storageKey, JSON.stringify(exams));
    }

    deleteExam(examId) {
        const exams = this.getAllExams();
        const filteredExams = exams.filter(exam => exam.id !== examId);
        localStorage.setItem(this.storageKey, JSON.stringify(filteredExams));
    }

    getExamById(examId) {
        const exams = this.getAllExams();
        return exams.find(exam => exam.id === examId);
    }

    clearAllExams() {
        localStorage.removeItem(this.storageKey);
    }
}