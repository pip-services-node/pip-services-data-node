import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ICleanable } from 'pip-services-commons-node';
import { CompositeLogger } from 'pip-services-components-node';
import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';
export declare class MemoryPersistence<T> implements IReferenceable, IOpenable, ICleanable {
    protected _logger: CompositeLogger;
    protected _items: T[];
    protected _loader: ILoader<T>;
    protected _saver: ISaver<T>;
    protected _opened: boolean;
    constructor(loader?: ILoader<T>, saver?: ISaver<T>);
    setReferences(references: IReferences): void;
    isOpen(): boolean;
    open(correlationId: string, callback?: (err: any) => void): void;
    private load;
    close(correlationId: string, callback?: (err: any) => void): void;
    save(correlationId: string, callback?: (err: any) => void): void;
    clear(correlationId: string, callback?: (err?: any) => void): void;
}
