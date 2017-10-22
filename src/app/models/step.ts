export class Step {
    type: string;
    required: boolean
    question: string;
    answers: string[];
    questions?: any[];
    tos?: string;

    constructor( step ) {
        this.type = step.type;
        this.required = step.required;
        this.question = step.question;
        this.answers = step.answers;
        this.questions = step.questions || null;
        this.tos = step.tos || null;
    }

}