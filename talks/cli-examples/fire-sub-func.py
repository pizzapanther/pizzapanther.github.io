#!/usr/bin/env python

import fire

def howdy(names, times=1):
  _greet('Howdy', names, times=times)

def hello(names, times=1):
  _greet('Hello', names, times=times)

def all(names, times=1):
  hello(names, times=times)
  howdy(names, times=times)

def _greet(greeting, names, times=1):
  for name in names:
    for i in range(0, times):
      print(f'{greeting} {name}')

if __name__ == "__main__":
  fire.Fire()
