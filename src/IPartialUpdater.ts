/** @module core */
import { AnyValueMap } from 'pip-services-commons-node';

//TODO: Does id make the item an instance of IIdentifiable?
/**
 * Interface for performing partial updates to [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html identifiable]] 
 * records of the type T, whose IDs are of type K.
 * 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html IIdentifiable]]
 * 
 * ### Examples ###
 * 
 *     export class MyPartialUpdater<T> implements IPartialUpdater<T, K> {
 *         public updatePartially(correlation_id: string, id: K, data: AnyValueMap, callback?: (err: any, item: T) => void): void {
 *             ...
 *         }
 *     }
 */
export interface IPartialUpdater<T, K> {
    /**
     * Abstract method that will contain the logic for performing a partial update to the record 
     * with the given ID.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param id                the id of the item that is to be updated (partially).
     * @param data              the map of items to update in the record.
     * @param callback          the function to call with the updated item 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.anyvaluemap.html AnyValueMap]]
     */
    updatePartially(correlation_id: string, id: K, data: AnyValueMap, callback?: (err: any, item: T) => void): void;
}
