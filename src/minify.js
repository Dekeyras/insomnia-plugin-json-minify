const minifier = (context) => {
    const body = context.request.getBodyText();

    try {
        context.request.setBodyText(JSON.stringify(JSON.parse(body)));
    } catch(error) {
        console.debug('Payload not valid json, skipping stringify step');
    }
}

module.exports = minifier;
