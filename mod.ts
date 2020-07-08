// ***************
// IMPORTS
// ***************
import { parse, green, bold, red } from "./deps.ts";
import { displayHelpAndQuit } from "./error.ts";
import { Mailer } from "./mailer.ts";
// ***************
// FUNCTIONS
// ***************

const displayBanner = (): void => {
    // Clears the terminal
    console.clear();
    console.log(bold("---------------"));
    console.log(
        bold(
            green(`
   Notify
`),
        ),
    );
    console.log(bold("---------------"));
    console.log(
        bold(
            green(
                `\nSend the notify message from the cli console\n`,
            ),
        ),
    );
};
// @ts-ignore
const paramsGetter = (parsedArgs: object, short: any, long: any):string  => parsedArgs[short] || parsedArgs[long];
const paramsChecker = (parsedArgs: object, short: string, long: string):Boolean  =>
        parsedArgs.hasOwnProperty(short) || parsedArgs.hasOwnProperty(long);
const sendMail = async (parsedArgs: object) => {
    const username = paramsGetter(parsedArgs, 'u','username');
    const password = paramsGetter(parsedArgs, 'p','password');
    const hostname = paramsGetter(parsedArgs, 'h','hostname');
    const port = Number(paramsGetter(parsedArgs, 'port','port'));
    const tls = paramsGetter(parsedArgs, 'tls', 'tls') === 'true';
    const recipient = paramsGetter(parsedArgs, 'r','recipient');
    const from = paramsGetter(parsedArgs, 'f','from');
    const subject = paramsGetter(parsedArgs, 's','subject');
    const message = paramsGetter(parsedArgs, 'm','message').replace(/\\\\n/g, "\n");
    const mailer = new Mailer({
        username,
        password,
        hostname,
        port,
        tls
    });

    try {
        await mailer.send(from, recipient, subject, message);
        console.log(bold(green('Done!')));
    } catch (e) {
        console.log(bold(red('Error! %s')), e.message);
    }
}
// ***************
// Main method
// ***************
    if (import.meta.main) {
        console.log(`Welcome to Deno 🦕!`);
        const { args } = Deno;
        const parsedArgs = parse(args);
        displayBanner();
        if (args.length !== 0
            && (paramsChecker(parsedArgs, 'u','username')
                && paramsChecker(parsedArgs, 'p','password')
                && paramsChecker(parsedArgs, 'h','hostname')
                && paramsChecker(parsedArgs, 'port','port')
                && paramsChecker(parsedArgs, 'tls','tls')
                && paramsChecker(parsedArgs, 'from','from')
                && paramsChecker(parsedArgs, 'r','recipient')
                && paramsChecker(parsedArgs, 's','subject')
                && paramsChecker(parsedArgs, 'm','message'))
        ) {
            await sendMail(parsedArgs);
        } else displayHelpAndQuit("Invalid argument");
    }
