/** @module core */
import { DataPage } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { SortParams } from 'pip-services-commons-node';

/**
 * Interface for retrieving pages from a data source using a query.
 */
export interface IQuerablePageReader<T> {
    /**
     * Abstract method that will contain the logic for retrieving DataPages from a data source 
     * in accordance with the given query and parameters.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param query             the query to retrieve pages by.
     * @param paging            the paging parameters to use.
     * @param sort              the sorting parameters to sort by.
     * @param callback          the function to call with the retrieved pages 
     *                          (or with an error, if one is raised).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.datapage.html DataPage]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.pagingparams.html PagingParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.sortparams.html SortParams]] (in the PipServices "Commons" package)
     */
    getPageByQuery(correlation_id: string, query: string, paging: PagingParams, sort: SortParams, 
        callback: (err: any, page: DataPage<T>) => void): void;
}
