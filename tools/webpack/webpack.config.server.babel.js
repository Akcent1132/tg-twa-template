import StartServerPlugin from "start-server-webpack-plugin";

export default {
  // This script will be ran after building
  entry: {
    server: server.js
  },

  plugins: [
    
    // Only use this in DEVELOPMENT
    new StartServerPlugin({
      name: 'server.js',
      nodeArgs: ['--inspect'], // allow debugging
      args: ['scriptArgument1', 'scriptArgument2'], // pass args to script
      signal: false | true | 'SIGUSR2', // signal to send for HMR (defaults to `false`, uses 'SIGUSR2' if `true`)
      keyboard: true | false, // Allow typing 'rs' to restart the server. default: only if NODE_ENV is 'development'
    }),

  ],
  
}