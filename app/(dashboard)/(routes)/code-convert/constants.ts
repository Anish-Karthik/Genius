import * as z from 'zod';

export const formSchema =  z.object({
  prompt: z.string().min(1, {
    message: 'Prompt is required'
  }),
  // inputLang must be from programmingLanguages
  inputLang: z.string().min(1, {
    message: 'Input Language is required'
  }),
  // outputLang must be from programmingLanguages
  outputLang: z.string().min(1, {
    message: 'Output Language is required'
  }),
});
export const programmingLanguages = [
  "C",
  "C++",
  "C#",
  "Java",
  "JavaScript",
  "Python",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "TypeScript",
  "Swift",
  "Kotlin",
  "Scala",
  "Perl",
  "Objective-C",
  "Pascal",
  "Fortran",
  "COBOL",
  "Ada",
  "Haskell",
  "Clojure",
  "Elixir",
  "Erlang",
  "F#",
  "Dart",
  "Julia",
  "Lua",
  "R",
];
