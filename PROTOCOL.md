# cache.lot

## set
To set the parameter, use the design
```
byte set key=value
```
example
```
14 set foo=bar
```
First - the length of the entire line
Second - after a space command set
Third - key equals value (spaces are possible)

Requst
```
OK!
```

## get
To get the parameter, use the desing
```
byte get key
```
example
```
9 get foo
```
First - the length of the entire line
Second - after a space command get
Third - and through the following space a key

Requst
```
5 bar
```
First - The length
Second - value

## show
To receive all registered keys
```
byte show
```

example
```
5 show
```

Request
```
5 foo
```
First - the length
Second - all keys separated by commas

## del
delete by change
```
byte del value
```
First - the length of the entire line
Second - after a space command del
Third - and through the following space a key

example
```
9 del foo
```

## die
delete timer
```
byte die value=time
```
First - the length of the entire line
Second - after a space command die
Third - and through the following space a key
Four - time in seconds to the end of a variable's life

example
```
13 die foo=30
```