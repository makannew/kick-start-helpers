
## Summary
It provides a way to solve google [kick-start competition](https://codingcompetitions.withgoogle.com/kickstart) problems with Javascript.
- Reading data synchronously from console
- Printing results
- Abstract interface to solve data-structure problems

## Functions
- readLine
- readArray
- readIntArray
- printResult
- findData
- depict
- buildData
- buildShape
- analyze
- iterate
- isEqual
- permute

## How to use
* Copy/paste content (except export module part) of [index.js](https://github.com/makannew/kick-start-helpers/blob/master/src/index.js) in the code window 
* Copy/paste content of [template.js](https://github.com/makannew/kick-start-helpers/blob/master/src/template.js) in the code window
* Write your code inside the provided `for` loop

## Goal
My main goal is building few functions to solve data-structure problems in an abstract way close to human thinking pattern. Then If it is possible to solve all past competition problems through these functions I can conclude that they will useful for comming problems as well. These functions should have some features to be more effective:
- Fewer number of functions
- Easy to remember and use
- No overlap or redundant
- Use consistent interface
- Cover wide range of proplems
- Collaborate and combine together to become more powerfull and thorough

## Motivation
It is realy hard to attend in this coding competition with Javacript. Main problem is reading data from node.js console happens asynchronously, so to solve a simple problem, competitor needs to deal with a complex async/callback pattern to just read the data. 

This problem push most competitors towards low-level languages like C++. However, I believe if this non-relevant problem fixed, taking advantage of a rich high-level language like Javascript can potentially leed to a winning strategy.

## P.S.
After I tried round D of Google KS, I realized that still traditional coding tricks are more useful than helper functions! However, the boilerplate and console synchronous reader work perfectly well and they are essential if we want to write code in Javascript.

<br/>


## License

MIT © [makannew](https://github.com/makannew)
