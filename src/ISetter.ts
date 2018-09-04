/** @module core */
/**
 * Interface for classes that need to set items of type T in their objects.
 * 
 * ### Examples ###
 * 
 *     export class MySetter<T> implements ISetter<T> {
 *         public set(correlation_id: string, item: T, callback?: (err: any, item: T) => void): void {
 *             ...
 *         }
 *     }
 */
export interface ISetter<T> {
    /**
     * Abstract method that will contain the logic for setting the given item in the object for
     * which it was called.
     * 
     * Items are usually set in the following way:
     * - if no objects exist with the item's ID, then the item will simply be added. 
     * - if one does exist, then it will be overwritten by the item that was passed to the method.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param item              the item to set.
     * @param callback          (optional) the function to call with the item that was set 
     *                          (or with an error, if one is raised).
     */
    set(correlation_id: string, item: T, callback?: (err: any, item: T) => void): void;
}
