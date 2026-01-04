export interface Stock {
    id: string;
    name: string;
    code: string;
    price: number;
    change: number;
    changePercent: number;
    volume: number;
    marketCap: number;
    favorite_yn: string;
}