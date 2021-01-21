declare namespace mapObject {
	type Mapper<
		SourceObjectType extends Record<'key', any>,
		MappedObjectKeyType extends string,
		MappedObjectValueType
	> = (
		sourceKey: keyof SourceObjectType,
		sourceValue: SourceObjectType[keyof SourceObjectType],
		source: SourceObjectType
	) => [
		targetKey: MappedObjectKeyType,
		targetValue: MappedObjectValueType,
		mapperOption?: MapperOptions
	];

	interface Options {
		/**
		Recurse nested objects and objects in arrays.

		@default false
		*/
		deep?: boolean;

		/**
		Target object to map properties on to.

		@default {}
		*/
		target?: Record<'key', any>;
	}

	interface DeepOptions extends Options {
		deep: true;
	}

	interface TargetOptions<TargetObjectType extends Record<'key', any>> extends Options {
		target: TargetObjectType;
	}

	interface MapperOptions {
		/**
		Whether `targetValue` should be recursed. Requires `deep: true`.

		@default true
		*/
		shouldRecurse?: boolean;
	}
}

/**
Map object keys and values into a new object.

@param source - Source object to copy properties from.
@param mapper - Mapping function.

@example
```
import mapObject from 'map-obj';

const newObject = mapObject({foo: 'bar'}, (key, value) => [value, key]);
//=> {bar: 'foo'}
```
*/
export function mapObject<
	SourceObjectType extends Record<string, unknown>,
	TargetObjectType extends Record<'key', any>,
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
	SourceObjectType,
	MappedObjectKeyType,
	MappedObjectValueType
	>,
	options: mapObject.DeepOptions & mapObject.TargetOptions<TargetObjectType>
): TargetObjectType & Record<'key', unknown>;
export function mapObject<
	SourceObjectType extends Record<string, unknown>,
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
	SourceObjectType,
	MappedObjectKeyType,
	MappedObjectValueType
	>,
	options: mapObject.DeepOptions
): Record<'key', unknown>;
export function mapObject<
	SourceObjectType extends Record<'key', any>,
	TargetObjectType extends Record<'key', any>,
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
	SourceObjectType,
	MappedObjectKeyType,
	MappedObjectValueType
	>,
	options: mapObject.TargetOptions<TargetObjectType>
): TargetObjectType & {[K in MappedObjectKeyType]: MappedObjectValueType};
export function mapObject<
	SourceObjectType extends Record<'key', any>,
	MappedObjectKeyType extends string,
	MappedObjectValueType
>(
	source: SourceObjectType,
	mapper: mapObject.Mapper<
	SourceObjectType,
	MappedObjectKeyType,
	MappedObjectValueType
	>,
	options?: mapObject.Options
): {[K in MappedObjectKeyType]: MappedObjectValueType};

export default mapObject;
