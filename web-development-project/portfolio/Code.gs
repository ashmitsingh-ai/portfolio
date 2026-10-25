/** Google Apps Script backend for a Google Sheet. Deploy as a Web App. */
const SHEET_NAME = 'Responses';
function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) { sheet = ss.insertSheet(SHEET_NAME); sheet.appendRow(['Timestamp','Name','Email','Subject','Message']); }
  return sheet;
}
function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (!data.name || !data.email || !data.subject || !data.message) return json_({ok:false,error:'Missing required fields'});
    sheet_().appendRow([new Date(), String(data.name).slice(0,100), String(data.email).slice(0,200), String(data.subject).slice(0,150), String(data.message).slice(0,3000)]);
    return json_({ok:true});
  } catch (err) { return json_({ok:false,error:'Invalid request'}); }
}
function doGet() {
  const sheet = sheet_(); const values = sheet.getDataRange().getValues();
  const rows = values.slice(1).map(r => ({timestamp:r[0] instanceof Date ? r[0].toISOString() : String(r[0]),name:r[1],email:r[2],subject:r[3],message:r[4]}));
  return json_({ok:true,responses:rows});
}
function json_(data) { return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON); }
