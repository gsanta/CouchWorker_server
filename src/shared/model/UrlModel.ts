

export interface UrlDocument {
    fileName: string;
    extension: string;
}

export interface UrlJson extends UrlDocument {

}

export class UrlModel {
    private fileName: string;
    private extension: string;
    constructor(urlDocument?: UrlDocument) {
        if (urlDocument) {
            this.fileName = urlDocument.fileName;
            this.extension = urlDocument.extension;
        }
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

    public toDocument(): UrlDocument {
        return {
            fileName: this.fileName,
            extension: this.extension
        }
    }

    public static fromJson(json: UrlJson): UrlModel {
        const urlModel = new UrlModel();
        urlModel.fileName = json.fileName;
        urlModel.extension = json.extension;
        return urlModel;
    }
}