export interface ImageCore {
    readonly imageUrl: string;
    readonly public_id: string;
    readonly title: string;
    readonly isFavourite: boolean;
}

export interface Image extends ImageCore {
    readonly _id: string;
}
