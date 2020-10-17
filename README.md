
## Summary
Javascript (Node.js) template to solve google [kick-start competition](https://codingcompetitions.withgoogle.com/kickstart) problems.

- Reading data synchronously from console
- Printing results
- webassembly helper functions

## Functions
- readLine
- readArray
- readIntArray
- printResult
- mulMod(a,b) // 64bit modulo 10^9+7
- expMod(a,b) // 64bit modulo 10^9+7
- divMod(a,b) // 64bit modulo 10^9+7
- intDiv(a,b) // 64bit integer division

## How to use
* Copy/paste content of [compete.js](https://github.com/makannew/kick-start-helpers/blob/master/build/compete.js) in the code window 
* Write your code at the end of the codes inside the provided `for` loop

## Motivation
It is realy hard to attend in this coding competition with Javacript. Main problem is reading data from node.js console happens asynchronously, so to solve a simple problem, competitor needs to deal with a complex async/callback pattern to just read the data. Also there are some additional javascript limitations like maximum 53bits for aritmatic operations, there is bigInt type in javascript but is not fast enough for a competition.

This prevents competitors using javascript for this competition. However, I believe if this non-relevant problem fixed, taking advantage of a rich high-level language like Javascript can potentially leed to a winning strategy.


<br/>


## License

MIT © [makannew](https://github.com/makannew)
