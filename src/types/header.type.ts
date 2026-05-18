interface NavMenuItem {
    label: string;
    href: string;
    hasIcon?: boolean;
}

export interface NavItem {
    title: string;
    link?: string;

    items?: NavMenuItem[];
}