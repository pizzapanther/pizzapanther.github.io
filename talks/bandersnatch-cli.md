---
title: Python CLI Bandersnatch
tags: Talk
description: Presentation about Python CLI libraries
slideOptions:
  theme: night

---

# Python CLI Bandersnatch

By Paul Bailey

---

## Choose Your Own Adventure

Python Command Line Libraries:

- [argparse](https://docs.python.org/3/library/argparse.html)
- [click](https://click.palletsprojects.com/en/7.x/)
- [fire](https://google.github.io/python-fire/)
- Maybe a bonus!!

**Vote at: [ppp.wtf/cli](https://ppp.wtf/cli)**

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/1/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/3">Cart Wheel</a> - <a href="#/5">About Me</a>
</div>

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/2/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/4">Yes</a> - <a href="#/5">No</a>
</div>

---

### This isn't Black Mirror

<iframe src="https://giphy.com/embed/3oriNZGGY2eNlwj2sE" width="480" height="267" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

<div style="font-size: 40%;">
<a href="#/6">Next &raquo;</a>
</div>

---

## About Me

- @PizzaPanther (Twitter, Github, etc)
- System Architect @ CognitiveSpace.com

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/3/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/7">argparse</a> - <a href="#/9">click</a> - <a href="#/11">fire</a>
</div>

---

## Intro to Argparse

https://docs.python.org/3/library/argparse.html

<div style="text-align: left">

Pros:

- Easier to use
- Included in the standard library
- Used very often

Cons:

- Not so elegant

</div>

---

### Sample Argparse

```python
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
```

<div style="font-size: 40%;">
<a href="#/13">argparse done</a> - <a href="#/9">click left</a> - <a href="#/11">fire left</a> - <a href="#/16">all done</a>
</div>

---

## Intro to Click

https://click.palletsprojects.com/en/7.x/

<div style="text-align: left">

Pros:

- Easy to use decorators
- Loads of tools!
- Very flexible for many uses cases

Cons:

- Lots of decorators
- Loads of tools to learn

</div>

---

### Sample Click

```python
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
```

<div style="font-size: 40%;">
<a href="#/14">click done</a> - <a href="#/7">argparse left</a> - <a href="#/11">fire left</a> - <a href="#/16">all done</a>
</div>

---

### Intro to Fire

https://google.github.io/python-fire/

<div style="text-align: left">

Pros:

- Easiest to use
- Make a CLI out of any Python code

Cons:

- Non-standard CLI usage
- Fewer standard features

</div>

---

### Fire Example

```python
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
```

<div style="font-size: 40%;">
<a href="#/15">fire done</a> - <a href="#/7">argparse left</a> - <a href="#/9">click left</a> - <a href="#/16">all done</a>
</div>

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/4/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/9">click</a> - <a href="#/11">fire</a>
</div>

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/5/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/7">argparse</a> - <a href="#/11">fire</a>
</div>

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/6/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/7">argparse</a> - <a href="#/9">click</a>
</div>

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/7/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/23">sub-commands</a> - <a href="#/17">click</a> - <a href="#/25">fire</a>
</div>

---

### Click Subcommands

```python
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
```

---

### Click Types

<div style="font-size: 70%">

https://click.palletsprojects.com/en/7.x/parameters/#parameter-types

</div>

```python
@click.option(
  '--cert',
  type=click.Path(exists=True, dir_okay=False),
  default=None
)
```

---

### Click ENVs

<div style="font-size: 70%">

https://click.palletsprojects.com/en/7.x/arguments/#environment-variables

</div>

```python
@click.argument(
  'src',
  envvar='SRC',
  type=click.File('r')
)
```

---

### Click Colors

```python
click.echo(
  click.style('Hello World!', fg='green')
)
```

---

![](https://i.imgur.com/nPCauFX.jpg)

---

### More Click

https://click.palletsprojects.com/en/7.x/utils/

- Clear screen
- Getting characters
- Waiting for keypress
- Launching editors, applications
- Progress bars
- and More!

<div style="font-size: 40%;">
<a href="#/30">Questions/Comments &raquo;</a>
</div>

---

### Argparse subcommands

```python=
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

```

---

### Click Subcommands

```python
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
```

---

### Fire subcommands (Functional)

```python=
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
```

---

### Fire subcommands (Class)

```python=
import fire

class Greet:
  def howdy(self, names, times=1):
    self._greet('Howdy', names, times=times)

  def hello(self, names, times=1):
    self._greet('Hello', names, times=times)

  def all(self, names, times=1):
    self.hello(names, times=times)
    self.howdy(names, times=times)

  def _greet(self, greeting, names, times=1):
    for name in names:
      for i in range(0, times):
        print(f'{greeting} {name}')

if __name__ == "__main__":
  fire.Fire(Greet)

```

---

<iframe width="100%" height="500" src="https://www.ppp.wtf/embed/cli/8/" frameborder="0" style="border: 0"></iframe>

<div style="font-size: 40%;">
<a href="#/28">Argparse</a> - <a href="#/29">Docopt</a>
</div>

---

### More Argparse

<div style="text-align: left; font-size: 90%;">

Number of Args: https://docs.python.org/3/library/argparse.html#nargs

Actions: https://docs.python.org/3/library/argparse.html#action

File Types:
```python
parser.add_argument('out', type=argparse.FileType('w'))
```
</div>
<br>
<div style="font-size: 40%;">
<a href="#/30">Questions/Comments &raquo;</a>
</div>

---

### Bonus: Docopt

http://docopt.org/

```python=
"""Naval Fate.

Usage:
  naval_fate.py ship new <name>...
  naval_fate.py ship <name> move <x> <y> [--speed=<kn>]
  naval_fate.py ship shoot <x> <y>
  naval_fate.py mine (set|remove) <x> <y> [--moored | --drifting]
  naval_fate.py (-h | --help)
  naval_fate.py --version

Options:
  -h --help     Show this screen.
  --version     Show version.
  --speed=<kn>  Speed in knots [default: 10].
  --moored      Moored (anchored) mine.
  --drifting    Drifting mine.

"""
from docopt import docopt


if __name__ == '__main__':
    arguments = docopt(__doc__, version='Naval Fate 2.0')
    print(arguments)
```

---

## Comments and Questions

<iframe src="https://giphy.com/embed/lz67zZWfWPsWnuGH0s" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

Examples on [Github](https://github.com/pizzapanther/pizzapanther.github.io/tree/master/talks/cli-examples)
