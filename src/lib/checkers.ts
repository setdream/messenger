export function isFirstLetterCapital(value: string): boolean {
    const letter = value.charAt(0);

    return letter === letter.toUpperCase();
}

export function hasAlphabetic(value: string): boolean {
    return /[a-zA-ZА-Яа-я]/.test(value);
}

export function hasCapitalLetter(value: string): boolean {
    return /[A-Z]/.test(value);
}

export function hasNumber(value: string): boolean {
    return /\d/.test(value);
}

export function hasSpaces(value: string): boolean {
    return value.includes(' ');
}

export function isEmptyString(value: string): boolean {
    return value === '';
}

export function hasSpecificLength(value: string, from: number, to: number): boolean {
    return value.length >= from && value.length <= to;
}
