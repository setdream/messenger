export function clearChildNodes(container: HTMLElement): void {
    while (container.firstChild && container.lastChild) {
        container.removeChild(container.lastChild);
    }
}
