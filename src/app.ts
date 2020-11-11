class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedContent = document.importNode(this.templateElement.content, true);
        this.formElement = importedContent.firstElementChild as HTMLFormElement;
        this.formElement.id = 'user-input'
        this.attachHTML();
    }

    private attachHTML () {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement)
    }
}

const newInput = new ProjectInput();