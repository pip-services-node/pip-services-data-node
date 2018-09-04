/** @module core */
/**
 * Interface for classes that need to save items of type T to a data source. 
 * 
 * @see [[ILoader]]
 * 
 * ### Examples ###
 * 
 *     export class MySaver<T> implements ISaver<T> {
 *         public save(correlation_id: string, items: T[], callback?: (err?: any) => void): void {
 *             ...
 *         }
 *     }
 */
export interface ISaver<T> {
    /**
     * Abstract method that will contain the logic for saving items to a data source.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components. 
     * @param item              the items to save.
     * @param callback          (optional) the function to call when the saving process is complete
     *                          (or with an error, if one is raised).
     */
    save(correlation_id: string, items: T[], callback?: (err?: any) => void): void;
}
