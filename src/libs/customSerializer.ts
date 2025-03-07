import { JsonSerializer } from "typescript-json-serializer";

// Instantiate a custom serializer
const customSerializer = new JsonSerializer({
    // Throw errors instead of logging
    // errorCallback: throwError,

    // Allow all nullish values
    nullishPolicy: {
        undefined: 'remove',
        null: 'remove'
    },

    // Disallow additional properties (non JsonProperty)
    additionalPropertiesPolicy: 'disallow',

    // e.g. if all the properties in the json object are prefixed by '_'
    // formatPropertyName: (propertyName: string) => `_${propertyName}`,
});

export { customSerializer };
