import dev from './dev.json';
import prod from './prod.json';

export default process.env.NODE_ENV === 'development' ? dev : prod;
