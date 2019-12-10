#!/usr/bin/env python

import click

@click.group()
@click.option('--times', default=1, help='number of hellos')
@click.pass_context
def cli(context, times):
  context.obj['times'] = times

def greet(context, greeting, names):
  for name in names:
    for i in range(0, context.obj['times']):
      print(f'{greeting} {name}')

@cli.command()
@click.pass_context
@click.argument('names', nargs=-1)
def hello(context, names):
  greet(context, 'Hello', names)

@cli.command()
@click.pass_context
@click.argument('names', nargs=-1)
def howdy(context, names):
  greet(context, 'Howdy', names)

@cli.command()
@click.pass_context
@click.argument('names', nargs=-1)
def all(context, names):
  context.forward(hello)
  context.forward(howdy)

if __name__ == "__main__":
  cli(obj={})
