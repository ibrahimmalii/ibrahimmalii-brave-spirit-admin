import {Chapter} from "./chapter";

export class Course {
    private name: { ar: string, en: string };
    private description: { ar: string, en: string };
    private zipped_description: { ar: string, en: string };
    private cover: string | ArrayBuffer | File | null;
    images: any;
    private price: {euro: number, dzd: number};
    private discount: number;
    private read_count?: number;
    _id?: string;
    private published: boolean;
    private get_free: boolean;
    chapters: Array<Chapter>;

    constructor(
        name: { ar: string, en: string },
        description: { ar: string, en: string },
        zipped_description: { ar: string, en: string },
        cover: string,
        images: Array<string>,
        price: {euro: number, dzd: number},
        discount: number,
        chapters: Array<Chapter>,
        _id: string,
        published: boolean = false,
        get_free: boolean = false,
        readCount?: number
    ) {
        this.name = name;
        this.description = description;
        this.zipped_description = zipped_description;
        this.cover = cover;
        this.images = images;
        this.price = price;
        this.discount = discount;
        this.chapters = chapters;
        this._id = _id;
        this.published = published;
        this.get_free = get_free;
        this.read_count = readCount;
    }
}
