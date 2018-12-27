import {Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions){
    backend.connections.subscribe((connection: MockConnection) => {
        let testUser = {username: 'test', password: 'test', firstname: 'Test', lastname: 'User'}

        setTimeout(() => {

            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post){
                let params = JSON.parse(connection.request.getBody());

                if (params.username === testUser.username && params.password === testUser.password){
                    connection.mockRespond(new Response(
                        new ResponseOptions({status: 200, body: {token: 'fake-token'}})
                    ));
                }else{
                    connection.mockRespond(new Response(
                        new ResponseOptions({status: 200})
                    ));
                }
            }

        }, 500);
    })
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};