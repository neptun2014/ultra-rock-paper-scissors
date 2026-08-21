from playwright.sync_api import expect


def test_page_loads(server_url, page):
    page.goto(server_url + "/")
    page.wait_for_function("() => window.__APP && window.__APP.ready === true")
    expect(page).to_have_title("אבן, נייר ומספריים")
    expect(page.locator("h1")).to_have_text("אבן, נייר ומספריים")
