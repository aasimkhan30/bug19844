'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

import * as azdata from 'azdata';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "bug19844" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('bug19844.helloWorld', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        const dialog = azdata.window.createModelViewDialog('Bug 19844 Dialog', 'bug19844', 'wide');

        const tab = azdata.window.createTab('Buggy Tab');

        dialog.content = [tab];

        tab.registerContent(async view => {
            const flexContainer = view.modelBuilder.flexContainer().withLayout({
                flexFlow: 'column'
            }).withProps({
            }).component();

            const questionText = view.modelBuilder.text().withProps({
                value: 'Choose how you want to provide performance data'
            }).component();

            flexContainer.addItem(questionText);

            const radioButtonContainer = view.modelBuilder.flexContainer().withProps({
                ariaLabel: 'Choose how you want to provide performance data',
                ariaRole: 'radiogroup',
                CSSStyles: {
                    'flex-direction': 'row',
                    'width': 'fit-content',
                    'margin': '4px 0 16px',
                }
            }).component();




            const collectDataButton = view.modelBuilder.radioButton()
                .withProps({
                    name: 'buttonGroup',
                    label: 'Collect performance data now',
                    checked: true,
                    CSSStyles: {
                        'margin': '0'
                    },
                }).component();
                radioButtonContainer.addItem(collectDataButton);

            const openExistingButton = view.modelBuilder.radioButton()
            .withProps({
                name: 'buttonGroup',
                label: 'I already have the performance data',
                checked: true,
                CSSStyles: {
                    'margin': '0'
                },
            }).component();
            radioButtonContainer.addItem(openExistingButton);

            flexContainer.addItem(radioButtonContainer);

            view.initializeModel(flexContainer);
        });


        azdata.window.openDialog(dialog);

        vscode.window.showInformationMessage('Hello World!');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('bug19844.showCurrentConnection', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        azdata.connection.getCurrentConnection().then(connection => {
            let connectionId = connection ? connection.connectionId : 'No connection found!';
            vscode.window.showInformationMessage(connectionId);
        }, error => {
            console.info(error);
        });
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}