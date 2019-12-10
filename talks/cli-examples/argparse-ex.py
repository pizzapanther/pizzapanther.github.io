#!/usr/bin/env python

import argparse

def hello(args):
  greeting = 'Hello'
  if args.enable_texas:
    greeting = 'Howdy'

  for name in args.names:
    for i in range(0, args.times):
      print(f'{greeting} {name}')

if __name__ == "__main__":
  parser = argparse.ArgumentParser()
  parser.add_argument('--times', help='number of hellos', type=int, default=1)
  parser.add_argument('--enable-texas', action='store_true')
  parser.add_argument('names', nargs='+', help='names to say hello')
  args = parser.parse_args()
  hello(args)
