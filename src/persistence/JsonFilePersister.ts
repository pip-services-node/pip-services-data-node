/** @module persistence */
/** @hidden */
const fs = require('fs');

import { IConfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { FileException } from 'pip-services-commons-node';
import { JsonConverter } from 'pip-services-commons-node';
import { ArrayConverter } from 'pip-services-commons-node';

import { ILoader } from '../ILoader';
import { ISaver } from '../ISaver';

/**
 * Helper class that provides methods for working with JSON data that is stored in a file.
 * 
 * A JsonFilePersister's path can be configured by passing ConfigParams with 
 * a "path" parameter to this class's [[configure]] method.
 */
export class JsonFilePersister<T> implements ILoader<T>, ISaver<T>, IConfigurable {
    private _path: string;

    /**
     * Creates a new JsonFilePersister.
     * 
     * @param path  the path to the target JSON file.
     */
    public constructor(path?: string) {
        this._path = path;
    }

    /**
     * @returns the path to the target JSON file.
     */
    public get path(): string {
        return this._path;
    }

    /**
     * @param value     the path to the target JSON file.
     */
    public set path(value: string) {
        this._path = value;
    }

    /**
     * Configures this JsonFilePersister using the parameters provided. Looks for a parameter 
     * with the key "path" and sets it for this object. If the key is not found, the value will 
     * default to the value that was previously set for this object.
     * 
     * @param config    ConfigParams, containing a "path" item.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this._path = config.getAsStringWithDefault("path", this._path);
    }

    /**
     * Loads the JSON data that is stored in this JsonFilePersister's target file.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param callback          the function to call with the loaded data 
     *                          (or with an error, if one is raised).
     */
    public load(correlation_id: string, callback: (err: any, data: T[]) => void): void {
        if (this._path == null) {
            callback(new ConfigException(null, "NO_PATH", "Data file path is not set"), null);
            return;
        }

        if (!fs.existsSync(this._path)) {
            callback(null, []);
            return;
        }

        try {
            let json: any = fs.readFileSync(this._path, "utf8");
            let list = JsonConverter.toNullableMap(json);
            let arr = ArrayConverter.listToArray(list);

            callback(null, arr);
        } catch (ex) {
            let err = new FileException(correlation_id, "READ_FAILED", "Failed to read data file: " + this._path)
                .withCause(ex);

            callback(err, null);
        }
    }

    /**
     * Saves the given entities as JSON data to this JsonFilePersister's target file.
     * 
     * @param correlation_id    unique business transaction id to trace calls across components.
     * @param entities          the entities to save.
     * @param callback          the function to call once the saving process is complete. 
     *                          Will be called with an error if one is raised.
     */
    public save(correlation_id: string, entities: T[], callback?: (err: any) => void): void {
        try {
            let json = JsonConverter.toJson(entities);
            fs.writeFileSync(this._path, json);
            if (callback) callback(null);
        } catch (ex) {
            let err = new FileException(correlation_id, "WRITE_FAILED", "Failed to write data file: " + this._path)
                .withCause(ex);

            if (callback) callback(err);
            else throw err;
        }
    }

}
