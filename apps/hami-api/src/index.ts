import {logger} from './lib/config';
// get routes
import './route/get-customer-storage';
import './route/get-notification-storage';
import './route/get-product-list';
import './route/get-product-price-list';
import './route/get-user';
// other
import './route/home';
import './route/authentication/sign-in';
// patch routes
import './route/patch-customer-list';
import './route/patch-notification-list';
import './route/patch-product-list';
import './route/patch-product-price-list';
import './route/patch-user-list';


logger.logOther('..:: Gecut Hami API ::..');
