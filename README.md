# Formlink

<!-- Describe a fullstack form helper library made using TypeScript -->

Certainly! Here's an example of API documentation for the `Handler` TypeScript class and the `Http` TypeScript class:

---

# API Documentation

## Handler Class

### Constructor

#### `new Handler(errors?: { [key: string]: any; } = {})`

Creates a new instance of the `Handler` class.

- **Parameters:**
    - `errors` (optional): An object representing error messages for different fields. Defaults to an empty object.

---

### Methods

#### `get(field: string): string | undefined`

Retrieves the first error message for a given field.

- **Parameters:**
    - `field`: The name of the field to retrieve the error message for.

- **Returns:** A string containing the first error message for the specified field, or `undefined` if no error is found.

#### `getAll(field: string): string[]`

Retrieves all error messages for a given field.

- **Parameters:**
    - `field`: The name of the field to retrieve error messages for.

- **Returns:** An array of strings containing all error messages for the specified field.

#### `has(field: string): boolean`

Checks if a field has an error.

- **Parameters:**
    - `field`: The name of the field to check for errors.

- **Returns:** `true` if the field has an error; otherwise, `false`.

#### `flatten(): any[]`

Flattens all error messages into a single array.

- **Returns:** An array containing all error messages from different fields.

#### `all(): object`

Retrieves all error messages as an object.

- **Returns:** An object containing error messages for different fields.

#### `record(errors: object): void`

Records error messages for different fields.

- **Parameters:**
    - `errors`: An object representing error messages for different fields.

#### `clear(field?: string): void`

Clears error messages for a specific field or all fields.

- **Parameters:**
    - `field` (optional): The name of the field to clear error messages for. If not provided, all error messages are cleared.

#### `any(): boolean`

Checks if there are any error messages in the handler.

- **Returns:** `true` if there are error messages; otherwise, `false`.

---

## Http Class

### Constructor

#### `new Http(client?: AxiosStatic)`

Creates a new instance of the `Http` class.

- **Parameters:**
    - `client` (optional): An optional custom Axios client instance.

---

### Methods

#### `createInstance(config?: object): AxiosInstance`

Creates a new AxiosInstance with merged configurations.

- **Parameters:**
    - `config` (optional): An object representing configuration options. These options will be merged with the default configuration.

- **Returns:** An AxiosInstance with the merged configurations.

#### `withOptions(config: object): Http`

Merges and updates the HTTP handler's configuration options.

- **Parameters:**
    - `config`: An object representing configuration options to merge with the existing configuration.

- **Returns:** The `Http` instance with updated configuration.

#### `acceptJson(): Http`

Sets the 'Accept' header to 'application/json'.

- **Returns:** The `Http` instance with the updated 'Accept' header.

#### `contentType(type?: string): Http`

Sets the 'Content-Type' header to the specified type. Defaults to 'application/json' if no type is provided.

- **Parameters:**
    - `type` (optional): The content type to set in the 'Content-Type' header.

- **Returns:** The `Http` instance with the updated 'Content-Type' header.

#### `baseUrl(url: string): Http`

Sets the default base URL in the configuration.

- **Parameters:**
    - `url`: The base URL to set in the configuration.

- **Returns:** The `Http` instance with the updated base URL.

#### `setToken(token?: string): Http`

Sets the 'Authorization' header with the provided token.

- **Parameters:**
    - `token` (optional): The token to set in the 'Authorization' header.

- **Returns:** The `Http` instance with the updated 'Authorization' header.

#### `withCredentials(): Http`

Sets the 'withCredentials' option in the configuration to accept credentials.

- **Returns:** The `Http` instance with the 'withCredentials' option enabled.

---

This API documentation provides an overview of the `Handler` and `Http` classes, their constructors, methods, parameters, and return values. It serves as a reference guide for developers using these classes in their projects.
