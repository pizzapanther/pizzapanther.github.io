#!/usr/bin/env python

import click

@click.command()
@click.argument('names', nargs=-1)
@click.option('--times', default=1, help='number of hellos')
@click.option('--enable-texas', is_flag=True)
def hello(names, times, enable_texas):
  greeting = 'Hello'
  if enable_texas:
    greeting = 'Howdy'

  for name in names:
    for i in range(0, times):
      print(f'{greeting} {name}')

if __name__ == "__main__":
  hello()
