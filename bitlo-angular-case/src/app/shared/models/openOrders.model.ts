export interface ApiResponse {
    message: string,
    openOrders: ApiResponse[],
    fillAmount: number;
    marketCode: string;
    orderAmount: number;
    orderDate: string;
    orderSide: 'BUY' | 'SELL';
    price: number;
}
