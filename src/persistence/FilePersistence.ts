/** @module persistence */
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';

import { JsonFilePersister } from './JsonFilePersister'
import { MemoryPersistence } from './MemoryPersistence';

/**
 * Stores items of type T in a JSON file and provides methods for working with the data 
 * that is stored.
 * 
 * A FilePersistence's target file path can be configured by passing ConfigParams with 
 * a "path" parameter to this class's [[configure]] method.
 * 
 * @see [[JsonFilePersister]]
 * @see [[MemoryPersistence]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
 */
export class FilePersistence<T> extends MemoryPersistence<T> implements IConfigurable {
    protected readonly _persister: JsonFilePersister<T>;

    /**
     * Creates a new FilePersistence.
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
     * will be working.
     * 
     * @param config    ConfigParams, containing a "path" item.
     * 
     * @see [[JsonFilePersister.configure]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this._persister.configure(config);
    }

}
