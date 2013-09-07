#!/bin/bash

# Do not include trailing slashes

case "${u}" in
    "yourname")
	    project_directory='c:/xampp/htdocs/github/js.sh/sample'     # Root of project directory - useful for different developers who might have things set up differently
	    path_to_closure_compiler='c:/cmdtools/closurecompiler'      # Location of compiler.jar on your system
	    path_to_js_temp='c:/temp/.js-tmp'                           # Where to store tmp files created during combination/compression
	    ;;
    "anotherdevelopername")
	    project_directory='/path/to/project/directory'
	    path_to_closure_compiler='/path/to/closure/compiler'
	    path_to_js_temp='/path/to/js/temp'
	    ;;
esac

path_to_js_source="${project_directory}/public/js"
path_to_js_compiled="${project_directory}/public/js/compiled"

# This could also be an absolute URL
# It's only used when outputting to js.php
web_path_to_js="/github/js.sh/sample/public/js/compiled"	# Usually this will just be "/js/compiled"