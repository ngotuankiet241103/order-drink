type store ={
    id: number;
    name: string;
    menu: menu[];
    image: string
}
type menu = {
    category_id?: string;
    name: string;
    drinks: drink[];
    
}
type drink = {
    drink_id: string;
    drink_name: string;
    price: string;
    size: string | null;
}

export type {store, menu, drink}