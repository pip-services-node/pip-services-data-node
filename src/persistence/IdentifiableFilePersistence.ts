/** @module persistence */
import { IIdentifiable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';

import { IdentifiableMemoryPersistence } from './IdentifiableMemoryPersistence';
import { JsonFilePersister } from './JsonFilePersister'

/**
 * Stores [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html identifiable]] 
 * items of type T in a JSON file and provides methods for working with the data 
 * that is stored.
 * 
 * 
 * An IdentifiableFilePersistence's target file path can be configured by passing ConfigParams 
 * with a "path" parameter to this class's [[configure]] method. Additionally, the 
 * max page size can be configured by passing ConfigParams with a "options.max_page_size" 
 * parameter.
 * 
 * @see [[JsonFilePersister]]
 * @see [[MemoryPersistence]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/data.iidentifiable.html IIdentifiable]] (in the PipServices "Commons" package)
 */
export class IdentifiableFilePersistence<T extends IIdentifiable<K>, K> extends IdentifiableMemoryPersistence<T, K> {
    protected readonly _persister: JsonFilePersister<T>;

    /**
     * Creates a new IdentifiableFilePersistence.
     * 
     * @param persister     the JsonFilePersister to use for loading and saving 
     *                      JSON data to a file.
     */
    public constructor(persister?: JsonFilePersister<T>) {
        if (persister == null) 
            persister = new JsonFilePersister<T>();

        super(persister, persister);

        this._persister = persister;
    }

    /**
     * Configures the path to the target file, with which this object's [[JsonFilePersister]] 
     * will be working, as well as the max page size.
     * 
     * @param config    ConfigParams, containing a "path" and/or "options.max_page_size" item.
     * 
     * @see [[JsonFilePersister.configure]]
     * @see [[IdentifiableMemoryPersistence.configure]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}
