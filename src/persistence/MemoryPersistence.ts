/** @module persistence */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';
import { ICleanable } from 'pip-services-commons-node';
import { CompositeLogger } from 'pip-services-components-node';

import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';

/**
 * Stores items of type T in memory and provides methods for working with the data 
 * that is stored.
 * 
 * Implements [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable]],
 * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/run.iopenable.html IOpenable]], and 
 * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/run.icleanable.html ICleanable]] 
 * for lifecycle support.
 */
export class MemoryPersistence<T> implements IReferenceable, IOpenable, ICleanable {
    protected _logger: CompositeLogger = new CompositeLogger();
    protected _items: T[] = [];
    protected _loader: ILoader<T>;
    protected _saver: ISaver<T>;
    protected _opened: boolean = false;

    /**
     * Creates a new MemoryPersistence.
     * 
     * @param loader    the loader to use for loading items from a data source.
     * @param saver     the saver to use for saving items to a data source.
     */
    public constructor(loader?: ILoader<T>, saver?: ISaver<T>) {
        this._loader = loader;
        this._saver = saver;
    }

    /**
     * Sets this MemoryPersistence's logger's references. A logger's
     * reference is usually its context info.
     * 
     * @param references    the references to set in the logger.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-components-node/master/doc/api/interfaces/log.logger.html#setreferences Logger.setReferences]]
     */
    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
    }

    /**
     * @returns whether or not this MemoryPersistence's items have been loaded to memory.
     * 
     * @see [[open]]
     */
    public isOpen(): boolean {
        return this._opened;
    }

    /**
     * Opens this MemoryPersistence by attempting to load its items to memory.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          (optional) the function to call once the opening process is complete.
     *                          Will be called with an error if one is raised.
     */
    public open(correlationId: string,  callback?: (err: any) => void): void {
        this.load(correlationId, (err) => {
            this._opened = true;
            if (callback) callback(err);
        });
    }

    private load(correlationId: string, callback?: (err: any) => void): void {
        if (this._loader == null) {
            if (callback) callback(null);
            return;
        }
            
        this._loader.load(correlationId, (err: any, items: T[]) => {
            if (err == null) {
                this._items = items;
                this._logger.trace(correlationId, "Loaded %d items", this._items.length);
            }
            if (callback) callback(err);
        });
    }

    /**
     * Closes this MemoryPersistence by attempting to save its items to memory.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          (optional) the function to call once the closing process is complete.
     *                          Will be called with an error if one is raised.
     */
    public close(correlationId: string, callback?: (err: any) => void): void {
        this.save(correlationId, (err) => {
            this._opened = false;
            
            if (callback) callback(err);
        });
    }

    /**
     * Saves the items stored by this MemoryPersistence to a data source.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          (optional) the function to call once the saving process is complete.
     *                          Will be called with an error if one is raised.
     */
    public save(correlationId: string, callback?: (err: any) => void): void {
        if (this._saver == null) {
            if (callback) callback(null);
            return;
        }

        let task = this._saver.save(correlationId, this._items, (err: any) => {
            if (err == null)
                this._logger.trace(correlationId, "Saved %d items", this._items.length);

            if (callback) callback(err);
        });
    }

    /**
     * Clears this MemoryPersistence by removing all of its items from memory and calling the 
     * [[save]] method.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          (optional) the function to call once the clearing process is complete. 
     *                          Will be called with an error if one is raised.
     * 
     * @see [[save]]
     */
    public clear(correlationId: string, callback?: (err?: any) => void): void {
        this._items = [];
        this._logger.trace(correlationId, "Cleared items");
        this.save(correlationId, callback);
    }

}
