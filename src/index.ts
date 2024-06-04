import { MGClient } from "moongoose-client";
import { generateMessage } from "./discord-helper";
import { Observable, mergeMap, tap } from "rxjs";
import filestream from 'fs';
import FormData from "form-data";

MGClient.initialize({
    callsResetAfterMilliseconds: 1,
    maxCalls: 500,
})

class DiscordClient {
    private healthEndpoint: string = "";
    private contentEndpoint: string = "";
    private serviceName: string = "";

    initialize(serviceName: string, healthEndpoint: string, contentEndpoint: string) {
        this.healthEndpoint = healthEndpoint;
        this.contentEndpoint = contentEndpoint;
        this.serviceName = serviceName;
    }

    healthPost(message: any): Observable<any> {
        const content = `${this.serviceName}\n\n${JSON.stringify(message)}`;
        return MGClient.post(this.healthEndpoint, { content });
    }

    statusPost(users: string[], message: string, urls: string[]): Observable<any> {
        const content = generateMessage(users, message, urls);
        return MGClient.post(this.contentEndpoint, { content });
    }

    postXhrAsEmbed(url: string, header?: {[key: string]: string} ): Observable<any> {
        const form = new FormData();
        //@ts-ignore
        return MGClient.get(url, header).pipe(mergeMap(data => {
            const filename = url.split("/").pop() + ".txt"; //https://domain/facebook -> facebook.txt
            filestream.writeFileSync(filename, data as string);

            form.append(filename, filestream.createReadStream(filename));
            const headers: any = {
                "Content-Type": "multipart/form-data",
            };
            return MGClient.post(this.contentEndpoint, form, headers).pipe(tap(() => {
                filestream.unlink(filename, (err) => {
                    if (err) throw err;
                    console.log(`deleted: ${filename}`);
                })
            }))
        }))
    }
}

const DClient = new DiscordClient;

export { DClient };