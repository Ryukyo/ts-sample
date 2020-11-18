//validation
interface Validatable {
    value: string  | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }

    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }

    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }

    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }

    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
}

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

    private collectUserInput (): [string, string, number] | void{
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.titleInputElement.value;
        const enteredPeople = this.titleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }
        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: enteredPeople,
            required: true,
            min: 1
        }

        if (validate({value: enteredTitle, required: true, minLength: 5}) && 
            validate({value: enteredDescription, required: true, minLength: 5}) && 
            validate({value: enteredPeople, required: true, minLength: 5})
            ) {
            alert("Invalid input, try again!")
            return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.collectUserInput();

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            this.clearInputs();
        }

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