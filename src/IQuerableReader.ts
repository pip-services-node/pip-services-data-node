/** @module core */
import { SortParams } from 'pip-services-commons-node';

/**
 * Interface for retrieving a list of items from a data source using a query.
 * 
 * ### Examples ###
 * 
 *     export class MyQuerableReader<T> implements IQuerableReader<T> {
 *         public getListByQuery(correlation_id: string, query: string, sort: SortParams, callback: (err: any, items: T[]) => void): void {
 *             ...
 *         }
 *     }
 */
export interface IQuerableReader<T> {
    /**
     * Abstract method that will contain the logic for retrieving a list of items from a data source 
     * in accordance with the given query and parameters.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param query             the query to retrieve items by.
     * @param sort              the sorting parameters to sort by.
     * @param callback          the function to call with the retrieved list of items 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.filterparams.html FilterParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.sortparams.html SortParams]] (in the PipServices "Commons" package)
     */
    getListByQuery(correlation_id: string, query: string, sort: SortParams, callback: (err: any, items: T[]) => void): void;
}
