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
        ...urlModel
    };
}

export function fromUrlDocument(urlDocument: UrlDocument): UrlModel {
    return {
        ...urlDocument,
        state: ModelState[ModelState[urlDocument.state]]
    };
}

export function fromUrlJson(json: UrlJson): UrlModel {
    return {
        ...json,
        state: ModelState[ModelState[json.state]]
    };
}

export function toUrlJson(urlModel: UrlModel): UrlJson {
    return {
        ...urlModel
    };
}


export class UrlModel {
    public fileName: string;
    public extension: string;
    public state: ModelState;
}
