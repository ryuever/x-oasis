import IntegerBufferSet, { defaultBufferSize } from '../src';
import { describe, it, expect } from 'vitest';

describe('basic', () => {
  it('constructor', () => {
    const bufferSet = new IntegerBufferSet();
    expect(bufferSet.getSize()).toBe(0);
    expect(bufferSet.isBufferFull).toBe(false);
    expect(bufferSet.bufferSize).toBe(defaultBufferSize);
  });

  it('no safeRange', () => {
    const bufferSet = new IntegerBufferSet();
    expect(bufferSet.getPosition(0)).toBe(0);
    expect(bufferSet.getPosition(1)).toBe(1);
    expect(bufferSet.getPosition(2)).toBe(2);
    expect(bufferSet.getPosition(3)).toBe(3);
    expect(bufferSet.getPosition(4)).toBe(4);
    expect(bufferSet.getPosition(5)).toBe(5);
    expect(bufferSet.getPosition(6)).toBe(6);
    expect(bufferSet.getPosition(7)).toBe(7);
    expect(bufferSet.getPosition(8)).toBe(8);
    expect(bufferSet.getPosition(9)).toBe(9);
    expect(bufferSet.getPosition(10)).toBe(0);
    expect(bufferSet.getPosition(11)).toBe(1);
  });
  it('no safeRange', () => {
    const bufferSet = new IntegerBufferSet();
    const safeRange = {
      startIndex: 0,
      endIndex: 7,
    };
    expect(bufferSet.getPosition(0, safeRange)).toBe(0);
    expect(bufferSet.getPosition(1, safeRange)).toBe(1);
    expect(bufferSet.getPosition(2, safeRange)).toBe(2);
    expect(bufferSet.getPosition(3, safeRange)).toBe(3);
    expect(bufferSet.getPosition(4, safeRange)).toBe(4);
    expect(bufferSet.getPosition(5, safeRange)).toBe(5);
    expect(bufferSet.getPosition(6, safeRange)).toBe(6);
    expect(bufferSet.getPosition(7, safeRange)).toBe(7);
    expect(bufferSet.getPosition(8, safeRange)).toBe(8);
    expect(bufferSet.getPosition(9, safeRange)).toBe(9);
    expect(bufferSet.getPosition(10, safeRange)).toBe(9);
    expect(bufferSet.getPosition(11, safeRange)).toBe(8);
  });

  it('place same item twice', () => {
    const bufferSet = new IntegerBufferSet();
    expect(bufferSet.getPosition(0)).toBe(0);
    expect(bufferSet.getPosition(1)).toBe(1);
    expect(bufferSet.getPosition(2)).toBe(2);
    expect(bufferSet.getPosition(3)).toBe(3);
    expect(bufferSet.getPosition(4)).toBe(4);
    expect(bufferSet.getPosition(5)).toBe(5);
    expect(bufferSet.getPosition(6)).toBe(6);
    expect(bufferSet.getPosition(7)).toBe(7);
    expect(bufferSet.getPosition(8)).toBe(8);
    expect(bufferSet.getPosition(9)).toBe(9);
    const safeRange = {
      startIndex: 1,
      endIndex: 6,
    };
    expect(bufferSet.getPosition(10, safeRange)).toBe(9);
    expect(bufferSet.getPosition(10, safeRange)).toBe(9);
    expect(bufferSet.getPosition(1, safeRange)).toBe(1);
  });

  it('safeRange - inner', () => {
    const bufferSet = new IntegerBufferSet();
    expect(bufferSet.getPosition(0)).toBe(0);
    expect(bufferSet.getPosition(1)).toBe(1);
    expect(bufferSet.getPosition(2)).toBe(2);
    expect(bufferSet.getPosition(3)).toBe(3);
    expect(bufferSet.getPosition(4)).toBe(4);
    expect(bufferSet.getPosition(5)).toBe(5);
    expect(bufferSet.getPosition(6)).toBe(6);
    expect(bufferSet.getPosition(7)).toBe(7);
    expect(bufferSet.getPosition(8)).toBe(8);
    expect(bufferSet.getPosition(9)).toBe(9);

    const safeRange = {
      startIndex: 1,
      endIndex: 6,
    };
    expect(bufferSet.getPosition(10, safeRange)).toBe(9);
    expect(bufferSet.getPosition(11, safeRange)).toBe(8);
    expect(bufferSet.getPosition(12, safeRange)).toBe(7);
    expect(bufferSet.getPosition(13, safeRange)).toBe(0);
    expect(bufferSet.getPosition(14, safeRange)).toBe(null);
    expect(bufferSet.getPosition(15, safeRange)).toBe(null);
    expect(bufferSet.getPosition(16, safeRange)).toBe(null);
    expect(bufferSet.getPosition(17, safeRange)).toBe(null);
    expect(bufferSet.getPosition(18, safeRange)).toBe(null);
  });

  it.only('safeRange - outside', () => {
    const bufferSet = new IntegerBufferSet();
    expect(bufferSet.getPosition(0)).toBe(0);
    expect(bufferSet.getPosition(1)).toBe(1);
    expect(bufferSet.getPosition(2)).toBe(2);
    expect(bufferSet.getPosition(3)).toBe(3);
    expect(bufferSet.getPosition(4)).toBe(4);
    expect(bufferSet.getPosition(5)).toBe(5);
    expect(bufferSet.getPosition(6)).toBe(6);
    expect(bufferSet.getPosition(7)).toBe(7);
    expect(bufferSet.getPosition(8)).toBe(8);
    expect(bufferSet.getPosition(9)).toBe(9);

    const safeRange = {
      startIndex: 5,
      endIndex: 14,
    };
    expect(bufferSet.getPosition(4)).toBe(4);
    expect(bufferSet.getPosition(5)).toBe(5);
    expect(bufferSet.getPosition(6)).toBe(6);
    expect(bufferSet.getPosition(7)).toBe(7);
    expect(bufferSet.getPosition(8)).toBe(8);
    expect(bufferSet.getPosition(9)).toBe(9);
    expect(bufferSet.getPosition(10, safeRange)).toBe(0);
    expect(bufferSet.getPosition(11, safeRange)).toBe(1);
    expect(bufferSet.getPosition(12, safeRange)).toBe(2);
    expect(bufferSet.getPosition(13, safeRange)).toBe(3);
    expect(bufferSet.getPosition(14, safeRange)).toBe(4);
    expect(bufferSet.getPosition(15, safeRange)).toBe(null);
    expect(bufferSet.getPosition(16, safeRange)).toBe(null);
    expect(bufferSet.getPosition(17, safeRange)).toBe(null);
    expect(bufferSet.getPosition(18, safeRange)).toBe(null);
  });
});
