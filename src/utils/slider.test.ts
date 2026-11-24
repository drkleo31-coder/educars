import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampPercentage,
  calculateSliderPercentage,
  stepSliderPercentage,
} from './slider';

test('clampPercentage clamps values between 0 and 100 and handles NaN', () => {
  assert.equal(clampPercentage(-12), 0);
  assert.equal(clampPercentage(135), 100);
  assert.equal(clampPercentage(42.34), 42.3);
  assert.equal(clampPercentage(Number.NaN), 50);
});

test('calculateSliderPercentage computes accurate percentage inside container bounds', () => {
  assert.equal(calculateSliderPercentage(250, 100, 300), 50);
  assert.equal(calculateSliderPercentage(100, 100, 300), 0);
  assert.equal(calculateSliderPercentage(400, 100, 300), 100);
  assert.equal(calculateSliderPercentage(50, 100, 300), 0);
  assert.equal(calculateSliderPercentage(500, 100, 300), 100);
  assert.equal(calculateSliderPercentage(150, 100, 0), 50);
});

test('stepSliderPercentage respects bounds on keyboard steps', () => {
  assert.equal(stepSliderPercentage(50, 5), 55);
  assert.equal(stepSliderPercentage(98, 5), 100);
  assert.equal(stepSliderPercentage(3, -5), 0);
});
