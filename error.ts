//error.ts

// Importing colors
import { red, bold, cyan } from "./deps.ts";

// Shows help text, error message(if present) and exits the program
export const displayHelpAndQuit = (error?: string): void => {
    if (!error) {
    } else if (error === "INVALID_CREDENTIALS") {
        console.log(
            bold(red(`Error: Invalid credentials. Use --username and --password flag to set credentials`)),
        );
    } else console.log(bold(red(`Error: ${error}`)));
    console.log(`Usage: notify [params]\n`);
    console.log(`Optional flags:`);
    console.log(`   ${bold("-h, --help")}\t\t Shows this help message and exit`);
    console.log(
        `   ${bold("-u, --username")}\t\t Set the username`,
    );

    console.log(
        `   ${bold("-p, --password")}\t\t Set the password`,
    );

    console.log(
        `   ${bold("-h, --hostname")}\t\t Set the hostname`,
    );

    console.log(
        `   ${bold("--port")}\t\t Set the port`,
    );

    console.log(
        `   ${bold("--tls")}\t\t Set the tls connection`,
    );

    console.log(
        `   ${bold("-r, --recipient")}\t\t Set the recipient`,
    );

    console.log(
        `   ${bold("-m, --message")}\t\t Set the message`,
    );

    // Exits the program
    Deno.exit();
};