#UITour Config

[![Build Status](https://travis-ci.org/alexgibson/uitour-config.png?branch=master)](https://travis-ci.org/alexgibson/uitour-config)

A Firefox add-on to configure UITour preferences for easier development, testing and debugging.

![](images/screenshot.png?raw=true)

##Contributing
Install jpm by following the [instructions on MDN](https://developer.mozilla.org/Add-ons/SDK/Tools/jpm#Installation).

Because Firefox 48 and above require add-on signing, development is recommended using an
[unbranded build](https://wiki.mozilla.org/Add-ons/Extension_Signing#Unbranded_Builds)
that allows installing unsigned add-ons.

To run the add-on:

```
jpm run -b /path/to/Firefox/Build
```

To run the tests:

```
jpm test -b /path/to/Firefox/Build
```
