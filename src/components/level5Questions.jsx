const questions = [
  {
    q: "If x + y = 10 and x − y = 4, then what are x & y? (format: x = __, y = __) where x>y",
    a: "x = 7, y = 3",
    type: "Logic"
  },
  {
    q: "Statements: All dogs are animals. Some animals are cats.\nConclusions:\n(1) Some dogs are cats.\n(2) All cats are animals.\nWhich conclusion follows?",
    a: "2",
    type: "Reasoning"
  },
  {
    q: "Complete the series: 2, 6, 12, 20, 30,?",
    a: "42",
    type: "Reasoning"
  },
  {
    q: "Fill in the blank: AZ, BY, CX, DW,?",
    a: "EV",
    type: "Reasoning"
  },
  {
    q: "A is the son of B. B is the father of C. C is the sister of D. How is A related to D?",
    a: "Brother",
    type: "Reasoning"
  },
  {
    q:"Python – Recursion Logic:\n\ndef factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial()\n\nprint(factorial(4)) # Output: 24\n\nFill in the blank to complete the recursive logic.",
    a: "n - 1",
    type: "Coding"
  },
  {
    q: "C – Pointer Arithmetic:\n\n#include <stdio.h>\nint main() {\n    int a = 10;\n    int *p = &a;\n    *p = *p + 5;\n    printf(\"%d\", a); // Output: ____\n    return 0;\n}\n\nWhat will be printed?",
    a: "15",
    type: "Coding"
  },
  {
    q: "Python – List Modification:\n\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a) # Output: ____",
    a: "[1, 2, 3, 4]",
    type: "Coding"
  },
  {
    q:" Fill in the blanks to calculate the square of a number:\n\n#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    int result = _____;\n    return 0;\n}",
    a: "n*n",
    type: "Coding"
  },
  {
    q: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 3, b = 4;\n    cout << a + b * 2;\n    return 0;\n}",
    a: "11",
    type: "Coding"
  },
  {
    q: "for i in ______:  # Fill here\n    print(i, end=\" \")",
    a: "range(1, 6)",
    type: "Coding"
  },
  {
    q: "#include <iostream>\nusing namespace std;\n\nint main() {\n    string s = \"abcde\";\n    cout << s.substr(1, 3);\n    return 0;\n}",
    a: "bcd",
    type: "Coding"
  },

  // New questions
  {
    q: "What is the shortcut to \"redo\"?",
    a: "Ctrl + Y",
    type: "General"
  },
  {
    q: "What comes next: 1, 1, 2, 3, 5, 8, ___?",
    a: "13",
    type: "Reasoning"
  },
  {
    q: "What does DBMS stand for?",
    a: "Database Management System",
    type: "Tech"
  },
  {
    q: "What comes next in this code pattern?\n\nprint(\"1\")\nprint(\"22\")\nprint(\"333\")\nprint(\"4444\")\n?",
    a: 'print("55555")',
    type: "Coding"
  },
  {
    q: "< > < > < > < __ ?\nWhat comes next?",
    a: ">",
    type: "Logic"
  },
  {
    q: "I’m a five-letter word. Remove my first letter, and I sound the same. Remove the last letter, I still sound the same. Even if you remove the middle letter, still same! What am I?",
    a: "Empty",
    type: "Riddle"
  },
  {
    q: "Unscramble this tech word: EATDBAAS",
    a: "Database",
    type: "Tech"
  },
  {
    q: "Forward I’m heavy, but backward I’m not. What am I?",
    a: "Ton",
    type: "Riddle"
  }
];

export default questions;