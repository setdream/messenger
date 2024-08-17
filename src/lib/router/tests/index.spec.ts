import { expect } from 'chai';
import sinon from 'sinon';

import { create, showComponentByPathname, setRoutes } from '@lib/router';
import { LogoComponent } from '@components/logo';

describe('Router tests', function () {
    describe('Creating route', function () {
        it('Should create correct route', function () {
            const container = document.createElement('div');

            const callback = sinon.fake();
            const route = create('/route', async () => callback(), () => container);

            expect(route.component).to.be.undefined;
            expect(route.path).to.be.eq('/route');
            expect(route.createComponent).to.be.a('function');
        });
    });

    describe('Navigate route', function () {
        it('Should make correct navigation', function () {
            const container = document.createElement('div');

            const callback = sinon.fake();
            const route = create('/route1', async () => callback(), () => container);

            setRoutes([route]);

            showComponentByPathname('/route1');

            expect(callback.calledOnce).to.be.true;
        });

        it('Should throw an error with incorrect navigation', function () {
            const container = document.createElement('div');

            const callback = sinon.fake();
            const route = create('/route', async () => callback(), () => container);

            setRoutes([route]);

            expect(() => showComponentByPathname('/404')).to.throw('Can\'t find route');
        });

        it('Should add a component to container', async function () {
            const container = document.createElement('div');

            const myLogoComponent = sinon.createStubInstance(LogoComponent);
            myLogoComponent.getContent.returns(document.createElement('div'));

            const route = create('/route1', async () => myLogoComponent, () => container);

            setRoutes([route]);

            await showComponentByPathname('/route1');

            expect(container.childNodes.length).to.be.equal(1);
        });
    });

    describe('Execute route', function () {
        it('Should extract data from path', async function () {
            const container = document.createElement('div');

            const callback = sinon.stub();
            const route = create(
                /^\/conversation\/(?<id>[\d]+)$/,
                async ({ pathData }) => callback(pathData), () => container);

            setRoutes([route]);

            await showComponentByPathname('/conversation/200');

            expect(callback.getCall(0).firstArg['id']).to.be.equal('200');
        });

        it('Should work with an array path', async function () {
            const container = document.createElement('div');

            const callback = sinon.fake();
            const route = create(['/route1', '/route2'], async () => callback(), () => container);

            setRoutes([route]);

            await showComponentByPathname('/route1');

            expect(callback.calledOnce).to.be.true;

            await showComponentByPathname('/route2');

            expect(callback.calledTwice).to.be.true;
        });
    });
});
