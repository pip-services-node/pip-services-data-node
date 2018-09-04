/** @module core */
import { FilterParams } from 'pip-services-commons-node';
import { SortParams } from 'pip-services-commons-node';

/**
 * Interface for retrieving filtered lists of items from a data source.
 * 
 * ### Examples ###
 * 
 *     export class MyFilteredReader<T> implements IFilteredReader<T> {
 *         public getListByFilter(correlation_id: string, filter: FilterParams, sort: SortParams, 
 *         callback: (err: any, items: T[]) => void): void {
 *             ...
 *         }
 *     }
 */
export interface IFilteredReader<T> {
    /**
     * Abstract method that will contain the logic for retrieving a list of items from a data source 
     * in accordance with the given parameters.
     * 
     * @param correlation_id     unique business transaction id to trace calls across components.
     * @param filter            the filter parameters to filter by.
     * @param sort              the sorting parameters to sort by.
     * @param callback          the function to call with the retrieved list of items 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.filterparams.html FilterParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.sortparams.html SortParams]] (in the PipServices "Commons" package)
     */
    getListByFilter(correlation_id: string, filter: FilterParams, sort: SortParams, 
        callback: (err: any, items: T[]) => void): void;
}
