#!/usr/bin/env python

import fire

def hello(names, times=1, enable_texas=False):
  greeting = 'Hello'
  if enable_texas:
    greeting = 'Howdy'

  for name in names:
    for i in range(0, times):
      print(f'{greeting} {name}')

if __name__ == "__main__":
  fire.Fire(hello)
