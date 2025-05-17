export type Product = {
    id: string,
    title: string,
    price: number,
}

type RGB = `rgb(${ number }, ${ number }, ${ number })`;
type RGBA = `rgba(${ number }, ${ number }, ${ number }, ${ number })`;
type HEX = `#${string}`;

export type Color = HEX | RGB | RGBA;
