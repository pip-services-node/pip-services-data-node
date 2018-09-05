/** @module core */
import { AnyValueMap } from 'pip-services-commons-node';

/**
 * Interface for classes that need to perform create, update, and delete operations with items 
 * of type T. Item deletion is done by the object's ID, which is of type K.
 * 
 * @see [[IGetter]] (for a complete set of CRUD operations)
 * 
 * ### Examples ###
 * 
 *     export class MyWriter<T, K> implements IWriter<T, K> {
 *         public create(correlation_id: string, item: T, 
 *                 callback?: (err: any, item: T) => void): void {
 *             ...
 *         }
 * 
 *         public update(correlation_id: string, item: T, 
 *                 callback?: (err: any, item: T) => void): void {
 *             ...
 *         }
 * 
 *         public deleteById(correlation_id: string, id: K, 
 *                 callback?: (err: any, item: T) => void): void {
 *             ...
 *         }
 *     }
 */
export interface IWriter<T, K> {
    /**
     * Abstract method that will contain the logic for creating records of an item.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param item              the item to create a record of.
     * @param callback          (optional) the function to call with the created record 
     *                          (or with an error, if one is raised).
     */
    create(correlation_id: string, item: T, callback?: (err: any, item: T) => void): void;

    /**
     * Abstract method that will contain the logic for updating records of items.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param item              the item to update.
     * @param callback          (optional) the function to call with the updated item 
     *                          (or with an error, if one is raised).
     */
    update(correlation_id: string, item: T, callback?: (err: any, item: T) => void): void;

    /**
     * Abstract method that will contain the logic for deleting items of type T by their type K keys.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param id                the id of the item that is to be deleted.
     * @param callback          (optional) the function to call with the deleted item 
     *                          (or with an error, if one is raised).
     */
    deleteById(correlation_id: string, id: K, callback?: (err: any, item: T) => void): void;
}
