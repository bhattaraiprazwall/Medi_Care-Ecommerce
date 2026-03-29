export interface IImage {
    _id?: string
    public_id: string
    url: string
    originalname?: string
    filename?: string
}



export interface IProduct {
    _id: string,
    name: string,
    description: string,
    price: number | string,
    flavour: string,
    product?: IImage[],
    files?: IImage[],
    buyInfo?:number
}       