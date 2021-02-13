export function autobind(_target: any, _methodName: string, desc: PropertyDescriptor) {
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