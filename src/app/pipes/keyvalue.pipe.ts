import { KeyValueDiffers, Pipe, PipeTransform } from '@angular/core';

function defaultComparator(keyValueA, keyValueB) {
  const a = keyValueA.key;
  const b = keyValueB.key;

    if (a === b) {
      return 0;
    }
    if (a === undefined) {
      return 1;
    }
    if (b === undefined) {
      return -1;
    }
    if (a === null) {
      return 1;
    }
    if (b === null) {
      return -1;
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a < b ? -1 : 1;
    }
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
    }
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return a < b ? -1 : 1;
    }
    const aString = String(a);
    const bString = String(b);
    return aString === bString
    ? 0
    : aString < bString
      ? -1
      : 1;
}

function makeKeyValuePair(key, value) {
    return { key, value };
}

export interface KeyValue<K, V> {
    key: K;
    value: V;
}

@Pipe({ name: 'keyvalue', pure: false})
export class KeyValuePipe implements PipeTransform {
    private readonly differs;
    private differ;
    private keyValues;

    constructor(differs: KeyValueDiffers ) {
        this.differs = differs;
    }

    transform(input, compareFn = defaultComparator) {
        if (!input || (!(input instanceof Map) && typeof input !== 'object')) {
            return null;
        }
        if (!this.differ) {
            // make a differ for whatever type we've been passed in
            this.differ = this.differs.find(input).create();
        }
        const differChanges = this.differ.diff(input);
        if (differChanges) {
            this.keyValues = [];
            differChanges.forEachItem((r) => {
                this.keyValues.push(makeKeyValuePair(r.key, r.currentValue));
            });
            this.keyValues.sort(compareFn);
        }
        return this.keyValues;
    }
}
