const Sentry = require("@sentry/node");
require("@sentry/tracing");
const {ProfilingIntegration} = require("@sentry/profiling-node");


Sentry.init({
    dsn: "https://0bddf2b206d9470aaf512973818aa876@o1139939.ingest.sentry.io/4504138080321536",
    profilesSampleRate: 1.0,
    tracesSampleRate: 1.0,
    integrations: [new ProfilingIntegration()]
});

const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});


function exception(){
    return new Promise((resolve) => {
        setTimeout(() => {
            try {
                foo();
            } catch (e) {
                Sentry.captureException(e);
            } finally {
                resolve()
                transaction.finish();
            }
        }, 99);
    })
}
(async() => {
    await exception();
})()