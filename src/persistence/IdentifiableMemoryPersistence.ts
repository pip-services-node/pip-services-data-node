/** @module persistence */
/** @hidden */
let _ = require('lodash');

import { IIdentifiable } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { ObjectWriter } from 'pip-services-commons-node';
import { IdGenerator } from 'pip-services-commons-node';

import { MemoryPersistence } from './MemoryPersistence';
import { IWriter } from '../IWriter';
import { IGetter } from '../IGetter';
import { ISetter } from '../ISetter';
import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';

/**
 * Stores items of type T in memory, 
 * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html identifiable]] 
 * by their keys of type K, and provides methods for working with the items stored.
 * 
 * An IdentifiableMemoryPersistence's max page size can be configured by passing ConfigParams with 
 * a "options.max_page_size" parameter to this class's [[configure]] method.
 * 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html IIdentifiable]] (in the PipServices "Commons" package)
 * 
 * ### Examples ###
 * 
 *     export class MyDataMemoryPersistence extends IdentifiableMemoryPersistence<MyData, String>
 *     implements IMyDataPersistence {
 *         ...
 *         public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams,
 *         callback: (err: any, page: DataPage<MyData>) => void): void {
 *             super.getPageByFilter(correlationId, filter, paging, null, null, callback);
 *         }
 *         ...
 *
 *         public getOneById(correlationId: string, id: K, callback: (err: any, item: T) => void): void {
 *             super.getOneById(correlationId, id, callback);  
 *         }
 *         ...
 *     }
 */
export class IdentifiableMemoryPersistence<T extends IIdentifiable<K>, K> extends MemoryPersistence<T> 
    implements IConfigurable, IWriter<T, K>, IGetter<T, K>, ISetter<T> {
    protected _maxPageSize: number = 100;

    /**
     * Creates a new IdentifiableMemoryPersistence.
     * 
     * @param loader    the loader to use for loading items from a data source.
     * @param saver     the saver to use for saving items to a data source.
     */
    public constructor(loader?: ILoader<T>, saver?: ISaver<T>) {
        super(loader, saver);
    }

    /**
     * Configures this IdentifiableMemoryPersistence using the parameters provided. Looks 
     * for a parameter with the key "options.max_page_size" and sets it for this object. 
     * If the key is not found, the value will default to the value that was previously set 
     * for this object.
     * 
     * @param config    ConfigParams, containing a "options.max_page_size" item.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this._maxPageSize = config.getAsIntegerWithDefault("options.max_page_size", this._maxPageSize);
    }

    /**
     * Retrieves DataPages from this IdentifiableMemoryPersistence in accordance with the given parameters.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param filter            the filter parameters to filter by.
     * @param paging            the paging parameters to use.
     * @param sort              the sorting parameters to sort by.
     * @param select            not used.
     * @param callback          the function to call with the retrieved pages 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.datapage.html DataPage]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.filterparams.html FilterParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.pagingparams.html PagingParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.sortparams.html SortParams]] (in the PipServices "Commons" package)
     */
    protected getPageByFilter(correlationId: string, filter: any, 
        paging: PagingParams, sort: any, select: any, 
        callback: (err: any, page: DataPage<T>) => void): void {
        
        let items = this._items;

        // Filter and sort
        if (_.isFunction(filter))
            items = _.filter(items, filter);
        if (_.isFunction(sort))
            items = _.sortUniqBy(items, sort);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = items.length;
        
        if (skip > 0)
            items = _.slice(items, skip);
        items = _.take(items, take);
        
        this._logger.trace(correlationId, "Retrieved %d items", items.length);
        
        let page = new DataPage<T>(items, total);
        callback(null, page);
    }

    /**
     * Retrieves a list of items in accordance with the given parameters.
     * 
     * @param correlationId    unique business transaction id to trace calls across components.
     * @param filter            the filter parameters to filter by.
     * @param sort              the sorting parameters to sort by.
     * @param select            not used.
     * @param callback          the function to call with the retrieved list of items 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.filterparams.html FilterParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.sortparams.html SortParams]] (in the PipServices "Commons" package)
     */
    protected getListByFilter(correlationId: string, filter: any, sort: any, select: any,
        callback: (err: any, items: T[]) => void): void {
        
        let items = this._items;

        // Apply filter
        if (_.isFunction(filter))
            items = _.filter(items, filter);

        // Apply sorting
        if (_.isFunction(sort))
            items = _.sortUniqBy(items, sort);
        
        this._logger.trace(correlationId, "Retrieved %d items", items.length);
        
        callback(null, items);
    }

    /**
     * Retrieves the items with the given IDs. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param ids               the ids of the items to retrieve.
     * @param callback          the function to call with the retrieved list of items 
     *                          (or with an error, if one is raised).
     */
    public getListByIds(correlationId: string, ids: K[],
        callback: (err: any, items: T[]) => void): void {
        let filter = (item: T) => {
            return _.indexOf(ids, item.id) >= 0;
        }
        this.getListByFilter(correlationId, filter, null, null, callback);
    }

    /**
     * Retrieves a random item from the ones that are stored. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param filter            the filtering function to filter the result by.
     * @param callback          the function to call with the randomly retrieved item 
     *                          (or with an error, if one is raised).
     */
    protected getOneRandom(correlationId: string, filter: any, callback: (err: any, item: T) => void): void {
        let items = this._items;

        // Apply filter
        if (_.isFunction(filter))
            items = _.filter(items, filter);

        let item: T = items.length > 0 ? _.sample(items) : null;
        
        if (item != null)
            this._logger.trace(correlationId, "Retrieved a random item");
        else
            this._logger.trace(correlationId, "Nothing to return as random item");
                        
        callback(null, item);
    }

    /**
     * Retrieves an item by its ID. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param id                the id of the item to retrieve.
     * @param callback          the function to call with the retrieved item 
     *                          (or with an error, if one is raised).
     */
    public getOneById(correlationId: string, id: K, callback: (err: any, item: T) => void): void {
        let items = this._items.filter((x) => {return x.id == id;});
        let item = items.length > 0 ? items[0] : null;

        if (item != null)
            this._logger.trace(correlationId, "Retrieved item %s", id);
        else
            this._logger.trace(correlationId, "Cannot find item by %s", id);

        callback(null, item);
    }

    /**
     * Creates a new record of the given item and [[save saves]] it.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param item              the item to create a record of.
     * @param callback          (optional) the function to call with the created record 
     *                          (or with an error, if one is raised).
     * 
     * @see [[save]]
     */
    public create(correlationId: string, item: T, callback?: (err: any, item: T) => void): void {
        item = _.clone(item);
        if (item.id == null)
            ObjectWriter.setProperty(item, "id", IdGenerator.nextLong());

        this._items.push(item);
        this._logger.trace(correlationId, "Created item %s", item.id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    /**
     * Sets the given item in this IdentifiableMemoryPersistence. If no objects exist with the item's 
     * ID, then the item will simply be added. If one does exist, then it will be 
     * overwritten by the item that was passed to this method.
     * 
     * @param correlationId    unique business transaction id to trace calls across components.
     * @param item              the item to set.
     * @param callback          (optional) the function to call with the item that was set 
     *                          (or with an error, if one is raised).
     */
    public set(correlationId: string, item: T, callback?: (err: any, item: T) => void): void {
        item = _.clone(item);
        if (item.id == null)
            ObjectWriter.setProperty(item, "id", IdGenerator.nextLong());

        let index = this._items.map((x) => { return x.id; }).indexOf(item.id);

        if (index < 0) this._items.push(item);
        else this._items[index] = item;

        this._logger.trace(correlationId, "Set item %s", item.id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    /**
     * Updates the record of the given item.
     * 
     * @param correlationId    unique business transaction id to trace calls across components.
     * @param item              the item to update.
     * @param callback          (optional) the function to call with the updated item 
     *                          (or with an error, if one is raised).
     */
    public update(correlationId: string, item: T, callback?: (err: any, item: T) => void): void {
        let index = this._items.map((x) => { return x.id; }).indexOf(item.id);

        if (index < 0) {
            this._logger.trace(correlationId, "Item %s was not found", item.id);
            callback(null, null);
            return;
        }

        item = _.clone(item);
        this._items[index] = item;
        this._logger.trace(correlationId, "Updated item %s", item.id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    /**
     * Performes a partial update for the record with the given ID.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param id                the id of the item that is to be updated (partially).
     * @param data              the map of items to update in the record.
     * @param callback          (optional) the function to call with the updated item 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.anyvaluemap.html AnyValueMap]]
     */
    public updatePartially(correlationId: string, id: K, data: AnyValueMap,
        callback?: (err: any, item: T) => void): void {
            
        let index = this._items.map((x) => { return x.id; }).indexOf(id);

        if (index < 0) {
            this._logger.trace(correlationId, "Item %s was not found", id);
            callback(null, null);
            return;
        }

        let item: any = this._items[index];
        item = _.extend(item, data.getAsObject())
        this._items[index] = item;
        this._logger.trace(correlationId, "Partially updated item %s", id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    /**
     * Deletes the item with the given ID.
     * 
     * @param correlationId    unique business transaction id to trace calls across components.
     * @param id                the id of the item that is to be deleted.
     * @param callback          (optional) the function to call with the deleted item 
     *                          (or with an error, if one is raised).
     */
    public deleteById(correlationId: string, id: K, callback?: (err: any, item: T) => void): void {
        var index = this._items.map((x) => { return x.id; }).indexOf(id);
        var item = this._items[index];

        if (index < 0) {
            this._logger.trace(correlationId, "Item %s was not found", id);
            callback(null, null);
            return;
        }

        this._items.splice(index, 1);
        this._logger.trace(correlationId, "Deleted item by %s", id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    /**
     * Deletes items that match the given filter.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param filter            the filter function to delete items by.
     * @param callback          (optional) the function to call with an error (if one is raised).
     */
    protected deleteByFilter(correlationId: string, filter: any, callback?: (err: any) => void): void {
        let deleted = 0;
        for (let index = this._items.length - 1; index>= 0; index--) {
            let item = this._items[index];
            if (filter(item)) {
                this._items.splice(index, 1);
                deleted++;
            }
        }

        if (deleted == 0) {
            callback(null);
            return;
        }

        this._logger.trace(correlationId, "Deleted %s items", deleted);

        this.save(correlationId, (err) => {
            if (callback) callback(err)
        });
    }

    /**
     * Deletes multiple items by their provided IDs.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param ids               the ids of the items that are to be deleted.
     * @param callback          (optional) the function to call with an error (if one is raised).
     */
    public deleteByIds(correlationId: string, ids: K[], callback?: (err: any) => void): void {
        let filter = (item: T) => {
            return _.indexOf(ids, item.id) >= 0;
        }
        this.deleteByFilter(correlationId, filter, callback);
    }

}
