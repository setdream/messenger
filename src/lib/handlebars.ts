export function toDomTree(template: string): HTMLElement {
    if (typeof template !== 'string') {
        throw new Error('Inccorrect template type');
    }

    const container = document.createElement('div');
    container.innerHTML = template;

    if (container.firstChild === null) {
        throw new Error('No Elements in template');
    }

    return container.children[0] as HTMLElement;
}

export default {
    toDomTree,
};
