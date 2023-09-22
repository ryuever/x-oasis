import FixedBuffer from './FixedBuffer';
import { RecyclerProps } from './types';
import {
  DEFAULT_RECYCLER_TYPE,
  RECYCLER_BUFFER_SIZE,
  RECYCLER_RESERVED_BUFFER_PER_BATCH,
  RECYCLER_RESERVED_BUFFER_SIZE_RATIO,
  RECYCLER_THRESHOLD_INDEX_VALUE,
} from './common';

class Recycler {
  private _queue: Array<FixedBuffer> = [];

  /**
   * start index
   */
  private _thresholdIndexValue = 0;
  private _recyclerReservedBufferPerBatch: number;
  /**
   * buffer size, the oversize node will run into recycle strategy
   */
  private _recyclerBufferSize: number;
  private _recyclerReservedBufferSize: number;
  private _metaExtractor: (index: number) => any;
  private _indexExtractor: (meta: any) => number;
  private _getType: (index: number) => string;

  constructor(props?: RecyclerProps) {
    const {
      getType,
      metaExtractor,
      indexExtractor,
      recyclerTypes = [],
      recyclerBufferSize = RECYCLER_BUFFER_SIZE,
      thresholdIndexValue = RECYCLER_THRESHOLD_INDEX_VALUE,
      recyclerReservedBufferPerBatch = RECYCLER_RESERVED_BUFFER_PER_BATCH,
    } = props || {};

    this._metaExtractor = metaExtractor;
    this._indexExtractor = indexExtractor;
    this._getType = getType;
    this._recyclerBufferSize = recyclerBufferSize;
    this._thresholdIndexValue = thresholdIndexValue;
    this._recyclerReservedBufferSize = Math.floor(
      recyclerBufferSize * RECYCLER_RESERVED_BUFFER_SIZE_RATIO
    );
    this._recyclerReservedBufferPerBatch = recyclerReservedBufferPerBatch;
    recyclerTypes.forEach((type) => this.addBuffer(type));
  }

  get queue() {
    return this._queue;
  }

  get thresholdIndexValue() {
    return this._thresholdIndexValue;
  }

  get recyclerReservedBufferPerBatch() {
    return this._recyclerReservedBufferPerBatch;
  }

  getIndices() {
    return this._queue.reduce((acc, cur) => acc.concat(cur.getIndices()), []);
  }

  addBuffer(type: string) {
    if (!type) return null;
    const index = this._queue.findIndex(
      (buffer) => buffer.recyclerType === type
    );
    if (index !== -1) return this._queue[index];
    const buffer = new FixedBuffer({
      recyclerType: type,
      metaExtractor: this._metaExtractor,
      indexExtractor: this._indexExtractor,
      bufferSize: this._recyclerBufferSize,
      thresholdIndexValue: this._thresholdIndexValue,
    });
    this._queue.push(buffer);
    return buffer;
  }

  ensureBuffer(type: string) {
    return this.addBuffer(type || DEFAULT_RECYCLER_TYPE);
  }

  updateIndices(props: {
    /**
     * index in range should not be recycled
     */
    safeRange: {
      startIndex: number;
      endIndex: number;
    };
    startIndex: number;
    maxCount: number;
    step: number;

    // /** the max index value, always be the length of data */
    maxIndex: number;
  }) {
    // this._queue.forEach((buffer) => buffer.start());
    const {
      startIndex: _startIndex,
      safeRange,
      step,
      maxCount,
      maxIndex,
    } = props;
    const startIndex = Math.max(_startIndex, 0);
    let count = 0;
    if (maxCount < 0) return null;
    for (
      let index = startIndex;
      step > 0 ? index <= maxIndex : index >= 0;
      index += step
    ) {
      if (index < this._thresholdIndexValue) continue;
      const recyclerType = this._getType(index);

      // itemLayout should not be a condition, may cause too many unLayout item
      if (count < maxCount) {
        const buffer = this.ensureBuffer(recyclerType);
        buffer.place(index, safeRange);
      } else {
        break;
      }

      if (index >= this._thresholdIndexValue) count++;
    }
  }

  getMinValue() {
    let minValue = Number.MAX_SAFE_INTEGER;
    this._queue.forEach((buffer) => {
      const v = buffer.getMinValue();
      if (typeof v === 'number') minValue = Math.min(v, minValue);
    });
    return minValue;
  }

  getMaxValue() {
    let maxValue = 0;
    this._queue.forEach((buffer) => {
      const v = buffer.getMaxValue();
      if (typeof v === 'number') maxValue = Math.max(v, maxValue);
    });
    return maxValue;
  }
}

export default Recycler;

// const origin = [163, 168, 142, 147, 152, 173, 178, 137, 157, 162]

// const target = [163, 163, 142, 147, 152, 168, 173, 137, 157]

// const next = [168, 168, 142, 147, 152, 173, 178, 137, 157, 162]

// Next Sample
// const origin = [35, 36, 37, 38, 39, 40, 41, 32, 33, 34]
// const target = [35, 36, 37, 36, 37, 40, 41, 32, 33, 34]
// const target = [35, 38, 39, 38, 39, 40, 41, 32, 33, 34]
