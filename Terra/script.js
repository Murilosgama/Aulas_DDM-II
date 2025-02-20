function applyTheme() {
    var regexUserThemeCookie = /user_theme=(\w+)/.exec(document.cookie);
    var OSTheme = window.matchMedia('(prefers-color-scheme: dark)');

    window.applyUserTheme = function (t) {
        document.documentElement.setAttribute('color-scheme', t);
        zaz.use(function (pkg) {
            pkg.context.page.set('user_theme', t);
        });
    }

    if (regexUserThemeCookie) {
        switch (regexUserThemeCookie[1]) {
            case 'dark':
                window.applyUserTheme('dark');
                break;
            case 'light':
                window.applyUserTheme('light');
                break;
            case 'auto':
                OSTheme.onchange = function (e) {
                    window.applyUserTheme(e.matches ? 'dark' : 'light');
                }
                window.applyUserTheme(OSTheme.matches ? 'dark' : 'light');
                break;
        }
    } else {
        document.documentElement.setAttribute('color-scheme', 'light');
    }
}

if (document.prerendering) {
    document.addEventListener("prerenderingchange", function () {
        applyTheme();
    });
} else {
    applyTheme();
}

var regexLoadAds = /load_ads=(\w+)/.exec(document.cookie);
if (regexLoadAds && regexLoadAds[1] == 'false') {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.pauseAdRequests = 1;

    var css, style = document.createElement('style');
    var css = '.table-ad, .premium-hide-ad {display: none}';
    style.textContent = css;
    document.head.appendChild(style);

    zaz.use(function (pkg) {
        pkg.context.page.set('loadAds', false);
    });
}

window.terraPremium = regexLoadAds && regexLoadAds[1] == 'false';
window.__gamThreadYield = Math.random() >= 0.5;