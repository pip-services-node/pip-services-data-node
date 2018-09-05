/** @module core */
import { DataPage } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { SortParams } from 'pip-services-commons-node';

/**
 * Interface for retrieving filtered pages from a data source.
 * 
 * ### Examples ###
 * 
 *     export class MyFilteredPageReader<T> implements IFilteredPageReader<T> {
 *         
 *         public getPageByFilter(correlation_id: string, filter: FilterParams, 
 *                  paging: PagingParams, sort: SortParams, 
 *                  callback: (err: any, page: DataPage<T>) => void): void {
 *             ...
 *         }
 * 
 *     }
 */
export interface IFilteredPageReader<T> {
    /**
     * Abstract method that will contain the logic for retrieving DataPages from a data source 
     * in accordance with the given parameters.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param filter            the filter parameters to filter by.
     * @param paging            the paging parameters to use.
     * @param sort              the sorting parameters to sort by.
     * @param callback          the function to call with the retrieved pages 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.datapage.html DataPage]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.filterparams.html FilterParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.pagingparams.html PagingParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.sortparams.html SortParams]] (in the PipServices "Commons" package)
     */
    getPageByFilter(correlation_id: string, filter: FilterParams, paging: PagingParams, sort: SortParams, 
        callback: (err: any, page: DataPage<T>) => void): void;
}
