var dbRequest = window.indexedDB.open('sandbox', 1);
dbRequest.onerror = function (event) {
    console.error('Error opening indexedDB:', event);
};
dbRequest.onsuccess = function (event) {
    // @ts-ignore
    var db = event.target.result;
    console.log('Successfully opened indexedDB:', db);
};
