import { create } from '@lib/router';

import { ErrorPage } from '@pages/error';
import { ErrorComponent } from '@components/error';
import { getAppContainer } from '@routes/utils';

export const error404Route = create('/404', async (): Promise<ErrorPage> => {
    return new ErrorPage({
        error: new ErrorComponent({
            code: '404',
        }),
    });
}, getAppContainer);


export const error500Route = create('/500', async (): Promise<ErrorPage> => {
    return new ErrorPage({
        error: new ErrorComponent({
            code: '500',
        }),
    });
}, getAppContainer);
