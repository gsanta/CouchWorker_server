import {List} from 'immutable';
import { HostModel } from './HostModel';

// export class RootModel {
//     public hosts: List<HostModel>;

//     constructor() {
//         this.hosts = List<HostModel>();
//     }
// }

export interface RootModel {
    hosts: List<HostModel>;
}