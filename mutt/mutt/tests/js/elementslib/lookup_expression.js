/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, you can obtain one at http://mozilla.org/MPL/2.0/. */

const TEST_FOLDER = collector.addHttpResource('../_files/');


var setupModule = function () {
  controller = mozmill.getBrowserController();
}

var test = function () {
  controller.open(TEST_FOLDER + "singlediv.html");
  controller.waitForPageLoad();

  var searchBar = new elementslib.Lookup(controller.window.document,
                                         '/id("main-window")' +
                                         '/id("tab-view-deck")/[0]' +
                                         '/id("navigator-toolbox")' +
                                         '/id("nav-bar")/id("search-container")' +
                                         '/id("searchbar")');
  var searchPopup = new elementslib.Lookup(controller.window.document, 
                                         searchBar.expression +
                                         '/anon({"anonid":"searchbar-textbox"})' +
                                         '/[0]/anon({"anonid":"searchbar-engine-button"})' +
                                         '/anon({"anonid":"searchbar-popup"})');
  controller.click(searchPopup);
  assert.notEqual(searchPopup.state, "closed", "The search popup was found by Lookup");
}
