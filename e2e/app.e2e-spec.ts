import { ShoppingadminPage } from './app.po';

describe('shoppingadmin App', () => {
  let page: ShoppingadminPage;

  beforeEach(() => {
    page = new ShoppingadminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
