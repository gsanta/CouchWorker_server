import { ModelState } from './ModelState';


export interface UrlDocument {
    fileName: string;
    extension: string;
    state: number;
}

export interface UrlJson extends UrlDocument {

}

export function getFullPath(basePath: string, urlModel: UrlModel): string {
    return `${basePath}${urlModel.fileName}.${urlModel.extension}`;
}

export function toUrlDocument(urlModel: UrlModel): UrlDocument {
    return {
        fileName: urlModel.fileName,
        extension: urlModel.extension,
        state: urlModel.state
    };
}

export function fromUrlDocument(urlDocument: UrlDocument): UrlModel {
    return {
        fileName: urlDocument.fileName,
        extension: urlDocument.extension,
        state: ModelState[ModelState[urlDocument.state]]
    };
}

export function fromUrlJson(json: UrlJson): UrlModel {
    return {
        fileName: json.fileName,
        extension: json.extension,
        state: ModelState[ModelState[json.state]]
    };
}

export function toUrlJson(urlModel: UrlModel): UrlJson {
    return {
        fileName: urlModel.fileName,
        extension: urlModel.extension,
        state: urlModel.state
    };
}


export class UrlModel {
    public fileName: string;
    public extension: string;
    public state: ModelState;
}
