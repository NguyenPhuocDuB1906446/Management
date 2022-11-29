const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'),
    devServer: {
        port: 3001,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/',
                changeOrigin: true,
            }
        }
    }
    
};