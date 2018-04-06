import registerServiceWorker from './registerServiceWorker';

import './index.css';

// import './byRouter';
import './byBase';



registerServiceWorker();


if (module.hot){
    module.hot.accept()
}
