// ==UserScript==
// @name         SSBHelper
// @namespace    https://selfsrv.oxy.edu/EmployeeSelfService/ssb/*
// @version      2026-02-28
// @description  Helps you type your hours, 9-5
// @author       You
// @match        https://selfsrv.oxy.edu/EmployeeSelfService/ssb/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let listeners = [];

function setupTimePickerListeners() {
    if (listeners.length > 0) {
        listeners.forEach(({ element, handler }) => {
            element.removeEventListener('input', handler);
        });
        listeners = [];
    }

    let timePickers = document.querySelectorAll('.xeTimePickerTextField');
    timePickers.forEach(function(timePicker) {
        const handler = (e) => {
            switch (e.target.value) {
                case '9':
                e.target.value = '09:00 am';
                break;
            case '10':
                e.target.value = '10:00 am';
                break;
            case '11':
                e.target.value = '11:00 am';
                break;
            case '12':
                e.target.value = '12:00 pm';
                break;
            case '2':
                e.target.value = '02:00 pm';
                break;
            case '3':
                e.target.value = '03:00 pm';
                break;
            case '4':
                e.target.value = '04:00 pm';
                break;
            case '5':
                e.target.value = '05:00 pm';
                break;
            case '1 ':
                e.target.value = '01:00 pm';
                break;
            case '01':
                e.target.value = '01:00 pm';
                break;
            }
        };
        timePicker.addEventListener('input', handler);
        listeners.push({ element: timePicker, handler });
    });
}

// dom mutation observer
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            setupTimePickerListeners();
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

setupTimePickerListeners();
