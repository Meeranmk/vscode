import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('myextension.openChatbot', () => {
    const panel = vscode.window.createWebviewPanel(
      'chatbot',
      'Chatbot',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, 'web', 'dist')
        ]
      }
    );

    const scriptUri = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, 'web', 'dist', 'index.js')
    );
    const styleUri = panel.webview.asWebviewUri(
      vscode.Uri.joinPath(context.extensionUri, 'web', 'dist', 'index.css')
    );

    panel.webview.html = getWebviewContent(scriptUri, styleUri);
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(scriptUri: vscode.Uri, styleUri: vscode.Uri): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="${styleUri}">
      <title>Chatbot</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="${scriptUri}"></script>
    </body>
    </html>
  `;
}
