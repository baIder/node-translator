import {program} from 'commander';
import {translate} from './main';

program
  .version('0.0.1')
  .name('fy')
  .usage('<English>')
  .arguments('<English>')
  .action((english) => {
    translate(english);
  });

program.parse();