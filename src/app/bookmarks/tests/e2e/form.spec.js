
// grunt protractor --suite bookmarks

/*
  flow:
  > go to bookmarks list >
  > go to add new bookmark > click on cancel (return to bookmarks list) >
  > go to add new bookmark > define name, url and description > click on save >
  > check bookmark added at last item list >
  > click on edit on last added bookmark > update name > click on save >
  > check name on last item list >
  > click on edit on last added bookmark > click on delete >
  > check confirm message > cancel >
  > click on delete > click on delete (return to bookmarks list) >
  > check if last item list is different from removed one

*/

describe("e2e: bookmarks on add, edit and delete", function() {
  var page = require('./page.object');


  it("should go to bookmarks list page", function() {
    page.get();

    var newLink = page.on.list.links.new();

    expect(newLink.isPresent()).toBeTruthy();
  });

  it("should go to bookmarks add page", function() {
    var newLink = page.on.list.links.new();

    newLink.click();

    var title = page.on.form.title();

    expect(title.getText()).toContain('New Bookmark');
  });

  it("should return to bookmarks list page", function() {
    var cancelLink = page.on.form.buttons.cancelLink();

    cancelLink.click();

    var newLink = page.on.list.links.new();

    expect(newLink.isPresent()).toBeTruthy();
  });

  it("should add new bookmark", function() {
    var newLink = page.on.list.links.new();

    newLink.click();

    var nameInput = page.on.form.inputs.name();
    var urlInput = page.on.form.inputs.url();
    var descriptionInput = page.on.form.inputs.description();
    var saveButton = page.on.form.buttons.save();

    var objectName = 'Protractor e2e';

    nameInput.sendKeys(objectName);
    urlInput.sendKeys('https://angular.github.io/protractor/');
    descriptionInput.sendKeys('This is an automated protractor e2e test');

    saveButton.click();

    var repeater = page.on.table.repeater();

    // assertion
    expect(
      repeater // all rows
        .last() // last row
        .element(by.binding('bookmark.name'))
        .getText()
    ).toContain(objectName);
  });

  it("should go to edit bookmark and cancel edition", function() {
    // get element
    var lastRow = page.on.table.repeater().last();

    // assertion
    expect(
      lastRow
        .element(by.binding('bookmark.name'))
        .getText()
    ).toContain('Protractor e2e');

    // go to edit
    lastRow
      .element(by.id('gotoedit_1'))
      .click();

    // get elements
    var title = page.on.form.title();
    var nameInput = page.on.form.inputs.name();

    // assertions
    expect(title.getText()).toContain('Edit Bookmark');
    expect(nameInput.getAttribute('value')).toBe('Protractor e2e');


    page
      .on
      .form
      .buttons
      .cancelLink() // get cancel link element
      .click(); // cancel edition


    // get element
    var newLink = page.on.list.links.new();

    // assertion
    expect(newLink.isPresent()).toBeTruthy();
  });

  it("should edit bookmark", function() {
    var lastRow = page.on.table.repeater().last();

    var objectName = 'Protractor e2e';

    // assertion
    expect(
      lastRow
        .element(by.binding('bookmark.name'))
        .getText()
    ).toContain(objectName);

    // go to edit
    lastRow
      .element(by.id('gotoedit_1'))
      .click();

    // get elements
    var nameInput = page.on.form.inputs.name();
    var saveButton = page.on.form.buttons.save();

    objectName = 'Protractor e2e Edited';

    nameInput.clear();
    nameInput.sendKeys(objectName);
    saveButton.click();


    lastRow = page.on.table.repeater().last();
    // assertion
    expect(
      lastRow
        .element(by.binding('bookmark.name'))
        .getText()
    ).toContain(objectName);
  });

  it("should delete bookmark", function() {
    var lastRow = page.on.table.repeater().last();

    var objectName = 'Protractor e2e Edited';

    // assertion
    expect(
      lastRow
        .element(by.binding('bookmark.name'))
        .getText()
    ).toContain(objectName);

    // go to edit
    lastRow
      .element(by.id('gotoedit_1'))
      .click();

    // show delete confirm
    page.on.form.buttons.deleteConfirm().click();

    expect(
      element(by.binding('bookmark.name'))
        .getText()
    ).toContain(objectName);

    expect(
      page.on.form.buttons.delete().isPresent()
    ).toBeTruthy();

    // cancel delete
    page.on.form.buttons.cancel().click();

    expect(
      page.on.form.buttons.delete().isPresent()
    ).toBeFalsy();

    // show delete confirm again
    page.on.form.buttons.deleteConfirm().click();

    expect(
      element(by.binding('bookmark.name'))
        .getText()
    ).toContain(objectName);

    // do delete
    page.on.form.buttons.delete().click();

    // final assertion
    expect(
      page.on.table.repeater().last()
        .element(by.binding('bookmark.name'))
        .getText()
    ).not.toContain(objectName);
  });

});
