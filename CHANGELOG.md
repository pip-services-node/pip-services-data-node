# Data processing and persistence components for Pip.Services in Node.js Changelog

## <a name="3.0.0"></a> 3.0.0 (2018-08-21)

### Breaking Changes
* Moved MongoDB to pip-services-mongodb

## <a name="2.3.1"></a> 2.3.1 (2017-06-16)

### Bug Fixes
* Fixed "not master" when trying to connect to replica set

## <a name="2.3.0"></a> 2.3.0 (2017-04-20)

### Features
* Added MongoDbConnectionResolver

## <a name="2.2.2"></a> 2.2.2 (2017-04-13)

### Features
* Migrated to pip-services-commons-node v2.3

### Bug fixes
* Fixed debug messages in persistence classes

## <a name="2.2.0"></a> 2.2.0 (2017-04-11)

### Features
* Added getListByIds(), deleteByFilter(), and deleteByIds() methds to all Identifible persistence components

## <a name="2.1.0"></a> 2.1.0 (2017-04-08)

### Features
* Added IPartialUpdater interface
* Added updatePartially() method to all Identifiable persistence components

### Breaking Changes
* Removed IDynamicWriter interface

## <a name="2.0.13"></a> 2.0.14 (2017-04-02)

### Bug fixes
* **memory** Fixed null pointer exception in deleteById()

## <a name="2.0.13"></a> 2.0.13 (2017-04-02)

### Bug fixes
* **memory** Added cloning for persisting objects to mimic real DB behavior

## <a name="2.0.12"></a> 2.0.12 (2017-03-31)

### Features
* **mongodb** Made collection name configurable
* **mongodb** Added protected GetPageByFilter, GetListByFilter and GetRandomOne methods to IndentifiableMongoDbPersistence
* **memory** Added protected GetPageByFilter, GetListByFilter and GetRandomOne methods to IndentifiableMemoryPersistence
* **tests** Reimplemented persistence tests

### Bug fixes
* **mongodb** Omitted id field from being persisted
* **file** Fixed reading non-existed files
* **memory**, **file** Fixed max_page_size configuration parameter
* **memory** Fixed getRandom and getListByFilter
* **mongodb** Fixed skip in getOneRandom
* **mongodb** Added clonning objects to avoid changing original data

## <a name="2.0.5"></a> 2.0.5 (2017-03-15)

### Features
* **mongodb** Added support to mongodb clusters

### Bug fixes
* Removed generics from MongoDbPersistence

## <a name="2.0.0"></a> 2.0.0 (2017-02-27)

### Breaking Changes
* Migrated to **pip-services** 2.0
* Separated code persistence from IdentifiablePersistence classes

## <a name="1.0.0"></a> 1.0.0 (2017-01-28)

Initial public release

### Features
* **memory** Memory persistence
* **file** Abstract file and JSON persistence
* **mongodb** MongoDB persistence

### Bug Fixes
No fixes in this version

