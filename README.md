js.sh
=====

A simple command line tool for combining and compressing JavaScript files into 25kb chunks.

I created js.sh for a personal project because all of the similar tools I could find seemed a bit too heavy for what I needed.  That said, `js.sh` does have some cool features:

* Easily configurable for your environment with `config.sh`
* Combines JS files in the order you specify in script_order.txt
* Compresses them with Google's Closure Compiler
* Splits JS files into <25kb chunks where possible (iPhones won't cache anything over 25kb)
* Generates a PHP file with `script` tags that you can include where appropriate -- just write your JS, use js.sh, and don't worry about anything else.  If you don't like PHP it's simple to change the output.

Usage
-----
1.  Set up your paths in `config.sh`
2.  Create a `compiled` directory in your `js` folder if you choose to go with the default config
3.  Create a `script_order.txt` file in your `js` directory and write the name of each script you want to include in the order in which you want to include it, separating each script by a space.  Example: 
    ```
    script.js anotherscript.js path/to/thirdscript.js
    ```
4.  `cd` to the directory where `js.sh` resides
5.  Run `js.sh -u yourname`

Dependencies
------------
Google's [Closure Compiler](http://closure-compiler.googlecode.com/files/compiler-latest.zip), which requires Java.

To Do
-----
* I'm running Windows.  This should be tested on other systems.
* I'm also new to bash.  I probably did a lot of dumb things that should probably be fixed.
* Each JS file is separately compressed then stitched together.  It would nice to stitch all JS into one huge file, compress that, then intelligently split the result into 25kb chunks.
* Files >25kb after compression are simply left as is.  It would be nice to split these.
* I'd like for js.sh to watch for changes to the files in script_order.txt and run whenever a change is made.  This would have to be functional cross-platform.
* Please fork this repo and help out!
