# Technest Senior Test by Lorenzo Portillo

## What is it?

It is a test designed for Technest Senior job position, started on 04/09/2020 and finished on 06/09/2020.

This test follows the instructions of PDF '/technest-test-master/senior-test.pdf'.

<br>

<strong>NOTE:</strong> About Part2 and Part3 of PDF, as BTC price is the same for all rows, the highlighting row is the one containing the Exchange Rate (Top bar), instead the accounts or transactions rows.

<strong>NOTE:</strong> There is a 3 seconds fake loading to show the Server Disconnected status on the begginig.

<strong>NOTE:</strong> There is a knwon issue on the scroll of detailed accounts page.

## How to run?

This test is designed to run on local machine (Windows 8/10).

To run it, follow next steps:

- Install Node.js from the webpage [Node.js](https://nodejs.org/es/). Please choose the LTS version.

- After install Node.js, execute the following comands on a windows console (please ensure you are in the indicated folder):

- <strong>npm install -g @angular/cli</strong> (on folder '/technest-test-master/')

- <strong>npm install -g @nestjs/cli</strong> (on folder '/technest-test-master/')

- <strong>npm install</strong> (on folder '/technest-test-master/server/')

- <strong>npm install</strong> (on folder '/technest-test-master/web-application/')

- After the install has ended, execute <strong>start_server.bat</strong> and <strong>start_web-application.bat</strong> to run the test. The Server will run automatically, and the Web-Application will be opened on your browser (Do not close both consoles!).