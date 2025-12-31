# Git CLI Chat App 💬

A secure, real-time command-line interface (CLI) chat application that enables developers to communicate anonymously using GitHub authentication. Built with Node.js, Firebase, and GitHub OAuth.

## ✨ Features

- **GitHub Authentication** - Seamless login using your GitHub account via OAuth device flow
- **Real-time Messaging** - Instant message delivery powered by Firebase Firestore
- **Private & Global Chat** - Send messages to specific users or broadcast to everyone
- **Anonymous Communication** - Chat using your GitHub username without exposing personal information
- **Secure** - Environment-based configuration keeps your credentials safe
- **Developer-Friendly** - Simple CLI interface designed for terminal enthusiasts

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A GitHub account
- Firebase project with Firestore enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshithvarma01/Git-CLI-Chat_App.git
   cd Git-CLI-Chat_App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   # Firebase Configuration
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   FIREBASE_APP_ID=your_app_id

   # GitHub OAuth
   GITHUB_CLIENT_ID=your_github_oauth_client_id
   ```

### Setting Up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable **Firestore Database** in your project
4. Go to Project Settings → General → Your apps
5. Add a web app and copy the configuration values to your `.env` file

### Setting Up GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the application details:
   - **Application name**: Git CLI Chat App (or your preferred name)
   - **Homepage URL**: `http://localhost` (or your app URL)
   - **Authorization callback URL**: Leave blank for device flow
4. Click **Register application**
5. Copy the **Client ID** to your `.env` file

## Usage

Start the application:
```bash
npm start
```

### Authentication Flow

1. The app will prompt you to authenticate with GitHub
2. Open the provided URL in your browser
3. Enter the verification code displayed in your terminal
4. Authorize the application

### Chatting

1. **Select a recipient**: Enter a GitHub username or type `all` for global chat
2. **Start chatting**: Type your message and press Enter
3. **Exit**: Type `exit` to quit the application

### Message Types

- **Global Messages** - Visible to all users (sent to `all`)
  ```
  [GLOBAL] @username: Hello everyone!
  ```

- **Private Messages** - Only visible to the specified recipient
  ```
  [PRIVATE] @username: Hey, this is private!
  ```

## Technologies Used

- **Node.js** - Runtime environment
- **Firebase Firestore** - Real-time database
- **GitHub OAuth** - Authentication
- **Inquirer.js** - Interactive CLI prompts
- **Chalk** - Terminal styling
- **dotenv** - Environment variable management

## 📁 Project Structure

```
Git-CLI-Chat_App/
├── index.js           # Main application file
├── package.json       # Dependencies and scripts
├── .env              # Environment variables (not in git)
├── .env.example      # Environment template
├── .gitignore        # Git ignore rules
└── README.md         # Documentation
```

## 🔒 Security

- All sensitive credentials are stored in `.env` file
- The `.env` file is excluded from version control via `.gitignore`
- Never commit API keys or OAuth credentials to the repository
- Use the `.env.example` template to share configuration structure

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Harshith Varma**
- GitHub: [@harshithvarma01](https://github.com/harshithvarma01)

## Acknowledgments

- Firebase for real-time database capabilities
- GitHub for OAuth authentication
- The open-source community for amazing tools and libraries

---

⭐ If you find this project useful, please consider giving it a star!
