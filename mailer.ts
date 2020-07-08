//mailer.ts
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import { ConnectConfigWithAuthentication } from "https://deno.land/x/smtp/config.ts";

interface MailerConfigInterface{
    username: string, password: string,
    hostname: string, port: number,
    tls: boolean
}


interface MailerInterface {
    config: MailerConfigInterface;
    client: SmtpClient,
    send(from: string,
         recipient: string,
         subject: string,
         message: string
    ): Promise<any>;
}

export class Mailer implements MailerInterface {
    client = new SmtpClient();
    config: MailerConfigInterface = <MailerConfigInterface>{

    };

    constructor(config: MailerConfigInterface) {
        this.config = config;
    }

    async connectTLS(): Promise<any> {
        return this.client.connectTLS(<ConnectConfigWithAuthentication>{
            hostname: this.config.hostname,
            port: this.config.port,
            username: this.config.username,
            password: this.config.password,
        });
    }

    async connect(): Promise<any> {
        return this.client.connect(<ConnectConfigWithAuthentication>{
            hostname: this.config.hostname,
            port: this.config.port,
            username: this.config.username,
            password: this.config.password,
        });
    }

    async send(from: string,
         recipient: string,
         subject: string,
         message: string) {
        this.config.tls ? await this.connectTLS() : await this.connect();
        await this.client.send({
            from,
            to: recipient,
            subject,
            content: message,
        })
    }

}