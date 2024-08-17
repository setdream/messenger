import { setRoutes, startPopStateListener, showComponentByPathname } from '@lib/router';

import { guestRoutes, userRoutes } from '@routes/index';
import { error404Route } from '@routes/common/error.routes';

import { initGlobalLoadingPage } from '@pages/loading';
import { initGlobalAlertComponent } from '@components/alert';

import { isSignedIn, tryGetAuthUserAndStore } from '@services/auth.service';
import { addUpdateListener } from '@stores/auth/auth.store';

const runApp = async () => {
    try {
        if (!await isSignedIn()) {
            if (!await tryGetAuthUserAndStore()) {
                setRoutes(guestRoutes);
                showComponentByPathname(window.location.pathname);
            }
        } else {
            setRoutes(userRoutes);
            showComponentByPathname(window.location.pathname);
        }
    } catch (e) {
        showComponentByPathname(error404Route.path as string);
    }
};

addUpdateListener(() => runApp());

initGlobalLoadingPage(document.body)
    .then(() => initGlobalAlertComponent(document.body))
    .then(() => runApp())
    .then(startPopStateListener);
