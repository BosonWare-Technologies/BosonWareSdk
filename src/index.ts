import axios, { AxiosInstance } from "axios";

export interface Product {
    name: string;
    description: string;
    url: string;
    imageUrl: string;
    usdPrice: number;
    productId: string;
    attributes: Record<string, string>;
}

export interface ProductListResponse {
    success: boolean;
    result: {
        products: Product[];
    };
}

export interface Asset {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    amount: number;
    decimals: number;
    usdPrice?: number;
    attributes: ("Native" | "NFT" | "SPL-Token")[];
}

export interface AssetsResponse {
    success: boolean;
    result: {
        assets: Asset[];
    };
}

export interface TokenPrice {
    usdPrice: number;
    blockId: number;
    decimals: number;
    priceChange24h: number;
}

export interface PricesResponse {
    success: boolean;
    result: {
        prices: TokenPrice[];
    };
}

export class BosonWareAPISDK {
    private client: AxiosInstance;

    constructor(baseURL: string, apiKey?: string) {
        this.client = axios.create({
            baseURL,
            headers: {
                "Content-Type": "application/json",
                ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
            },
        });
    }

    async getProductList(page?: number): Promise<ProductListResponse> {
        const { data } = await this.client.get<ProductListResponse>(
            "/v1/store/products",
            {
                params: { page },
            }
        );
        return data;
    }

    async getAssets(params: {
        address: string;
        limit?: number;
        network?: "mainnet" | "devnet";
        includePrices?: boolean;
    }): Promise<AssetsResponse> {
        const { data } = await this.client.get<AssetsResponse>(
            "/v1/web3/assets",
            {
                params,
            }
        );
        return data;
    }

    async getPrices(mints: string[]): Promise<PricesResponse> {
        const { data } = await this.client.get<PricesResponse>(
            "/v1/web3/prices",
            {
                params: { mints: mints.join(",") },
            }
        );
        return data;
    }
}
