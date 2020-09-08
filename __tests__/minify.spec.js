const requestHook = require('..').requestHooks[0];

describe('JSON Minify', () => {
    it('should return a simple json payload', () => {
        const context = new ContextBuilder().withBody(JSON.stringify({testKey: "test value"})).build();

        requestHook(context);

        expect(context.request.getBodyText()).toBe("{\"testKey\":\"test value\"}");
    });

    it('should return multiline json as single string', () => {
        const multilineJson = JSON.stringify({key1: "value1", key2: [1, 2, 3]}, null, 2);
        const context = new ContextBuilder().withBody(multilineJson).build();

        requestHook(context);

        expect(context.request.getBodyText()).toBe("{\"key1\":\"value1\",\"key2\":[1,2,3]}")
    });

    it('should leave original payload if not valid json', () => {
        const context = new ContextBuilder().withBody("This is plain text");

        requestHook(context);

        expect(context.request.getBodyText()).toBe("This is plain text");
    })
})

class ContextBuilder {

    constructor() {
        this.request = {};
        this.payload = '';
    }

    withBody(value) {
        this.payload = value;
        this.request.getBodyText = () => this.payload;
        this.request.setBodyText = (str) => this.payload = str;
        return this;
    }

    build() {
        return {
            request: this.request,
        };
    }
}
