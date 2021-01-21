import {expectType, expectAssignable} from 'tsd';
import mapObject from './index.js';

const options: mapObject.Options = {};

const newObject = mapObject({foo: 'bar'}, (key: 'foo', value: string) => [value, key]);
expectType<Record<'key', 'foo'>>(newObject);
expectType<'foo'>(newObject.bar);

const object = mapObject({foo: 'bar'}, (key: 'foo', value: string) => [value, key], {
	target: {baz: 'baz'}
});
expectType<Record<'baz' | 'x', 'foo'>>(object);
expectType<'foo'>(object.bar);
expectType<string>(object.baz);

const object1 = mapObject({foo: 'bar'}, (key: 'foo', value: string) => [value, key], {
	target: {baz: 'baz'},
	deep: false
});
expectType<Record<'baz' | 'x', 'foo'>>(object1);
expectType<'foo'>(object1.bar);
expectType<string>(object1.baz);

const object2 = mapObject({foo: 'bar'}, (key: 'foo', value: string) => [value, key], {
	deep: true
});
expectType<Record<'key', unknown>>(object2);
const object3 = mapObject({foo: 'bar'}, (key: any, value: any) => [value, key], {
	deep: true,
	target: {bar: 'baz' as const}
});
expectAssignable<Record<'key', unknown>>(object3);
expectType<'baz'>(object3.bar);

mapObject({foo: 'bar'}, (key: any, value: any) => [value, key, {shouldRecurse: false}]);
