{% load static %}
class: inverse, spaced
layout: true
background-image: url({% static "img/nac.svg" %})

---

class: middle, center

# Exiting Vim On A Touch Screen

## Making Android Linux Your Development Environment

[bit.ly/termux-dev-talk](https://bit.ly/termux-dev-talk)

---

# About Me

- Fullstack Developer @ [SaltStack](https://saltstack.com/)
- Creator of  [Neutron64](https://www.neutron64.com/) Code Editor
- Twitter: [@PizzaPanther](https://twitter.com/pizzapanther)

---

class: middle, center

# What the What?

## Today's Topic:<br>Using Termux as a development environment.

https://termux.com/

---

class: middle, center

# What is Termux?

Termux is an **Android** terminal emulator and **Linux environment** app that works directly with no rooting or setup required. A minimal base system is installed automatically; Additional packages are available using the APT package manager.

That means: A Linux environment is available on all Android devices.

---

class: middle, center

# But Why?!?!

<iframe src="https://giphy.com/embed/13yTWxNez02T2o" width="480" height="304" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/nickelodeon-13yTWxNez02T2o">via GIPHY</a></p>

---

class: middle, center

# What was your first Linux experience?

---

class: middle, center

# It's Not as Bad as You Think

&bull; Android now runs on Chromebooks

&bull; Pair a keyboard with a phone or tablet

&bull; Easiest way to install Linux today

---

class: middle, center

# Install Time

<iframe src="https://giphy.com/embed/9Wh7TNThCgWti" width="480" height="361" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/food-pizza-9Wh7TNThCgWti">via GIPHY</a></p>

---

class: middle, center

# It's Linux But:

&bull; Android Linux<br>
&bull; In a Container

<img src="{% static "img/talks/termux-adjustments.jpg" %}" alt="Adjustment Meme" style="width: 400px;">

---

# Where's Everything?

## The Termux Filesystem

```
/data/data/com.termux/files/

    home/
    
    usr/
```

---

# Problem 1: Non-Standard Paths

Everything in the world is hard coded to `/bin/bash` or other standard tools and locations.

Solutions:

- Use the Termux package
- Fix the source code yourself
- Fix paths automagically
    - [termux_exec](https://wiki.termux.com/wiki/Termux-exec): now installed by default
- Fix all the paths: Chroot Jails
    - [PRoot](https://wiki.termux.com/wiki/PRoot)
    - [Termux Chroot Script](https://github.com/Neo-Oli/chrooted-termux)

---

# Chroot Jail

Wikipedia: https://en.wikipedia.org/wiki/Chroot

an operation that changes the apparent root directory for the current running process and its children. A program that is run in such a modified environment cannot name (and therefore normally cannot access) files outside the designated directory tree. The term "chroot" may refer to the chroot(2) system call or the chroot(8) wrapper program. The modified environment is called a chroot jail.

---

class: middle, center

# Problem 2: One User to Rule Them All

<iframe src="https://giphy.com/embed/Jx8BU2Ofy1W1y" width="480" height="261" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/highlander-ramirez-conor-macleod-Jx8BU2Ofy1W1y">via GIPHY</a></p>

---

# Problem 2: One User to Rule Them All

Not so much a problem as a shift you need to get used to.

- Services won't auto start
- You can't modify the base system
    - if needed use a chroot

---

# Problem 2: One User to Rule Them All

Sample start and stop:

```
# Postgres
pg_ctl -D $PREFIX/var/lib/postgresql start
pg_ctl -D $PREFIX/var/lib/postgresql stop

# Nginx
nginx
nginx -s stop

# Redis
redis-server $PREFIX/etc/redis.conf
kill "$("$PREFIX/bin/applets/cat" "$PREFIX/var/run/redis_6379.pid")"
```

---

# Problem 3: Broken Dependencies

Termux runs on the Android Linux kernel which has is not compiled like typical kernels and may be missing some things you're used to.

- My big problem: missing named semaphores
    - Dependency for Python multi-processing
- Other problems: [Common Porting Problems](https://github.com/termux/termux-packages/blob/master/README.md#common-porting-problems)

Solutions:

- Switch source code to Android alternative
- Find an alternate method
    - Python web server `uWsgi` -> `gunicorn`

---

# Using Termux Everyday

-  [Using a touch keyboard](https://termux.com/touch-keyboard.html)
-  [Using a hardware keyboard](https://termux.com/hardware-keyboard.html)
-  Editors
    -  vim
    -  emacs
    -  nano
    -  [Neutron64](https://www.neutron64.com/)

---

class: middle, center

<iframe src="https://giphy.com/embed/3o6ZthWzyoIzSknltu" width="240" height="135" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>

**Project Crostini from Google**

&bull; Linux on ChromeOS<br>
&bull; Right now only available in dev channel<br>
&bull; Limited to Chromebooks<br>
