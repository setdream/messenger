import { MenuComponent } from '@components/menu';

export enum Theme {
    DARK = 'dark',
    LIGHT = 'light'
}

export type BaseHeaderProps = {
    menu?: MenuComponent
}

export type HeaderCommonProps = {
    title: string
    avatar?: string
    notificationCount: number,
    menu?: MenuComponent,
    onSearchButtonClick?: () => void
};

export type HeaderInnerProps = {
    title: string
    avatar?: string
    theme: Theme,
    menu?: MenuComponent,
    onBackButtonClick?: () => void
};

export type HeaderModalProps = {
    title: string
    avatar: string
    theme: Theme,
    menu?: MenuComponent,
    onCloseButtonClick?: () => void
};
