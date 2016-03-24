Sample project integrating bower, gulp-uglify, gulp-rename, browser-sync, gulp-ruby-sass, gulp-autoprefixer, gulp-cssnano, gulp-concat, ngrok, gulp-bower using gulp

Steps to run
Prerequest
1. Install gulp globally - $npm install -g gulp
2. Install ruby sass - $gem install sass
Run steps
1. bring the code base to your local system - $git clone https://github.com/uspc/gulp-bower-bowsersync-ngrok.git
2. run gulp in the foler where gulpfile.js exists - $gulp

Results
1. Installs npm module based on package.json into node_modules 
2. Installs bower based on bower.json into bower_components
3. concats all the js in bower_components to public/js/all.js
4. converst sass files to css, src/sass file to public/css
5. minimize src/js to public/js/main.min.js
6. Initialize bower-sync local server
7. Tunnels to ngrok to expose your local server to internet (public url availabe @ console log from gulp) 