// autobind decorator
function autobind(_target: any, _methodName: string, desc: PropertyDescriptor) {
    const originalMethod = desc.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedContent = document.importNode(this.templateElement.content, true);
        this.formElement = importedContent.firstElementChild as HTMLFormElement;
        this.formElement.id = 'user-input';

        this.titleInputElement = this.formElement.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.formElement.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.formElement.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attachHTML();
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value)

    }

    // this.submitHandler.bind(this) or @autobind decorator
    private configure() {
        this.formElement.addEventListener('submit', this.submitHandler);
    }

    private attachHTML () {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement)
    }
}

const newInput = new ProjectInput();