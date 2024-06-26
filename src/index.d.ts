import { Observable } from "rxjs";

declare class DiscordClient {
    private healthEndpoint: string;
    private contentEndpoint: string;

    constructor(a: string, b: string);

    healthPost(message: any): Observable<any>;
    statusPost(users: string[], message: string, urls: string[]): Observable<any>;
    initialize(serviceName: string, healthEndpoint: string, edgarEndpoint: string): void
    postXhrAsEmbed(url: string, header?: {[key: string]: string} ): Observable<any>;
}

declare const DClient: DiscordClient;

export { DClient };
