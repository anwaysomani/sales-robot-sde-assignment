# LinkedIn Auto Connect Chrome Extension

LinkedIn Auto Connect is a Chrome extension designed to automatically send connect requests to people on the first page of LinkedIn's search results. It also provides a summary report of the actions performed, such as total connections sent, existing connections, professional accounts, and no-action items on the active page of the search result.

## Features
- Automatically connects with people listed on LinkedIn search results.
- Differentiates between already connected, professional accounts, and new contacts.
- Provides a summary report of connection attempts and status.

## Prerequisites
To use this extension, you need to have the following:
- Google Chrome (version 88 or above is recommended).
- Basic familiarity with Chrome Extensions (to load unpacked extensions).

## Installation Instructions
Follow these steps to run the LinkedIn Auto Connect extension in Google Chrome:

### 1. Clone or Download the Repository
- Clone the repository from the GitHub link provided (or download it as a ZIP file).

```sh
# Clone the repository using Git
$ git clone https://github.com/yourusername/linkedin-auto-connect.git

# Navigate into the extension folder
$ cd linkedin-auto-connect
```

### 2. Extract Files
- If you downloaded the ZIP file, extract its contents into a folder.

### 3. Modify Manifest Paths (if needed)
- Ensure that all file paths in `manifest.json` match the actual directory structure of your extracted files. Default structure:
  - `app/` folder for HTML, JS, and CSS.
  - `assets/` folder for extension icons.

### 4. Load the Extension in Chrome
1. **Open Google Chrome**.
2. Navigate to the **Extensions Page** by entering the following URL in the address bar:
   
   ```
   chrome://extensions/
   ```

3. Enable **Developer Mode** in the top-right corner of the page.
4. Click on the **Load unpacked** button.
5. Select the folder where you extracted/cloned the extension files. It should contain the `manifest.json` file.

### 5. Permissions
This extension requires certain permissions to work:
- **activeTab**: To interact with the current tab.
- **scripting**: To run custom scripts on LinkedIn pages.
- **storage**: To save and retrieve connection status data.

Make sure you review and accept the permission prompts during the installation process.

### 6. Using the Extension
1. Once installed, click on the **LinkedIn Auto Connect** icon in your Chrome toolbar.
2. You will see a popup with a "**Auto-connect people on this page**" button.
3. **Navigate to LinkedIn** and perform a `People` search to see a list of people to connect with.
4. Click the **Auto-connect** button from the extension's popup, and it will start connecting with people on the page.
5. A summary report will be generated, displaying the results of the action.

### 7. Content Script Trigger
- The extension uses a content script (`content.js`) to interact with the LinkedIn page. Make sure that LinkedIn is open and the active tab.
- The script will be executed, and the extension will click buttons on LinkedIn based on the profile status (Connect, Message, Follow).

### 8. Troubleshooting
- **File Not Found Error**: Ensure that file paths in `manifest.json` are correct and match the actual directory structure.
- **Content Script Not Running**: Make sure that LinkedIn is open in the active tab and the correct page (People search results).
- **Reinstall**: Sometimes, reloading the extension helps if changes have been made. Go to `chrome://extensions/`, and click the reload icon on your extension.

### Folder Structure
Your project folder should have the following structure:

```
linkedin-auto-connect/
  ├── app/
  │   ├── index.html
  │   ├── js/
  │   │   ├── main.js
  │   │   ├── content.js
  │   ├── css/
  │       ├── bootstrap.css
  │       ├── main.css
  ├── assets/
  │   ├── icon/
  │       ├── icon-16.png
  │       ├── icon-48.png
  │       ├── icon-128.png
  ├── manifest.json
```

### Important Notes
- **LinkedIn Policy**: This extension is designed for educational purposes. Automated activities like sending mass connect requests can be against LinkedIn's user agreement. Use responsibly.
- **Rate Limiting**: To avoid getting blocked or flagged by LinkedIn, ensure that you do not overuse the extension.
