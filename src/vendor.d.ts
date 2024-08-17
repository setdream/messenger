/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.hbs' {
    const template: <T extends Record<string, unknown>>(data?: T = {}) => string;
    export default template;
}
declare module '*.svg' {
    const content: any;
    export default content;
}
declare module '*.png' {
    const content: any;
    export default content;
}
