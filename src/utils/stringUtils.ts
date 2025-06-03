/**
 * Converts a string to camelCase
 * @param str - The string to convert
 * @returns The camelCased string
 *
 * @example
 * toCamelCase('hello world') // returns 'helloWorld'
 * toCamelCase('Hello World') // returns 'helloWorld'
 * toCamelCase('hello-world') // returns 'helloWorld'
 * toCamelCase('hello_world') // returns 'helloWorld'
 */
export const toCamelCase = (str: string): string => {
  return (
    str
      // Replace any non-word characters with spaces
      .replace(/[^a-zA-Z0-9]+/g, " ")
      // Split into words
      .split(" ")
      // Convert each word to lowercase
      .map((word, index) => {
        if (index === 0) {
          // First word is all lowercase
          return word.toLowerCase();
        }
        // Other words are capitalized
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      // Join words together
      .join("")
  );
};

/**
 * Converts a string to PascalCase
 * @param str - The string to convert
 * @returns The PascalCased string
 *
 * @example
 * toPascalCase('hello world') // returns 'HelloWorld'
 * toPascalCase('hello-world') // returns 'HelloWorld'
 * toPascalCase('hello_world') // returns 'HelloWorld'
 */
const toPascalCase = (str: string): string => {
  return (
    str
      // Replace any non-word characters with spaces
      .replace(/[^a-zA-Z0-9]+/g, " ")
      // Split into words
      .split(" ")
      // Capitalize each word
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      // Join words together
      .join("")
  );
};

/**
 * Converts a string to kebab-case
 * @param str - The string to convert
 * @returns The kebab-cased string
 *
 * @example
 * toKebabCase('hello world') // returns 'hello-world'
 * toKebabCase('HelloWorld') // returns 'hello-world'
 * toKebabCase('hello_world') // returns 'hello-world'
 */
const toKebabCase = (str: string): string => {
  return (
    str
      // Replace any non-word characters with spaces
      .replace(/[^a-zA-Z0-9]+/g, " ")
      // Split into words
      .split(" ")
      // Convert each word to lowercase
      .map((word) => word.toLowerCase())
      // Join words with hyphens
      .join("-")
  );
};

/**
 * Converts a string to snake_case
 * @param str - The string to convert
 * @returns The snake_cased string
 *
 * @example
 * toSnakeCase('hello world') // returns 'hello_world'
 * toSnakeCase('HelloWorld') // returns 'hello_world'
 * toSnakeCase('hello-world') // returns 'hello_world'
 */
const toSnakeCase = (str: string): string => {
  return (
    str
      // Replace any non-word characters with spaces
      .replace(/[^a-zA-Z0-9]+/g, " ")
      // Split into words
      .split(" ")
      // Convert each word to lowercase
      .map((word) => word.toLowerCase())
      // Join words with underscores
      .join("_")
  );
};
