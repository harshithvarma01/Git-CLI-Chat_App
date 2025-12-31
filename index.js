import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { createOAuthDeviceAuth } from "@octokit/auth-oauth-device";
import chalk from "chalk";
import inquirer from "inquirer";
import dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function login() {
  const CLIENT_ID = process.env.GITHUB_CLIENT_ID;

  const auth = createOAuthDeviceAuth({
    clientType: "oauth-app",
    clientId: CLIENT_ID,
    onVerification(verification) {
      console.log(chalk.yellow.bold("\n--- GitHub Authentication ---"));
      console.log(chalk.white("1. Open:"), chalk.cyan.underline(verification.verification_uri));
      console.log(chalk.white("2. Enter Code:"), chalk.green.bold(verification.user_code));
    },
  });

  const { token } = await auth({ type: "oauth" });
  const response = await fetch("https://api.github.com/user", {
    headers: { Authorization: `token ${token}` }
  });
  const data = await response.json();
  return data.login; 
}

async function start() {
  console.log(chalk.blue.bold("\n--- VSquare Secure CLI Chat ---"));
  
  const myName = await login();
  console.log(chalk.bgGreen.black(` SUCCESS `) + chalk.green(` Verified as: @${myName}`));

  // 1. SELECT TARGET ONCE
  const { target } = await inquirer.prompt([{ 
    name: "target", 
    message: "Who do you want to chat with? (GitHub username or 'all'):", 
    type: "input",
    default: "all"
  }]);

  // Clean the username if they included the '@'
  const cleanTarget = target.replace('@', '');

  console.log(chalk.gray(`\nLocked on to: ${chalk.white.bold('@' + cleanTarget)}. Type 'exit' to quit.\n`));

  // 2. LISTEN FOR MESSAGES
  const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
  onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const msg = change.doc.data();
        
        // Only show if it's for me OR global
        const isForMe = msg.recipient === myName;
        const isForAll = msg.recipient === "all";

        if (msg.user !== myName && (isForMe || isForAll)) {
          const tag = isForAll ? chalk.cyan("[GLOBAL]") : chalk.magenta("[PRIVATE]");
          process.stdout.write(`\r${tag} ${chalk.yellow("@" + msg.user)}: ${msg.text}\n> `);
        }
      }
    });
  });

  // 3. CHAT LOOP (No more asking for recipient every time)
  while (true) {
    const { text } = await inquirer.prompt([{ name: "text", message: ">", type: "input" }]);
    
    if (text.toLowerCase() === 'exit') process.exit(0);

    if (text.trim()) {
      await addDoc(collection(db, "messages"), {
        user: myName,
        recipient: cleanTarget,
        text: text,
        timestamp: serverTimestamp()
      });
    }
  }
}

start().catch(console.error);