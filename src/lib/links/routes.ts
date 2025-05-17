import type { Route } from "./types";

export const ROUTES: Record<string, Route> = {
    HOME: {
        path: '/',
        label: 'Acceuil',
        color: '#2779a9',
        location: {
            header: false,
            footer: true,
            menu: false,
        },
    },
    THEMES: {
        path: '/themes',
        label: 'Thèmes',
        color: '#678959',
        location: {
            header: true,
            footer: true,
            menu: true,
        },
    },
    ABOUT: {
        path: '/about',
        label: 'En Savoir Plus',
        color: '#897b59',
        location: {
            header: true,
            footer: true,
            menu: true,
        },
    },
    CONTACT: {
        path: '/contact',
        label: 'Contactez-moi',
        color: '#bd7f59',
        location: {
            header: true,
            footer: true,
            menu: true,
        },
    },
    CART: {
        path: '/cart',
        label: 'Panier',
        color: '#895967',
        //color: '#b5a451',
        //color: '#89597F',
        location: {
            header: false,
            footer: true,
            menu: true,
        },
    },
    CHECKOUT: {
        path: '/checkout',
        label: 'Commande',
        color: '#895967',
        location: {
            header: false,
            footer: false,
            menu: false,
        },
    },
}
