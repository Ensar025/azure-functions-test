import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import pMap from "p-map";
import got from "got";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const sites = [
        'https://avajs.dev',
        'https://github.com'
    ];

    const mapper = async site => {
        const {requestUrl} = await got.head(site);
        return requestUrl;
    };

    const result = await pMap(sites, mapper, {concurrency: 2});
    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
    };

};

export default httpTrigger;