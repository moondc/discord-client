/**
 * Create the 'content' for the discord message
 * @param userlist - who you want notified
 * @param message - message to be sent
 * @param urlList - any url attachments
 */
const generateMessage = (userlist: string[], message: string, urlList: string[]): string => {
    let userString, messageString, urlString;
    if (userlist) userString = formatUsers(userlist);
    if (message) messageString = formatMessage(message);
    if (urlList) urlString = formatUrls(urlList);
    return userString + "\n" + messageString + "\n" + urlString;
}

const formatUsers = (userlist: string[]): string => {
    let StringBuilder = "";
    userlist.forEach(user => {
        if (user.startsWith("@")) {
            StringBuilder += user + ", ";
        }
        else {
            StringBuilder += "@" + user + ", ";
        }
    })
    return StringBuilder.slice(0, -2);
}

const formatMessage = (message: string): string => {
    return message;
}

const formatUrls = (urlList: string[]): string => {
    return urlList.join("\n");
}

export { generateMessage, formatUsers, formatMessage, formatUrls }