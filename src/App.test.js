import React from 'react';
import {render} from '@testing-library/react';
import Linear from './Linear';
import Binary from './Binary';


test('Binary render default 101 boxes', () => {
  const div = document.createElement('div');
  render(<Binary />, div);

  expect(document.getElementsByClassName('box').length).toBe(101);
});

test('Linear render default 11 boxes', () => {
  const div = document.createElement('div');
  render(<Linear />, div);
  expect(document.getElementsByClassName('box').length).toBe(11);
});

