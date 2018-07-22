import { IIdentifiable } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { MemoryPersistence } from './MemoryPersistence';
import { IWriter } from '../IWriter';
import { IGetter } from '../IGetter';
import { ISetter } from '../ISetter';
import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';
export declare class IdentifiableMemoryPersistence<T extends IIdentifiable<K>, K> extends MemoryPersistence<T> implements IConfigurable, IWriter<T, K>, IGetter<T, K>, ISetter<T> {
    protected _maxPageSize: number;
    constructor(loader?: ILoader<T>, saver?: ISaver<T>);
    configure(config: ConfigParams): void;
    protected getPageByFilter(correlationId: string, filter: any, paging: PagingParams, sort: any, select: any, callback: (err: any, page: DataPage<T>) => void): void;
    protected getListByFilter(correlationId: string, filter: any, sort: any, select: any, callback: (err: any, items: T[]) => void): void;
    getListByIds(correlationId: string, ids: K[], callback: (err: any, items: T[]) => void): void;
    protected getOneRandom(correlationId: string, filter: any, callback: (err: any, item: T) => void): void;
    getOneById(correlationId: string, id: K, callback: (err: any, item: T) => void): void;
    create(correlationId: string, item: T, callback?: (err: any, item: T) => void): void;
    set(correlationId: string, item: T, callback?: (err: any, item: T) => void): void;
    update(correlationId: string, item: T, callback?: (err: any, item: T) => void): void;
    updatePartially(correlationId: string, id: K, data: AnyValueMap, callback?: (err: any, item: T) => void): void;
    deleteById(correlationId: string, id: K, callback?: (err: any, item: T) => void): void;
    protected deleteByFilter(correlationId: string, filter: any, callback?: (err: any) => void): void;
    deleteByIds(correlationId: string, ids: K[], callback?: (err: any) => void): void;
}
