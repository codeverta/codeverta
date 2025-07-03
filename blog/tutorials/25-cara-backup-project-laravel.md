---

title: "How to backup our laravel apps"
date: "2025-05-15"
desc: "Backing up your Laravel application's `storage` directory is crucial for disaster recovery. You can automate this process and send the backups to your local PC, Google Drive, or even a Telegram chat. The most popular and recommended method involves using the `spatie/laravel-backup` package, which provides a robust and flexible way to handle backups."
tags: "react js, react strictmode, pengembangan web, react untuk pemula, best practice react"

---


Backing up your Laravel application's `storage` directory is crucial for disaster recovery. You can automate this process and send the backups to your local PC, Google Drive, or even a Telegram chat. The most popular and recommended method involves using the `spatie/laravel-backup` package, which provides a robust and flexible way to handle backups.

Here’s a comprehensive guide on how to achieve this for each destination.

-----

## ⚙️ Initial Setup: Installing the Backup Package

First, you need to install the `spatie/laravel-backup` package into your Laravel project. SSH into your remote server and navigate to your application's root directory. Then run the following command:

```bash
composer require spatie/laravel-backup
```

Next, publish the configuration file:

```bash
php artisan vendor:publish --provider="Spatie\Backup\BackupServiceProvider"
```

This will create a `config/backup.php` file. This is where you will configure your backup settings.

By default, the package is configured to back up your entire application directory and databases. To specifically back up only the `storage` directory, you'll need to adjust the `include` and `exclude` arrays within the `source` section of the `config/backup.php` file.

To back up the entire `storage` directory, ensure the `include` array in `config/backup.php` looks like this:

```php
'source' => [
    'files' => [
        'include' => [
            storage_path(),
        ],
        // ...
    ],
    // ...
],
```

-----

## 💻 Backup to Your Local PC

Backing up to your local PC is a two-step process:

1.  **Create the backup on your server:** The `spatie/laravel-backup` package will create a zip file of your `storage` directory on your server's local filesystem.
2.  **Download the backup to your PC:** You'll then need to use a secure copy protocol (SCP) or a file transfer client like FileZilla to download the backup file.

### 1\. Configure Local Backup

In your `config/backup.php`, ensure the `local` disk is included in the `destination` array:

```php
'destination' => [
    'disks' => [
        'local',
    ],
],
```

This will store the backup zip file in a directory specified in your `config/filesystems.php` under the `local` disk configuration (usually `storage/app`).

### 2\. Run the Backup

To create the backup, run the following artisan command:

```bash
php artisan backup:run --only-files
```

The `--only-files` flag tells the package to only back up the files and skip the database.

### 3\. Download the Backup

After the backup is created, you'll find the zip file in the directory specified by your `local` disk configuration. To download it to your PC, use the `scp` command from your local machine's terminal:

```bash
scp your_username@your_server_ip:/path/to/your/laravel/app/storage/app/AppName/backup.zip /path/to/your/local/directory
```

Replace `your_username`, `your_server_ip`, `/path/to/your/laravel/app/storage/app/AppName/backup.zip`, and `/path/to/your/local/directory` with your actual server credentials and paths.

-----

## ☁️ Backup to Google Drive

To back up your `storage` directory to Google Drive, you'll need to install an additional package that provides a Google Drive filesystem driver for Laravel.

### 1\. Install Google Drive Filesystem Adapter

Install the `masbug/flysystem-google-drive-ext` package:

```bash
composer require masbug/flysystem-google-drive-ext
```

### 2\. Configure Google Drive API

  * Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
  * Enable the **Google Drive API** for your project.
  * Create an **OAuth 2.0 Client ID** and get your `Client ID` and `Client Secret`.
  * You will also need to generate a `Refresh Token`. A common way to do this is by using the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground).

### 3\. Configure Laravel Filesystem

Add the Google Drive credentials to your `.env` file:

```env
GOOGLE_DRIVE_CLIENT_ID=your-client-id
GOOGLE_DRIVE_CLIENT_SECRET=your-client-secret
GOOGLE_DRIVE_REFRESH_TOKEN=your-refresh-token
GOOGLE_DRIVE_FOLDER_ID=your-folder-id
```

`GOOGLE_DRIVE_FOLDER_ID` is the ID of the folder in your Google Drive where you want to store the backups. You can get this from the URL of the folder.

Now, add a new disk to your `config/filesystems.php`:

```php
'disks' => [
    // ... other disks

    'google' => [
        'driver' => 'google',
        'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
        'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
        'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
        'folderId' => env('GOOGLE_DRIVE_FOLDER_ID'),
    ],
],
```

### 4\. Configure Backup Destination

In your `config/backup.php`, add `google` to the list of destination disks:

```php
'destination' => [
    'disks' => [
        'google',
    ],
],
```

### 5\. Run the Backup

Now, when you run the backup command, the zip file will be sent to your specified Google Drive folder.

```bash
php artisan backup:run --only-files
```

-----

## 💬 Backup to Telegram

You can also have your backups sent directly to a Telegram chat or channel. This is useful for quick notifications and access to your backup files.

### 1\. Install Telegram Backup Package

A dedicated package `raziul/laravel-backup-telegram` integrates with `spatie/laravel-backup` for this purpose.

```bash
composer require raziul/laravel-backup-telegram
```

Then, publish the configuration file:

```bash
php artisan vendor:publish --tag="backup-telegram-config"
```

### 2\. Configure Telegram Bot

  * **Create a Telegram Bot:** Talk to `@BotFather` on Telegram to create a new bot. You will receive an API token.
  * **Get Chat ID:**
      * For a private chat, start a conversation with your bot.
      * For a channel, create a new public or private channel and add your bot as an administrator.
      * Use a bot like `@userinfobot` to get the chat ID of your private chat or channel.

### 3\. Configure Telegram Backup

Add your Telegram bot token and chat ID to your `.env` file:

```env
BACKUP_TELEGRAM_TOKEN=your-bot-token
BACKUP_TELEGRAM_CHAT_ID=your-chat-id
```

The package will automatically listen for successful backup events and send the backup file to your configured Telegram chat.

### 4\. Run the Backup

Simply run the standard backup command:

```bash
php artisan backup:run --only-files
```

Upon successful completion, the backup zip file will be uploaded to your Telegram chat. Note that Telegram has a file size limit (currently 50MB for bots). This package can split larger backups into smaller chunks.

By following these steps, you can set up a reliable backup system for your Laravel application's `storage` directory, ensuring your files are safe and easily accessible from your preferred location. For production environments, it is highly recommended to automate the backup process by scheduling the `backup:run` and `backup:clean` commands in your `app/Console/Kernel.php` file.