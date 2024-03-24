
# PlawLabs Careers Next.js Project

This guide provides instructions for setting up and running the Next.js project for PlawLabs Careers on macOS for development and Ubuntu for deployment and hosting.

## macOS Setup

### 1. Install Node.js and npm

Install Homebrew, a package manager for macOS, if you haven't already:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then, install Node.js and npm (Node.js package manager) using Homebrew:

```bash
brew install node
```

Verify the installations:

```bash
node --version
npm --version
```

### 2. Run the Project Locally

Navigate to your project directory and install dependencies:

```bash
cd path/to/your/project
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000 by default. You can change the port by running `npm run dev -- -p <your_port>`.

## Ubuntu Setup

### Installation of Required Tools

Install Node.js and npm, as Next.js is built on these tools.

```bash
sudo apt update
sudo apt install nodejs npm -y
node --version
npm --version
```

Verify the installations to ensure they were successful.

### 3. Copy the Project to the Server

You can copy your Next.js project to the server using SCP (Secure Copy Protocol). Alternatively, you can pull it from a git repository.

Using SCP:

```bash
scp -r /local/project/path username@serverip:/target/directory
```

Or, using git:

```bash
git clone https://github.com/user/project.git
```

### 4. Install Dependencies

After copying the project, navigate to the project directory and install the dependencies with npm.

```bash
cd /target/directory/project
npm install
```

### 5. Build and Run the Next.js Application

Build your application and run it in production mode.

```bash
npm run build
npm start
```

These commands typically run your application on port 3000 by default. You can modify the start script in your `package.json` to use a different port.

### 6. Setting Up Reverse Proxy with Nginx

To make your application accessible through apply.plawlabs.com, use Nginx as a reverse proxy. Install Nginx and set up a server block configuration.

```bash
sudo apt install nginx -y
```

Create a configuration file in `/etc/nginx/sites-available/` with content similar to:

```nginx
server {
    listen 80;
    server_name apply.plawlabs.com;

    location / {
        proxy_pass http://localhost:3000; # Port where your app runs
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

To enable the configuration, create a symbolic link in the `sites-enabled` directory and restart Nginx.

```bash
sudo ln -s /etc/nginx/sites-available/apply.plawlabs.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Domain Forwarding

Update your DNS settings to point the apply.plawlabs.com subdomain to your server's IP address. This can be done by following the steps provided earlier.

### 8. Securing with HTTPS

Secure your application with HTTPS by installing an SSL/TLS certificate using Let's Encrypt and Certbot.

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d apply.plawlabs.com
```

### 9. Managing the Application with PM2 (Optional but Recommended)

For continuous operation and automatic startup management of your application, use PM2, a Node.js application manager.

To install PM2:

```bash
sudo npm install pm2 -g
```

Start your application with PM2:

```bash
pm2 start npm --name "next-app" -- start
```

To ensure PM2 automatically starts at system boot:

```bash
pm2 startup systemd
```

Follow the instructions displayed in the terminal. Save the current running processes:

```bash
pm2 save
```

### 10. Firewall Settings

Secure your server with a firewall, allowing traffic only on specific ports.

```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
sudo ufw status
```

These steps complete the basic requirements for securely running your Next.js project on the apply.plawlabs.com subdomain.
