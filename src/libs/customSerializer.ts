import { JsonSerializer, logError, throwError } from 'typescript-json-serializer';

// Instantiate a default serializer
const defaultSerializer = new JsonSerializer();

// Or you can instantiate a serializer with your custom options
const customSerializer = new JsonSerializer({
    // Throw errors instead of logging
    errorCallback: logError,

    // Allow all nullish values
    nullishPolicy: {
        undefined: 'allow',
        null: 'allow'
    },

    // Disallow additional properties (non JsonProperty)
    additionalPropertiesPolicy: 'allow',

    // e.g. if all the properties in the json object are prefixed by '_'
    formatPropertyName: (propertyName: string) => `_${propertyName}`,
})

export { customSerializer, defaultSerializer };
