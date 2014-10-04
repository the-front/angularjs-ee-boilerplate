describe("e2e: <%= helpers.capitalize( name ) %> on add, edit and delete", function() {
  var page = require('./page.object');


  it("should go to <%= helpers.capitalize( name ) %> list page", function() {
    page.get();

    var newLink = page.on.list.links.new(); // get element

    expect(newLink.isPresent()).toBeTruthy();
  });

  it("should go to <%= helpers.capitalize( name ) %> add page", function() {
    var newLink = page.on.list.links.new(); // get element

    newLink.click();

    var title = page.on.form.title(); // get element

    expect(title.getText()).toContain('New <%= helpers.capitalize( name ) %>');
  });

  it("should return to <%= helpers.capitalize( name ) %> list page", function() {
    var cancelLink = page.on.form.buttons.cancelLink(); // get element

    cancelLink.click();

    var newLink = page.on.list.links.new(); // get element

    expect(newLink.isPresent()).toBeTruthy();
  });

  it("should add new <%= helpers.capitalize( name ) %>", function() {
    var newLink = page.on.list.links.new(); // get element

    newLink.click();

    var nameInput = page.on.form.inputs.name(); // get element
    var descriptionInput = page.on.form.inputs.description(); // get element
    var saveButton = page.on.form.buttons.save(); // get element

    var objectName = 'Protractor e2e';

    nameInput.sendKeys(objectName);
    descriptionInput.sendKeys('This is an automated protractor e2e test');

    saveButton.click();

    // assertion
    expect(
      page.on.table
        .lastRowName() // get element
        .getText()
    ).toContain(objectName);
  });

  it("should go to edit <%= helpers.capitalize( name ) %> and cancel edition", function() {
    var lastRow = page.on.table.lastRow(); // get element

    // assertion
    expect(
      page.on.table
        .lastRowName(lastRow) // get element
        .getText()
    ).toContain('Protractor e2e');

    // go to edit
    page.on.table
      .lastRowEditLink(lastRow) // get element
      .click();

    // get elements
    var title = page.on.form.title();
    var nameInput = page.on.form.inputs.name();

    // assertions
    expect(title.getText()).toContain('Edit <%= helpers.capitalize( name ) %>');
    expect(nameInput.getAttribute('value')).toBe('Protractor e2e');

    page.on.form.buttons
      .cancelLink() // get element
      .click(); // cancel edition

    // get element
    var newLink = page.on.list.links.new();

    // assertion
    expect(newLink.isPresent()).toBeTruthy();
  });

  it("should edit <%= helpers.capitalize( name ) %>", function() {
    var lastRow = page.on.table.lastRow(); // get element

    var objectName = 'Protractor e2e';

    // assertion
    expect(
      page.on.table
        .lastRowName(lastRow) // get element
        .getText()
    ).toContain(objectName);

    // go to edit
    page.on.table
      .lastRowEditLink(lastRow) // get element
      .click();

    // get elements
    var nameInput = page.on.form.inputs.name();
    var saveButton = page.on.form.buttons.save();

    objectName = 'Protractor e2e Edited';

    nameInput.clear();
    nameInput.sendKeys(objectName);
    saveButton.click();

    // assertion
    expect(
      page.on.table
        .lastRowName() // get element
        .getText()
    ).toContain(objectName);
  });

  it("should delete <%= helpers.capitalize( name ) %>", function() {
    var lastRow = page.on.table.lastRow(); // get element

    var objectName = 'Protractor e2e Edited';

    // assertion
    expect(
      page.on.table
        .lastRowName(lastRow) // get element
        .getText()
    ).toContain(objectName);

    // go to edit
    page.on.table
      .lastRowEditLink(lastRow) // get element
      .click();

    page.on.form.buttons
      .deleteConfirm() // get element
      .click(); // show delete confirm

    expect(
      page.on.form
        .nameConfirm() // get element
        .getText()
    ).toContain(objectName);

    expect(
      page.on.form.buttons
        .delete() // get element
        .isPresent()
    ).toBeTruthy();

    page.on.form.buttons
      .cancel() // get element
      .click(); // cancel delete

    expect(
      page.on.form.buttons
        .delete() // get element
        .isPresent()
    ).toBeFalsy();

    page.on.form.buttons
      .deleteConfirm() // get element
      .click(); // show delete confirm again

    expect(
      page.on.form
        .nameConfirm() // get element
        .getText()
    ).toContain(objectName);

    page.on.form.buttons
      .delete() // get element
      .click(); // do delete

    // final assertion
    expect(
      page.on.table
        .lastRowName() // get element
        .getText()
    ).not.toContain(objectName);
  });

});
