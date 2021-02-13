/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
    export class ProjectInput extends Component <HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
    
        constructor() {
            super('project-input', 'app', true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            this.configure();
        }
    
        // this.submitHandler.bind(this) or @autobind decorator
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
    
        renderContent() {}
    
        private collectUserInput (): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
    
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
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            }
    
            if (!validate(titleValidatable) || 
                !validate(descriptionValidatable) || 
                !validate(peopleValidatable)
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
                projectState.addProject(title, desc, people)
                this.clearInputs();
            }
        }
    }
}