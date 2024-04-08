# 24S Lab 2: Buzzfeed Quiz - Ben Sheldon

*A quiz to determine which F1 team you'd drive for! I chose the JS Development Route (making the quiz customizable by reading from a json file).*

[deployed url](https://lab2-quizapp-b-sheldon.onrender.com/)

## What Worked Well
Using my skills learned in Lab 1 made it pretty easy to create the initial shell and hard-coded version of the quiz! Aside from a few challenges with getting the layout of the different flex boxes working, it went pretty smoothly! I also used a more modular approach than before, creating some classes that I applied to a lot of different elements, instead of repeating a lot of the same attributes across different elements. This helped make my CSS more efficient and readable.

## What Didn't
Jumping into the JavaScript was definitely a challenge! As this is my first experience using JS, there were a lot of unknowns with how to read in data from the .json, and how to add to the html/css. Additionally, I was stuck for a long time because I didn't realize that I had to create a local server to change the index.html file using JS (because Chrome isn't allowed to navigate my files, which makes sense!). After getting used to the flow, development went a lot more smoothly.

## Extra Credit
Added extra customizability to the quiz, including:
-   Custom weighting for each question (a creator can put a custom weight into the json for each question, which will be used in the final calculation).
-   Ability to change the text-color for the header and for each question, with a default provided.
-   Ability to provide a custom image for each question, with a default solid-color window provided.
-   **Extra credit question** (add to submission comment): why might it be better for this to be placed at the bottom rather than in <head> ... </head>?
-   **Answer:** It gives the HTML time to load before the JavaScript loads,
    which can prevent some errors. It also improves the rendering speed
    of the page because the HTML loads before all of the JS, so nothing
    has to wait for code execution to load.

## Screenshots
