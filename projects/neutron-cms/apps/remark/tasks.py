import os

from django.template import Context, Template
from django.template.loader import render_to_string

def run ():
  base = '/home/paul/code/monolith/projects/personal-site'
  slide_template = 'slides.html'
  folder = 'talks'
  file = 'dc-welcome.md'
  outdir = '/home/paul/code/monolith'
  
  infile = os.path.join(base, folder, file)
  
  print('Found: {}'.format(infile))
  with open(infile, 'r') as fh:
    md_content = fh.read()
    
  template = Template(md_content)
  context = Context({})
  content = template.render(context)
  
  rendered = render_to_string(slide_template, {'content': content})
  
  outfile = file.replace('.md', '.html')
  outpath = os.path.join(outdir, folder, outfile)
  with open(outpath, 'w') as fh:
    fh.write(rendered)
    
  print('Created: {}'.format(outpath))
  