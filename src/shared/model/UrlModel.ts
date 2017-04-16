

export interface UrlDocument {
    fileName: string;
    extension: string;
}

export class UrlModel {
    private fileName: string;
    private extension: string;
    constructor(urlDocument: UrlDocument) {
        this.fileName = urlDocument.fileName;
        this.extension = urlDocument.extension;
    }

    public getFileName(): string {
        return this.fileName;
    }

    public getExtension(): string {
        return this.extension;
    }

    public getFullPath(basePath: string): string {
        return `${basePath}${this.fileName}.${this.extension}`;
    }
}