import { Items } from './items';

export interface SearchProduct {
    productName:string,
    PriceWithoutDiscount:string,
    length: number,
    items: Array<Items>
}
