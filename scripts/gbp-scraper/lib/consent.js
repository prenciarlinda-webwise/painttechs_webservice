// Google shows a cookie/consent interstitial on fresh browser profiles/contexts.
// It may not appear at all on later runs within the same context. Best-effort,
// non-fatal: if we can't find/dismiss it, we proceed anyway and let downstream
// steps fail loudly if the page genuinely isn't usable.
async function dismissConsent(page) {
  const buttonNamePattern = /^(Accept all|I agree|Reject all)$/i;

  try {
    const button = page.getByRole('button', { name: buttonNamePattern }).first();
    await button.waitFor({ state: 'visible', timeout: 4000 });
    await button.click();
    return true;
  } catch {
    return false;
  }
}

module.exports = { dismissConsent };
