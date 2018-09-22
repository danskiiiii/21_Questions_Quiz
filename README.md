## 21_Questions_Quiz ## 

Simple VanillaJS app for testing your knowledge on a given subject. 

Polish language version.

21 questions are randomly selected after import from quiz_data.JSON file,

which consist of trivia questions about operating systems.

<a href=" https://danskiiiii.github.io/21_Questions_Quiz/">GitHub Pages link</a> 

### Quiz Rules ###

You will be awarded a point after answering correctly YES or NO to all 3 options for each question. 

Test is considered as passed if you manage to get over 50% score.

### Editing ###

Feel free to clone and modify it for your needs. 

Each JSON object must be an array of strings designed by this key:

question, optionA, optionB, optionC, A_(yes/no), B_(yes/no), C_(yes/no).

Example:
```
[
[ "France is located in", "Asia", "Europe", "Africa", "A_no", "B_yes", "C_no" ] ,
[ "Poland is located in", "Africa", "Asia", "Europe", "A_no", "B_no", "C_yes" ] 
]
```
