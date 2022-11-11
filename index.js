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

const fib = (n) => {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fib(n - 1) + fib(n - 2);
};

function exception(){
    return new Promise((resolve) => {
        fib(34)
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