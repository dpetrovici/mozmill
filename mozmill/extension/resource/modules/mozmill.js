// ***** BEGIN LICENSE BLOCK *****
// Version: MPL 1.1/GPL 2.0/LGPL 2.1
// 
// The contents of this file are subject to the Mozilla Public License Version
// 1.1 (the "License"); you may not use this file except in compliance with
// the License. You may obtain a copy of the License at
// http://www.mozilla.org/MPL/
// 
// Software distributed under the License is distributed on an "AS IS" basis,
// WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
// for the specific language governing rights and limitations under the
// License.
// 
// The Original Code is Mozilla Corporation Code.
// 
// The Initial Developer of the Original Code is
// Mikeal Rogers.
// Portions created by the Initial Developer are Copyright (C) 2008
// the Initial Developer. All Rights Reserved.
// 
// Contributor(s):
//  Mikeal Rogers <mikeal.rogers@gmail.com>
// Gary Kwong <nth10sd@gmail.com>
// 
// Alternatively, the contents of this file may be used under the terms of
// either the GNU General Public License Version 2 or later (the "GPL"), or
// the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
// in which case the provisions of the GPL or the LGPL are applicable instead
// of those above. If you wish to allow use of your version of this file only
// under the terms of either the GPL or the LGPL, and not to allow others to
// use your version of this file under the terms of the MPL, indicate your
// decision by deleting the provisions above and replace them with the notice
// and other provisions required by the GPL or the LGPL. If you do not delete
// the provisions above, a recipient may use your version of this file under
// the terms of any one of the MPL, the GPL or the LGPL.
// 
// ***** END LICENSE BLOCK *****

var EXPORTED_SYMBOLS = ["controller", "events", "utils", "elementslib",
                        "getBrowserController", "newBrowserController", "getAddonsController",
                        "getPreferencesController", "newMail3PaneController", 
                        "getMail3PaneController", "wm", "platform", "getAddrbkController", 
                        "getMsgComposeController", "getAcctSettingsController"];
                        
var controller = {};  Components.utils.import('resource://mozmill/modules/controller.js', controller);
var events = {};      Components.utils.import('resource://mozmill/modules/events.js', events);
var utils = {};       Components.utils.import('resource://mozmill/modules/utils.js', utils);
var elementslib = {}; Components.utils.import('resource://mozmill/modules/elementslib.js', elementslib);

var os = {}; Components.utils.import('resource://mozmill/stdlib/os.js', os);

var platform = os.getPlatform();

var hwindow = Components.classes["@mozilla.org/appshell/appShellService;1"]
                .getService(Components.interfaces.nsIAppShellService)
                .hiddenDOMWindow;

var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
           .getService(Components.interfaces.nsIWindowMediator);

function addHttpResource (directory, namespace) {
  return 'http://localhost:4545/'+namespace;
}

function newBrowserController () {
  return new controller.MozMillController(hwindow.OpenBrowserWindow());
}

function getBrowserController () {
  var browserWindow = wm.getMostRecentWindow("navigator:browser");
  if (browserWindow == null) {
    return newBrowserController();
  }
  else {
    return new controller.MozMillController(browserWindow);
  }
}

function getAddonsController () {
  hwindow.BrowserOpenAddonsMgr();
  return new controller.MozMillController(wm.getMostRecentWindow(''));
}

function getPreferencesController() {
  hwindow.openPreferences();
  controller.sleep(1000)
  return new controller.MozMillController(wm.getMostRecentWindow(''));
}

// Thunderbird functions
function newMail3PaneController () {
  return new controller.MozMillController(hwindow.LoadPostAccountWizard());
}
 
function getMail3PaneController () {
  var mail3PaneWindow = wm.getMostRecentWindow("mail:3pane");
  if (mail3PaneWindow == null) {
    return newMail3PaneController();
  }
  else {
    return new controller.MozMillController(mail3PaneWindow);
  }
}

// Thunderbird - Address book window
function newAddrbkController () {
  hwindow.toAddressBook()
  //This is just taking too long to return
  //temporary fix because waitForEval isn't working
  controller.sleep(2000);
  var addyWin = wm.getMostRecentWindow("mail:addressbook");
  return new controller.MozMillController(addyWin);
}

function getAddrbkController () {
  var addrbkWindow = wm.getMostRecentWindow("mail:addressbook");
  if (addrbkWindow == null) {
    return newAddrbkController();
  }
  else {
    return new controller.MozMillController(addrbkWindow);
  }
}

// Thunderbird - Message Compose window
function newMsgComposeController () {
  return new controller.MozMillController(hwindow.MsgNewMessage(null));
}

function getMsgComposeController () {
  var msgComposeWindow = wm.getMostRecentWindow("msgcompose");
  if (msgComposeWindow == null) {
    return newMsgComposeController();
  }
  else {
    return new controller.MozMillController(msgComposeWindow);
  }
}
// Thunderbird - Account Settings dialog
function newAcctSettingsController () {
  return new controller.MozMillController(hwindow.MsgAccountManager(null));
}

function getAcctSettingsController () {
  var acctSettingsWindow = wm.getMostRecentWindow("Mail:Preferences");
  if (acctSettingsWindow == null) {
    return newAcctSettingsController();
  }
  else {
    return new controller.MozMillController(acctSettingsWindow);
  }
}
