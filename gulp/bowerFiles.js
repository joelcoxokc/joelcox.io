(function () {
    var fs = require('fs'),
        _f = require('fs-utils'),
        _  = require('lodash'),
        paths = require('../gulp.config'),
        path  = require('path');
        rootDir = path.resolve(__dirname, '../')

    var bower = new Bower()
    module.exports = bower;


    module.exports.Bower = Bower

    function Bower() {
        var _this        = this;
        _this.rc         = _f.readJSONSync('.bowerrc');
        _this.root       = join(rootDir, _this.rc.directory);
        _this.components = paths.bowerFiles;

        _this.forEachConfig = function(cb){
            _.forEach(_this.components, function (comp){
                var main = _f.readJSONSync( join(_this.root, comp, 'bower.json') ).main
                if(_.isArray(main)){
                    _.forEach(main, function (dir){
                        cb(join(_this.root, comp, dir))
                    });
                } else {

                    cb(join(_this.root, comp, main));
                }
            });
        }



    };

    Bower.prototype.main = function(components) {
        this.components = components || this.components;
        var bowerConfigs = [];
        this.forEachConfig( function (config){
            bowerConfigs.push(config)
        });
        return bowerConfigs;
    };

    // Private Methods
    /////////////////////////////


    function join() {
        return _.map(arguments, function (arg){
            if(arg.slice(0, 1) === '.') arg = arg.slice(2)

            if(arg[arg.length-1] === '/') return arg.slice(0, arg.length-1);
            return arg
        }).join('/');
    }


})();