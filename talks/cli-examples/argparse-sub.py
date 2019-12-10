#!/usr/bin/env python

import argparse

def howdy(args):
  _greet('Howdy', args.names, times=args.times)

def hello(args):
  _greet('Hello', args.names, times=args.times)

def all(args):
  hello(args)
  howdy(args)

def _greet(greeting, names, times=1):
  for name in names:
    for i in range(0, times):
      print(f'{greeting} {name}')

if __name__ == "__main__":
  parser = argparse.ArgumentParser(prog='PROG')
  parser.add_argument('--times', help='number of hellos', type=int, default=1)
  subparsers = parser.add_subparsers(help='sub-command help', dest='command')

  parser_hello = subparsers.add_parser('hello', help='say hello')
  parser_howdy = subparsers.add_parser('howdy', help='say howdy')
  parser_all = subparsers.add_parser('all', help='say hello and howdy')

  for p in (parser_hello, parser_howdy, parser_all):
    p.add_argument('names', nargs='+', help='names to say hello')

  args = parser.parse_args()
  globals()[args.command](args)
