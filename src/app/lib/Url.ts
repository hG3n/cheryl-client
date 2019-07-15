/**
 * Convenience class for easier and more error safe handling with URLs.
 */
export class Url {

    /// available prefixes to be used for a URL
    private prefixes = {
        ssl: 'https://',
        standard: 'http://',
        socket: 'ws://',
    };

    /// contains all elements of a URL
    private routes: string[] = [];

    /**
     * c'tor
     * @param prefix
     * @param url_string
     */
    constructor(prefix: string, url_string: string = null) {
        if (prefix !== null) {
            this.routes.push(this.prefixes[prefix]);
        }

        if (url_string !== null) {
            const segments = url_string.split('/');
            for (const piece of segments) {
                this.routes.push(piece);
            }
        }
    }

    /**
     * Adds a new route to the URL.
     * @param next
     */
    push(next: string): void {
        this.routes.push(next);
    }

    /**
     * Pops the last route.
     */
    pop(): string {
        return this.routes.pop();
    }

    /**
     * Converts the URL to a machine readable URL string.
     */
    toString(): string {
        let output = '';
        for (let i = 0; i < this.routes.length; ++i) {
            if (i === 0 || i === 1) {
                output += this.routes[i];
            } else {
                output += '/' + this.routes[i];
            }
        }

        return output;
    }
}
