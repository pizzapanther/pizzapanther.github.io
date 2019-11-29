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
