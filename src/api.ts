export class Api {
    constructor(private baseUrl: string) {}

    public async getFruitDetails(id: number) {
        const response = await fetch(`${this.baseUrl}/shop/products/${id}`);
        const json = await response.json();
        return json;
    }
}
