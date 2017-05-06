

export interface UrlDocument {
    fileName: string;
    extension: string;
}

export interface UrlJson extends UrlDocument {

}

export function getFullPath(basePath: string, urlModel: UrlModel): string {
    return `${basePath}${urlModel.fileName}.${urlModel.extension}`;
}

export function toUrlDocument(urlModel: UrlModel): UrlDocument {
    return {
        fileName: urlModel.fileName,
        extension: urlModel.extension
    }
}

export function fromUrlDocument(urlDocument: UrlDocument): UrlModel {
    return {
        fileName: urlDocument.fileName,
        extension: urlDocument.extension
    }    
}

export function fromUrlJson(json: UrlJson): UrlModel {
    const urlModel = new UrlModel();
    urlModel.fileName = json.fileName;
    urlModel.extension = json.extension;
    return urlModel;
}

export function toUrlJson(urlModel: UrlModel): UrlJson {
    return {
        fileName: urlModel.fileName,
        extension: urlModel.extension
    }
}


export class UrlModel {
    public fileName: string;
    public extension: string;
}