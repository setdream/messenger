export type HandlerCallback = (...args: unknown[]) => unknown;

export type LinkProps = {
    title: string;
    url?: string;
    handlers?: Record<string, HandlerCallback>;
}
