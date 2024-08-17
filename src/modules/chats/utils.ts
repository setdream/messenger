export function formatTimeItem(item: number): string {
    return item < 10 ?
        `0${item}` :
        `${item}`;
}

export function getChatTime(datetime: string): string {
    if (!datetime) {
        return '';
    }

    const date = new Date(datetime);

    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();

    const isPM = date.getHours() > 12;

    return `${formatTimeItem(hours)}:${formatTimeItem(minutes)} ${isPM ? 'PM' : 'AM'}`;
}
