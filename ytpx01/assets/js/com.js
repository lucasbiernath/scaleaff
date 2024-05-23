
    function loadUrlAffiliateConfig() {
        
        //Sobrescreve as urls
        
        bottle1Url = urlBaseBottle + bottle1Url;
        bottle6Url = urlBaseBottle + bottle6Url;
        bottle3Url = urlBaseBottle + bottle3Url;

        //Create URL Bottles Script
        //Montagem do iframe que carrega o link de afiliado
        let dataUrl = affiliateUrl;
        let sessid2 = getDataFormatada();
        let offerIframe = document.createElement('iframe');
        offerIframe.id = 'offer-iframe';
        offerIframe.src = dataUrl;
        offerIframe.style.display = 'none';
        document.getElementById('iframe-container').appendChild(offerIframe);

        bottle3Url += "&sessid2=sessid" + sessid2;
        setTimeout(function () {
            var bottle3UrlElements = document.getElementsByClassName('order-link-3-bottle');
            for (var i = 0; i < bottle3UrlElements.length; i++) {
            bottle3UrlElements[i].href = bottle3Url;
            }
        }, 500);


        bottle6Url += "&sessid2=sessid" + sessid2;
        setTimeout(function () {
            var bottle6UrlElements = document.getElementsByClassName('order-link-6-bottle');
            for (var i = 0; i < bottle6UrlElements.length; i++) {
            bottle6UrlElements[i].href = bottle6Url;
            }
        }, 500);


        bottle1Url += "&sessid2=sessid" + sessid2;
        setTimeout(function () {
            var bottle1UrlElements = document.getElementsByClassName('order-link-1-bottle');
            for (var i = 0; i < bottle1UrlElements.length; i++) {
            bottle1UrlElements[i].href = bottle1Url;
            }
        }, 500);

        setTimeout(() => {
            var script = document.createElement('script');
            script.src = "https://cdn.clkmc.com/cmc.js";
            document.getElementsByTagName('head')[0].appendChild(script);
        }, 1000);
        
    
    }

    function loadVturbScript() {
        var SECONDS_TO_DISPLAY = pitchVsl;
        var CLASS_TO_DISPLAY = cssHideClass;

        var attempts = 0;
        var elsHiddenList = [];
        var elsDisplayed = false;
        var elsHidden = document.querySelectorAll(CLASS_TO_DISPLAY);
        var alreadyDisplayedKey = `alreadyElsDisplayed${SECONDS_TO_DISPLAY}`;
        try {
            alreadyElsDisplayed = localStorage.getItem(alreadyDisplayedKey);
        } catch (e) {
            console.warn('Failed to read data from localStorage: ', e);
        }

        setTimeout(function () {
            elsHiddenList = Array.prototype.slice.call(elsHidden);
        }, 0);

        var showHiddenElements = function () {
            console.log(smartplayer.instances);
            elsDisplayed = true;
            elsHiddenList.forEach((e) => (e.style.display = "block"));
            try {
                localStorage.setItem(alreadyDisplayedKey, true);
            } catch (e) {
                console.warn('Failed to save data in localStorage: ', e);
            }
        };

        var startWatchVideoProgress = function () {
            if (
                typeof smartplayer === "undefined" ||
                !(smartplayer.instances && smartplayer.instances.length)
            ) {
                if (attempts >= 10) return;
                attempts += 1;
                return setTimeout(function () {
                    startWatchVideoProgress();
                }, 1000);
            }

            smartplayer.instances[0].on("play", () => {
                if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
                if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY)
                    return;
                showHiddenElements();
            });
            smartplayer.instances[0].on("timeupdate", () => {

                if (elsDisplayed || smartplayer.instances[0].smartAutoPlay) return;
                if (smartplayer.instances[0].video.currentTime < SECONDS_TO_DISPLAY)
                    return;
                showHiddenElements();
            });
        };

        if (alreadyElsDisplayed === "true") {
            setTimeout(function () {
                showHiddenElements();
            }, 100);
        } else {
            startWatchVideoProgress();
        }
    }

    function initiateCheckout(event) {
        event.preventDefault();

        fbq('track', 'InitiateCheckout');
        var url = event.currentTarget.getAttribute("href");

        setTimeout(function () {
            window.location.href = url;
        }, 500);
    }

    function getParams() {

        let t = "",
            e = window.top.location.href,
            r = new URL(e);

        let a = r.searchParams.get("utm_source"),
            n = r.searchParams.get("utm_medium"),
            o = r.searchParams.get("utm_campaign"),
            m = r.searchParams.get("utm_term"),
            c = r.searchParams.get("utm_content"),
            d = smartplayer.instances[0].analytics.player.options.id;
        fbclid = r.searchParams.get("fbclid");

        if (null != r) {
            let tidParams = [];

            if (o) tidParams.push(o);
            if (n) tidParams.push(n);
            if (a) tidParams.push(a);
            if (m) tidParams.push(m);
            if (c) tidParams.push(c);
            if (d) tidParams.push(d);

            t = `${paramTrackingName}=${tidParams.join('_')}`;

            if (t) {
                t = `${t}&fbclid=${fbclid}&fb=1`;
            }

        }
        return t;
    }

    function getDataFormatada() {
        var dataAtual = new Date();
        var dataFormatada = dataAtual.getFullYear() +
            ("0" + (dataAtual.getMonth() + 1)).slice(-2) +
            ("0" + dataAtual.getDate()).slice(-2) +
            ("0" + dataAtual.getHours()).slice(-2) +
            ("0" + dataAtual.getMinutes()).slice(-2) +
            ("0" + dataAtual.getSeconds()).slice(-2) +
            ("0" + dataAtual.getMilliseconds()).slice(-2);
        return dataFormatada;
    }

    function startCountDown()
    {
        var newDataTimer = pitchVsl + countDown;
        var divsTimer = document.querySelectorAll('.timer');
        divsTimer.forEach(function (div) {
          div.setAttribute('data-time', newDataTimer);
        });
        for (var timerElements = document.querySelectorAll(".timer"), i = 0; i < timerElements.length; i++) {
          updateTimer(timerElements[i]);
        }
    }

    function updateTimer(e) {
        var t = parseInt(e.dataset.time, 10),
          r = setInterval(function () {
            if (t <= 0)
              return clearInterval(r),
                void (e.innerHTML = "00:00");
            var n = Math.floor(t / 60),
              o = t % 60,
              i = ("0" + n).slice(-2) + ":" + ("0" + o).slice(-2);
            e.innerHTML = i, t--
          }, 1e3)
    }
      
    function setupFnFaq() {
        var faqList = document.querySelector('.faq__list');
        var faqItems = faqList.querySelectorAll('.faq__item');
        faqItems.forEach(function (item) {
          var faqCtrl = item.querySelector('.faq__ctrl');
          var faqAnswer = item.querySelector('.faq__answer');

          faqCtrl.addEventListener('click', function () {
            faqAnswer.classList.toggle('opened');
            faqCtrl.classList.toggle('opened');
            faqAnswer.style.height = faqAnswer.classList.contains('opened') ? faqAnswer.scrollHeight + 'px' : null;
          });
        });
      }
