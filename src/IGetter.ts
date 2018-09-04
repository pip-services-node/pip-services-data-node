/** @module core */
import { IIdentifiable } from 'pip-services-commons-node';

/**
 * Interface for retrieving [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html identifiable]] 
 * items of type T by their IDs (which are of type K).
 * 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html IIdentifiable]]
 * 
 * @see [IWriter] (for a complete set of CRUD operations)
 * 
 * ### Examples ###
 * 
 *     export class MyGetter<T> implements IGetter<T> {
 *         public getOneById(correlation_id: string, id: K, callback: (err: any, item: T) => void): void {
 *             ...
 *         }
 *     }
 */
export interface IGetter<T extends IIdentifiable<K>, K> {
    /**
     * Abstract method that will contain the logic for retrieving an item by the given ID.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param id                the id of the item that is to be retrieved.
     * @param callback          the function to call with the retrieved item 
     *                          (or with an error, if one is raised).
     */
    getOneById(correlation_id: string, id: K, callback: (err: any, item: T) => void): void;
}
