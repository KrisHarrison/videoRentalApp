import * as Sentry from '@sentry/browser';

function init(){
    Sentry.init({dsn: "https://84a013de55ec425cb67f30cfeb1f7393@sentry.io/1889182"});
}

function log(error){
    Sentry.captureException(error);
}

export default{
    init,
    log
}