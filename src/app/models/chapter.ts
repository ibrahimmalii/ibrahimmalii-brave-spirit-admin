export class Chapter {
    title: {ar: string, en: string};
    description: {ar: string, en: string};
    files: Array<{title: {ar: string, en: string}, link: string, file: string, attachments: String[], binaryAttachments: String[]}>;

    constructor(
        title: { ar: string, en: string },
        description: { ar: string, en: string },
        files: Array<{title: {ar: string, en: string}, link: string, file: string, attachments: String[], binaryAttachments: String[]}>
    ) {
        this.title = title;
        this.description = description;
        this.files = files;
    }
}
