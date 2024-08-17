/* eslint-disable no-invalid-this */
import { expect } from 'chai';
import sinon, { SinonFakeXMLHttpRequest } from 'sinon';

import { get, post, del, put } from '@lib/network/http';

describe('HTTP tests', function () {
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(function () {
        this.xhr = sinon.useFakeXMLHttpRequest();

        requests = [];

        this.xhr.onCreate = function (xhr: SinonFakeXMLHttpRequest) {
            requests.push(xhr);
        };
    });

    afterEach(function () {
        this.xhr.restore();
    });

    describe('Get Request', function () {
        it('Should make a simple request', function (done) {
            get('/test')
                .then((xhr) => {
                    expect(xhr.responseText).to.be.eq('success');
                    done();
                });

            const [xhr] = requests;

            expect(requests.length).to.be.eq(1);

            expect(xhr.url).to.be.eq('/test');
            expect(xhr.method).to.be.eq('GET');

            xhr.respond(200, { 'Content-Type': 'application/json' }, 'success');
        });

        it('Should make a request with credential', function () {
            get('/test');

            const [xhr] = requests;

            expect(xhr.withCredentials).to.be.true;
        });

        it('Should make a request withouth data', function () {
            get('/test', {
                data: 'test',
            });

            const [xhr] = requests;

            expect(xhr.requestBody).to.be.undefined;
        });


        it('Should make a request with header', function () {
            get('/test', {
                headers: [
                    ['TestHeader', 'TestValue'],
                ],
            });

            const [xhr] = requests;

            expect(xhr.requestHeaders['TestHeader']).to.be.eq('TestValue');
        });
    });

    describe('POST Request', function () {
        it('Should make a simple post request', function (done) {
            post('/test-post')
                .then((xhr) => {
                    expect(xhr.responseText).to.be.eq('success');
                    done();
                });

            const [xhr] = requests;

            expect(requests.length).to.be.eq(1);

            expect(xhr.url).to.be.eq('/test-post');
            expect(xhr.method).to.be.eq('POST');

            xhr.respond(200, { 'Content-Type': 'application/json' }, 'success');
        });

        it('Could send data', function () {
            post('/test-post', {
                data: 'test',
            });

            const [xhr] = requests;

            expect(xhr.requestBody).to.be.eq('test');
        });
    });

    describe('DELETE Request', function () {
        it('Should make a simple delete request', function (done) {
            del('/test-delete')
                .then((xhr) => {
                    expect(xhr.status).to.be.eq(204);
                    expect(xhr.responseText).to.be.eq('success');
                    expect(xhr.getResponseHeader('Content-Type')).to.be.eq('application/xml');
                    done();
                });

            const [xhr] = requests;

            expect(requests.length).to.be.eq(1);

            expect(xhr.url).to.be.eq('/test-delete');
            expect(xhr.method).to.be.eq('DELETE');

            xhr.respond(204, { 'Content-Type': 'application/xml' }, 'success');
        });

        it('Could send data', function () {
            del('/test-delete', {
                data: 'test-delete',
            });

            const [xhr] = requests;

            expect(xhr.requestBody).to.be.eq('test-delete');
        });
    });

    describe('PUT Request', function () {
        it('Should make a simple put request', function (done) {
            put('/test-put')
                .then((xhr) => {
                    expect(xhr.responseText).to.be.eq('success-put');
                    done();
                });

            const [xhr] = requests;

            expect(xhr.url).to.be.eq('/test-put');
            expect(xhr.method).to.be.eq('PUT');

            xhr.respond(200, { 'Content-Type': 'application/mpeg4' }, 'success-put');
        });

        it('Could send data', function () {
            put('/test-put', {
                data: 'test-put',
            });

            const [xhr] = requests;

            expect(xhr.requestBody).to.be.eq('test-put');
        });
    });
});
