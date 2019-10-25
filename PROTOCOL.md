#cache.lot

##set
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

##get
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

##show
To receive all registered keys
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
