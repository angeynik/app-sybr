module.exports = {
    backserv: [
        {
            name: 'severapp',
            script: './serverapp.js',
            watch: ['server-sybr'],
            ignore_watch: ['node_modules', '.gitignore'],
            watch_delay: 5000,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
    frontserv: [
        {
            name: 'webapp',
            script: 'webApp/app-sybr/dist/http-server',
            watch: ['webApp/app-sybr/dist'],
            watch_delay: 5000,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
