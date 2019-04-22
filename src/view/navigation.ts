import * as $ from 'jquery';

const { dialog } = require('electron').remote;

$("#nav-problem").click(() => {
    console.log("i clickz");
    dialog.showOpenDialog({ properties: ['openFile'] }, (file) => {
        console.log(`Selected: ${file}`);
    });
});