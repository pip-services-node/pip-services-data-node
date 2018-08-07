/** @module core */
/**
 * Interface for classes that need to load items of type T from a data source.
 * 
 * @see [[ISaver]]
 */
export interface ILoader<T> {
    /**
     * Abstract method that will contain the logic for loading items from a data source.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components. 
     * @param callback          the function to call with the loaded items
     *                          (or with an error, if one is raised).
     */
    load(correlation_id: string, callback: (err: any, items: T[]) => void): void;
}
