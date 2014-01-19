'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ProtoGenerator = module.exports = function ProtoGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ProtoGenerator, yeoman.generators.Base);

ProtoGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log('yolo! - A Yeoman generator for prototyping static sites with jekyll, grunt, bower and compass.');
  }

  var prompts = [
    {
      name: 'projectName',
      message: 'Would you like to name this project?',
      default: "Prototype"
    },
    {
      name: 'description',
      message: 'Describe this project',
      default: "Just another prototype."
    },
    {
      type: 'confirm',
      name: 'compass',
      message: 'Would you like to enable SASS & Compass?',
      default: true
    },
    {
      type: 'confirm',
      name: 'bower',
      message: 'Would you like to use bower?',
      default: true
    },
    {
      type: 'confirm',
      name: 'foundation',
      message: 'Would you like to use foundation?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.compass = props.compass;
    this.bower = props.bower;
    this.foundation = props.foundation;
    this.projectName = props.projectName;
    this.description = props.description;

    cb();
  }.bind(this));
};

ProtoGenerator.prototype.app = function app() {
  this.mkdir('_layouts');
  this.mkdir('css');
  this.mkdir('js');

  if (this.compass){
    this.mkdir('scss');
    this.mkdir('scss/common');
    this.mkdir('scss/modules');
    this.copy('_config.rb', 'config.rb');
    this.copy('_config.yml', '_config.yml');
    this.copy('_Gemfile', 'Gemfile');
    this.copy('scss/style.scss', 'scss/style.scss');
    this.copy('scss/common/_base.scss', 'scss/common/_base.scss');
    this.copy('scss/common/_layout.scss', 'scss/common/_layout.scss');
    this.copy('scss/common/_reset.scss', 'scss/common/_reset.scss');
    this.copy('scss/common/_settings.scss', 'scss/common/_settings.scss');
    this.copy('scss/modules/_menu.scss', 'scss/modules/_menu.scss');
  }

  this.copy('_Gruntfile.js', 'Gruntfile.js');
  this.copy('_LICENSE-MIT', 'LICENSE-MIT');
  this.copy('_README.md', 'README.md');
  this.copy('index.html', 'index.html');
  this.copy('_layouts/default.html', '_layouts/default.html');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

ProtoGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
