// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var app = angular.module('guideApp', ['ionic']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});


// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


/*
 * angular-elastic v2.4.2
 * (c) 2014 Monospaced http://monospaced.com
 * License: MIT
 */

angular.module('monospaced.elastic', [])

    .constant('msdElasticConfig', {
        append: ''
    })

    .directive('msdElastic', [
        '$timeout', '$window', 'msdElasticConfig',
        function ($timeout, $window, config) {
            'use strict';

            return {
                require: 'ngModel',
                restrict: 'A, C',
                link: function (scope, element, attrs, ngModel) {

                    // cache a reference to the DOM element
                    var ta = element[0],
                        $ta = element;

                    // ensure the element is a textarea, and browser is capable
                    if (ta.nodeName !== 'TEXTAREA' || !$window.getComputedStyle) {
                        return;
                    }

                    // set these properties before measuring dimensions
                    $ta.css({
                        'overflow': 'hidden',
                        'overflow-y': 'hidden',
                        'word-wrap': 'break-word'
                    });

                    // force text reflow
                    var text = ta.value;
                    ta.value = '';
                    ta.value = text;

                    var append = attrs.msdElastic ? attrs.msdElastic.replace(/\\n/g, '\n') : config.append,
                        $win = angular.element($window),
                        mirrorInitStyle = 'position: absolute; top: -999px; right: auto; bottom: auto;' +
                            'left: 0; overflow: hidden; -webkit-box-sizing: content-box;' +
                            '-moz-box-sizing: content-box; box-sizing: content-box;' +
                            'min-height: 0 !important; height: 0 !important; padding: 0;' +
                            'word-wrap: break-word; border: 0;',
                        $mirror = angular.element('<textarea tabindex="-1" ' +
                            'style="' + mirrorInitStyle + '"/>').data('elastic', true),
                        mirror = $mirror[0],
                        taStyle = getComputedStyle(ta),
                        resize = taStyle.getPropertyValue('resize'),
                        borderBox = taStyle.getPropertyValue('box-sizing') === 'border-box' ||
                            taStyle.getPropertyValue('-moz-box-sizing') === 'border-box' ||
                            taStyle.getPropertyValue('-webkit-box-sizing') === 'border-box',
                        boxOuter = !borderBox ? {width: 0, height: 0} : {
                            width: parseInt(taStyle.getPropertyValue('border-right-width'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-right'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-left'), 10) +
                            parseInt(taStyle.getPropertyValue('border-left-width'), 10),
                            height: parseInt(taStyle.getPropertyValue('border-top-width'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-top'), 10) +
                            parseInt(taStyle.getPropertyValue('padding-bottom'), 10) +
                            parseInt(taStyle.getPropertyValue('border-bottom-width'), 10)
                        },
                        minHeightValue = parseInt(taStyle.getPropertyValue('min-height'), 10),
                        heightValue = parseInt(taStyle.getPropertyValue('height'), 10),
                        minHeight = Math.max(minHeightValue, heightValue) - boxOuter.height,
                        maxHeight = parseInt(taStyle.getPropertyValue('max-height'), 10),
                        mirrored,
                        active,
                        copyStyle = ['font-family',
                            'font-size',
                            'font-weight',
                            'font-style',
                            'letter-spacing',
                            'line-height',
                            'text-transform',
                            'word-spacing',
                            'text-indent'];

                    // exit if elastic already applied (or is the mirror element)
                    if ($ta.data('elastic')) {
                        return;
                    }

                    // Opera returns max-height of -1 if not set
                    maxHeight = maxHeight && maxHeight > 0 ? maxHeight : 9e4;

                    // append mirror to the DOM
                    if (mirror.parentNode !== document.body) {
                        angular.element(document.body).append(mirror);
                    }

                    // set resize and apply elastic
                    $ta.css({
                        'resize': (resize === 'none' || resize === 'vertical') ? 'none' : 'horizontal'
                    }).data('elastic', true);

                    /*
                     * methods
                     */

                    function initMirror() {
                        var mirrorStyle = mirrorInitStyle;

                        mirrored = ta;
                        // copy the essential styles from the textarea to the mirror
                        taStyle = getComputedStyle(ta);
                        angular.forEach(copyStyle, function (val) {
                            mirrorStyle += val + ':' + taStyle.getPropertyValue(val) + ';';
                        });
                        mirror.setAttribute('style', mirrorStyle);
                    }

                    function adjust() {
                        var taHeight,
                            taComputedStyleWidth,
                            mirrorHeight,
                            width,
                            overflow;

                        if (mirrored !== ta) {
                            initMirror();
                        }

                        // active flag prevents actions in function from calling adjust again
                        if (!active) {
                            active = true;

                            mirror.value = ta.value + append; // optional whitespace to improve animation
                            mirror.style.overflowY = ta.style.overflowY;

                            taHeight = ta.style.height === '' ? 'auto' : parseInt(ta.style.height, 10);

                            taComputedStyleWidth = getComputedStyle(ta).getPropertyValue('width');

                            // ensure getComputedStyle has returned a readable 'used value' pixel width
                            if (taComputedStyleWidth.substr(taComputedStyleWidth.length - 2, 2) === 'px') {
                                // update mirror width in case the textarea width has changed
                                width = parseInt(taComputedStyleWidth, 10) - boxOuter.width;
                                mirror.style.width = width + 'px';
                            }

                            mirrorHeight = mirror.scrollHeight;

                            if (mirrorHeight > maxHeight) {
                                mirrorHeight = maxHeight;
                                overflow = 'scroll';
                            } else if (mirrorHeight < minHeight) {
                                mirrorHeight = minHeight;
                            }
                            mirrorHeight += boxOuter.height;
                            ta.style.overflowY = overflow || 'hidden';

                            if (taHeight !== mirrorHeight) {
                                ta.style.height = mirrorHeight + 'px';
                                scope.$emit('elastic:resize', $ta);
                            }

                            scope.$emit('taResize', $ta); // listen to this in the UserMessagesCtrl

                            // small delay to prevent an infinite loop
                            $timeout(function () {
                                active = false;
                            }, 1);

                        }
                    }

                    function forceAdjust() {
                        active = false;
                        adjust();
                    }

                    /*
                     * initialise
                     */

                    // listen
                    if ('onpropertychange' in ta && 'oninput' in ta) {
                        // IE9
                        ta['oninput'] = ta.onkeyup = adjust;
                    } else {
                        ta['oninput'] = adjust;
                    }

                    $win.bind('resize', forceAdjust);

                    scope.$watch(function () {
                        return ngModel.$modelValue;
                    }, function (newValue) {
                        forceAdjust();
                    });

                    scope.$on('elastic:adjust', function () {
                        initMirror();
                        forceAdjust();
                    });

                    $timeout(adjust);

                    /*
                     * destroy
                     */

                    scope.$on('$destroy', function () {
                        $mirror.remove();
                        $win.unbind('resize', forceAdjust);
                    });
                }
            };
        }
    ]);

// autolinker
/*!
 * Autolinker.js
 * 0.15.0
 *
 * Copyright(c) 2014 Gregory Jacobs <greg@greg-jacobs.com>
 * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
 *
 * https://github.com/gregjacobs/Autolinker.js
 */
!function (a, b) {
    "function" == typeof define && define.amd ? define([], function () {
        return a.returnExportsGlobal = b()
    }) : "object" == typeof exports ? module.exports = b() : a.Autolinker = b()
}(this, function () {
    var a = function (b) {
        a.Util.assign(this, b), this.matchValidator = new a.MatchValidator
    };
    return a.prototype = {
        constructor: a,
        urls: !0,
        email: !0,
        twitter: !0,
        newWindow: !0,
        stripPrefix: !0,
        className: "",
        htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;)/gi,
        matcherRegex: function () {
            var a = /(^|[^\w])@(\w{1,15})/, b = /(?:[\-;:&=\+\$,\w\.]+@)/, c = /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/, d = /(?:www\.)/, e = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/, f = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/, g = /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/;
            return new RegExp(["(", a.source, ")", "|", "(", b.source, e.source, f.source, ")", "|", "(", "(?:", "(", c.source, e.source, ")", "|", "(?:", "(.?//)?", d.source, e.source, ")", "|", "(?:", "(.?//)?", e.source, f.source, ")", ")", "(?:" + g.source + ")?", ")"].join(""), "gi")
        }(),
        charBeforeProtocolRelMatchRegex: /^(.)?\/\//,
        link: function (b) {
            var c = this, d = this.getHtmlParser(), e = this.htmlCharacterEntitiesRegex, f = 0, g = [];
            return d.parse(b, {
                processHtmlNode: function (a, b, c) {
                    "a" === b && (c ? f = Math.max(f - 1, 0) : f++), g.push(a)
                }, processTextNode: function (b) {
                    if (0 === f)for (var d = a.Util.splitAndCapture(b, e), h = 0, i = d.length; i > h; h++) {
                        var j = d[h], k = c.processTextNode(j);
                        g.push(k)
                    } else g.push(b)
                }
            }), g.join("")
        },
        getHtmlParser: function () {
            var b = this.htmlParser;
            return b || (b = this.htmlParser = new a.HtmlParser), b
        },
        getTagBuilder: function () {
            var b = this.tagBuilder;
            return b || (b = this.tagBuilder = new a.AnchorTagBuilder({
                newWindow: this.newWindow,
                truncate: this.truncate,
                className: this.className
            })), b
        },
        processTextNode: function (a) {
            var b = this;
            return a.replace(this.matcherRegex, function (a, c, d, e, f, g, h, i, j) {
                var k = b.processCandidateMatch(a, c, d, e, f, g, h, i, j);
                if (k) {
                    var l = b.createMatchReturnVal(k.match, k.matchStr);
                    return k.prefixStr + l + k.suffixStr
                }
                return a
            })
        },
        processCandidateMatch: function (b, c, d, e, f, g, h, i, j) {
            var k, l = i || j, m = "", n = "";
            if (c && !this.twitter || f && !this.email || g && !this.urls || !this.matchValidator.isValidMatch(g, h, l))return null;
            if (this.matchHasUnbalancedClosingParen(b) && (b = b.substr(0, b.length - 1), n = ")"), f)k = new a.match.Email({
                matchedText: b,
                email: f
            }); else if (c)d && (m = d, b = b.slice(1)), k = new a.match.Twitter({
                matchedText: b,
                twitterHandle: e
            }); else {
                if (l) {
                    var o = l.match(this.charBeforeProtocolRelMatchRegex)[1] || "";
                    o && (m = o, b = b.slice(1))
                }
                k = new a.match.Url({
                    matchedText: b,
                    url: b,
                    protocolUrlMatch: !!h,
                    protocolRelativeMatch: !!l,
                    stripPrefix: this.stripPrefix
                })
            }
            return {prefixStr: m, suffixStr: n, matchStr: b, match: k}
        },
        matchHasUnbalancedClosingParen: function (a) {
            var b = a.charAt(a.length - 1);
            if (")" === b) {
                var c = a.match(/\(/g), d = a.match(/\)/g), e = c && c.length || 0, f = d && d.length || 0;
                if (f > e)return !0
            }
            return !1
        },
        createMatchReturnVal: function (b, c) {
            var d;
            if (this.replaceFn && (d = this.replaceFn.call(this, this, b)), "string" == typeof d)return d;
            if (d === !1)return c;
            if (d instanceof a.HtmlTag)return d.toString();
            var e = this.getTagBuilder(), f = e.build(b);
            return f.toString()
        }
    }, a.link = function (b, c) {
        var d = new a(c);
        return d.link(b)
    }, a.match = {}, a.Util = {
        abstractMethod: function () {
            throw"abstract"
        }, assign: function (a, b) {
            for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        }, extend: function (b, c) {
            var d = b.prototype, e = function () {
            };
            e.prototype = d;
            var f;
            f = c.hasOwnProperty("constructor") ? c.constructor : function () {
                d.constructor.apply(this, arguments)
            };
            var g = f.prototype = new e;
            return g.constructor = f, g.superclass = d, delete c.constructor, a.Util.assign(g, c), f
        }, ellipsis: function (a, b, c) {
            return a.length > b && (c = null == c ? ".." : c, a = a.substring(0, b - c.length) + c), a
        }, indexOf: function (a, b) {
            if (Array.prototype.indexOf)return a.indexOf(b);
            for (var c = 0, d = a.length; d > c; c++)if (a[c] === b)return c;
            return -1
        }, splitAndCapture: function (a, b) {
            if (!b.global)throw new Error("`splitRegex` must have the 'g' flag set");
            for (var c, d = [], e = 0; c = b.exec(a);)d.push(a.substring(e, c.index)), d.push(c[0]), e = c.index + c[0].length;
            return d.push(a.substring(e)), d
        }
    }, a.HtmlParser = a.Util.extend(Object, {
        htmlRegex: function () {
            var a = /[0-9a-zA-Z][0-9a-zA-Z:]*/, b = /[^\s\0"'>\/=\x01-\x1F\x7F]+/, c = /(?:".*?"|'.*?'|[^'"=<>`\s]+)/, d = b.source + "(?:\\s*=\\s*" + c.source + ")?";
            return new RegExp(["(?:", "<(!DOCTYPE)", "(?:", "\\s+", "(?:", d, "|", c.source + ")", ")*", ">", ")", "|", "(?:", "<(/)?", "(" + a.source + ")", "(?:", "\\s+", d, ")*", "\\s*/?", ">", ")"].join(""), "gi")
        }(), parse: function (a, b) {
            b = b || {};
            for (var c, d = b.processHtmlNode || function () {
                }, e = b.processTextNode || function () {
                }, f = this.htmlRegex, g = 0; null !== (c = f.exec(a));) {
                var h = c[0], i = c[1] || c[3], j = !!c[2], k = a.substring(g, c.index);
                k && e(k), d(h, i.toLowerCase(), j), g = c.index + h.length
            }
            if (g < a.length) {
                var l = a.substring(g);
                l && e(l)
            }
        }
    }), a.HtmlTag = a.Util.extend(Object, {
        whitespaceRegex: /\s+/, constructor: function (b) {
            a.Util.assign(this, b), this.innerHtml = this.innerHtml || this.innerHTML
        }, setTagName: function (a) {
            return this.tagName = a, this
        }, getTagName: function () {
            return this.tagName || ""
        }, setAttr: function (a, b) {
            var c = this.getAttrs();
            return c[a] = b, this
        }, getAttr: function (a) {
            return this.getAttrs()[a]
        }, setAttrs: function (b) {
            var c = this.getAttrs();
            return a.Util.assign(c, b), this
        }, getAttrs: function () {
            return this.attrs || (this.attrs = {})
        }, setClass: function (a) {
            return this.setAttr("class", a)
        }, addClass: function (b) {
            for (var c, d = this.getClass(), e = this.whitespaceRegex, f = a.Util.indexOf, g = d ? d.split(e) : [], h = b.split(e); c = h.shift();)-1 === f(g, c) && g.push(c);
            return this.getAttrs()["class"] = g.join(" "), this
        }, removeClass: function (b) {
            for (var c, d = this.getClass(), e = this.whitespaceRegex, f = a.Util.indexOf, g = d ? d.split(e) : [], h = b.split(e); g.length && (c = h.shift());) {
                var i = f(g, c);
                -1 !== i && g.splice(i, 1)
            }
            return this.getAttrs()["class"] = g.join(" "), this
        }, getClass: function () {
            return this.getAttrs()["class"] || ""
        }, hasClass: function (a) {
            return -1 !== (" " + this.getClass() + " ").indexOf(" " + a + " ")
        }, setInnerHtml: function (a) {
            return this.innerHtml = a, this
        }, getInnerHtml: function () {
            return this.innerHtml || ""
        }, toString: function () {
            var a = this.getTagName(), b = this.buildAttrsStr();
            return b = b ? " " + b : "", ["<", a, b, ">", this.getInnerHtml(), "</", a, ">"].join("")
        }, buildAttrsStr: function () {
            if (!this.attrs)return "";
            var a = this.getAttrs(), b = [];
            for (var c in a)a.hasOwnProperty(c) && b.push(c + '="' + a[c] + '"');
            return b.join(" ")
        }
    }), a.MatchValidator = a.Util.extend(Object, {
        invalidProtocolRelMatchRegex: /^[\w]\/\//,
        hasFullProtocolRegex: /^[A-Za-z][-.+A-Za-z0-9]+:\/\//,
        uriSchemeRegex: /^[A-Za-z][-.+A-Za-z0-9]+:/,
        hasWordCharAfterProtocolRegex: /:[^\s]*?[A-Za-z]/,
        isValidMatch: function (a, b, c) {
            return b && !this.isValidUriScheme(b) || this.urlMatchDoesNotHaveProtocolOrDot(a, b) || this.urlMatchDoesNotHaveAtLeastOneWordChar(a, b) || this.isInvalidProtocolRelativeMatch(c) ? !1 : !0
        },
        isValidUriScheme: function (a) {
            var b = a.match(this.uriSchemeRegex)[0];
            return "javascript:" !== b && "vbscript:" !== b
        },
        urlMatchDoesNotHaveProtocolOrDot: function (a, b) {
            return !(!a || b && this.hasFullProtocolRegex.test(b) || -1 !== a.indexOf("."))
        },
        urlMatchDoesNotHaveAtLeastOneWordChar: function (a, b) {
            return a && b ? !this.hasWordCharAfterProtocolRegex.test(a) : !1
        },
        isInvalidProtocolRelativeMatch: function (a) {
            return !!a && this.invalidProtocolRelMatchRegex.test(a)
        }
    }), a.AnchorTagBuilder = a.Util.extend(Object, {
        constructor: function (b) {
            a.Util.assign(this, b)
        }, build: function (b) {
            var c = new a.HtmlTag({
                tagName: "a",
                attrs: this.createAttrs(b.getType(), b.getAnchorHref()),
                innerHtml: this.processAnchorText(b.getAnchorText())
            });
            return c
        }, createAttrs: function (a, b) {
            var c = {href: b}, d = this.createCssClass(a);
            return d && (c["class"] = d), this.newWindow && (c.target = "_blank"), c
        }, createCssClass: function (a) {
            var b = this.className;
            return b ? b + " " + b + "-" + a : ""
        }, processAnchorText: function (a) {
            return a = this.doTruncate(a)
        }, doTruncate: function (b) {
            return a.Util.ellipsis(b, this.truncate || Number.POSITIVE_INFINITY)
        }
    }), a.match.Match = a.Util.extend(Object, {
        constructor: function (b) {
            a.Util.assign(this, b)
        }, getType: a.Util.abstractMethod, getMatchedText: function () {
            return this.matchedText
        }, getAnchorHref: a.Util.abstractMethod, getAnchorText: a.Util.abstractMethod
    }), a.match.Email = a.Util.extend(a.match.Match, {
        getType: function () {
            return "email"
        }, getEmail: function () {
            return this.email
        }, getAnchorHref: function () {
            return "mailto:" + this.email
        }, getAnchorText: function () {
            return this.email
        }
    }), a.match.Twitter = a.Util.extend(a.match.Match, {
        getType: function () {
            return "twitter"
        }, getTwitterHandle: function () {
            return this.twitterHandle
        }, getAnchorHref: function () {
            return "https://twitter.com/" + this.twitterHandle
        }, getAnchorText: function () {
            return "@" + this.twitterHandle
        }
    }), a.match.Url = a.Util.extend(a.match.Match, {
        urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,
        protocolRelativeRegex: /^\/\//,
        protocolPrepended: !1,
        getType: function () {
            return "url"
        },
        getUrl: function () {
            var a = this.url;
            return this.protocolRelativeMatch || this.protocolUrlMatch || this.protocolPrepended || (a = this.url = "http://" + a, this.protocolPrepended = !0), a
        },
        getAnchorHref: function () {
            var a = this.getUrl();
            return a.replace(/&amp;/g, "&")
        },
        getAnchorText: function () {
            var a = this.getUrl();
            return this.protocolRelativeMatch && (a = this.stripProtocolRelativePrefix(a)), this.stripPrefix && (a = this.stripUrlPrefix(a)), a = this.removeTrailingSlash(a)
        },
        stripUrlPrefix: function (a) {
            return a.replace(this.urlPrefixRegex, "")
        },
        stripProtocolRelativePrefix: function (a) {
            return a.replace(this.protocolRelativeRegex, "")
        },
        removeTrailingSlash: function (a) {
            return "/" === a.charAt(a.length - 1) && (a = a.slice(0, -1)), a
        }
    }), a
});


angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic-datepicker', 'ionic-citypicker','CoderYuan'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        /*这段代码用来修复android中bottom栏出现在上方的bug*/

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        //用来修复person-detail页面android机型不能滑动单独区域的bug（还需要在ion-content tag中加上overflow-scroll=’true’）
        $ionicConfigProvider.scrolling.jsScrolling(true);


        $stateProvider

            .state('guide_index', {
                url: '/guide_index',
                templateUrl: 'templates/guide_index.html'
            })
            .state('guide_01', {
                url: '/guide_01',
                templateUrl: 'templates/guide_01.html'
            })
            .state('guide_02', {
                url: '/guide_02',
                templateUrl: 'templates/guide_02.html'
            })
            .state('guide_03', {
                url: '/guide_03',
                templateUrl: 'templates/guide_03.html'
            })
            .state('guide_04', {
                url: '/guide_04',
                templateUrl: 'templates/guide_04.html'
            })
            .state('guide_05', {
                url: '/guide_05',
                templateUrl: 'templates/guide_05.html'
            })
            .state('guide_06', {
                url: '/guide_06',
                templateUrl: 'templates/guide_06.html'
            })
            .state('guide_07', {
                url: '/guide_07',
                templateUrl: 'templates/guide_07.html'
            })
            .state('guide_08', {
                url: '/guide_08',
                templateUrl: 'templates/guide_08.html'
            })
            .state('guide_09', {
                url: '/guide_09',
                templateUrl: 'templates/guide_09.html'
            })
            .state('guide_login', {
                url: '/guide_login',
                templateUrl: 'templates/guide_login.html'
            })
            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.subscribe', {
                url: '/subscribe',
                views: {
                    'tab-subscribe': {
                        templateUrl: 'templates/tab-subscribe.html',
                        controller: 'SubscribeCtrl'
                    }
                }
            })

            .state('tab.chats', {
                url: '/chats',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
            .state('tab.person-detail', {
                url: '/persons/:personId',
                views: {
                    'tab-main': {
                        templateUrl: 'templates/person-detail.html',
                        controller: 'PersonDetailCtrl'
                    }
                }
            })

            .state('tab.main', {
                url: '/main',
                views: {
                    'tab-main': {
                        templateUrl: 'templates/tab-main.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/guide_01');
        //$ionicConfigProvider.tabs.position('bottom');

    }, function (ionicDatePickerProvider) {
        var datePickerObj = {
            inputDate: new Date(),
            setLabel: 'Set',
            todayLabel: 'Today',
            closeLabel: 'Close',
            mondayFirst: true,
            /*          weeksList: ["日", "M", "T", "W", "T", "F", "S"],
             monthsList: ["一月", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],*/
            templateType: 'popup',
            from: new Date(2012, 8, 1),
            to: new Date(2018, 8, 1),
            showTodayButton: true,
            dateFormat: 'dd MMMM yyyy',
            closeOnSelect: false,
            disableWeekdays: [6]
        };
        ionicDatePickerProvider.configDatePicker(datePickerObj);
    })
    // fitlers
    .filter('nl2br', ['$filter',
        function ($filter) {
            return function (data) {
                if (!data) return data;
                return data.replace(/\n\r?/g, '<br />');
            };
        }
    ])

    // directives
    .directive('autolinker', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        var eleHtml = element.html();

                        if (eleHtml === '') {
                            return false;
                        }

                        var text = Autolinker.link(eleHtml, {
                            className: 'autolinker',
                            newWindow: false
                        });

                        element.html(text);

                        var autolinks = element[0].getElementsByClassName('autolinker');

                        for (var i = 0; i < autolinks.length; i++) {
                            angular.element(autolinks[i]).bind('click', function (e) {
                                var href = e.target.href;
                                console.log('autolinkClick, href: ' + href);

                                if (href) {
                                    //window.open(href, '_system');
                                    window.open(href, '_blank');
                                }

                                e.preventDefault();
                                return false;
                            });
                        }
                    }, 0);
                }
            }
        }
    ])
    .directive('guideTwoButton', function () {
        return {
            restrict: 'E',
            /*这是guide页面最上面的两个button  保存和跳过*/
            template: '<div><button class="button button-none-circle" style="margin-top: 1em;margin-left: 1em;">跳过</button><button class="button button-none-circle" style="margin-top: 1em;margin-right: 1em;float: right">保存</button></div>',
            replace: true
        };
    })


    function onProfilePicError(ele) {
    this.ele.src = ''; // set a fallback
}

function getMockMessages() {
    return {
        "messages": [{
            "_id": "535d625f898df4e80e2a125e",
            "text": "Ionic has changed the game for hybrid app development.",
            "userId": "534b8fb2aa5e7afc1b23e69c",
            "date": "2014-04-27T20:02:39.082Z",
            "read": true,
            "readDate": "2014-12-01T06:27:37.944Z"
        }, {
            "_id": "535f13ffee3b2a68112b9fc0",
            "text": "I like Ionic better than ice cream!",
            "userId": "534b8e5aaa5e7afc1b23e69b",
            "date": "2014-04-29T02:52:47.706Z",
            "read": true,
            "readDate": "2014-12-01T06:27:37.944Z"
        }, {
            "_id": "546a5843fd4c5d581efa263a",
            "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            "userId": "534b8fb2aa5e7afc1b23e69c",
            "date": "2014-11-17T20:19:15.289Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.328Z"
        }, {
            "_id": "54764399ab43d1d4113abfd1",
            "text": "Am I dreaming?",
            "userId": "534b8e5aaa5e7afc1b23e69b",
            "date": "2014-11-26T21:18:17.591Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.337Z"
        }, {
            "_id": "547643aeab43d1d4113abfd2",
            "text": "Is this magic?",
            "userId": "534b8fb2aa5e7afc1b23e69c",
            "date": "2014-11-26T21:18:38.549Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.338Z"
        }, {
            "_id": "547815dbab43d1d4113abfef",
            "text": "Gee wiz, this is something special.",
            "userId": "534b8e5aaa5e7afc1b23e69b",
            "date": "2014-11-28T06:27:40.001Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.338Z"
        }, {
            "_id": "54781c69ab43d1d4113abff0",
            "text": "I think I like Ionic more than I like ice cream!",
            "userId": "534b8fb2aa5e7afc1b23e69c",
            "date": "2014-11-28T06:55:37.350Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.338Z"
        }, {
            "_id": "54781ca4ab43d1d4113abff1",
            "text": "Yea, it's pretty sweet",
            "userId": "534b8e5aaa5e7afc1b23e69b",
            "date": "2014-11-28T06:56:36.472Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.338Z"
        }, {
            "_id": "5478df86ab43d1d4113abff4",
            "text": "Wow, this is really something huh?",
            "userId": "534b8fb2aa5e7afc1b23e69c",
            "date": "2014-11-28T20:48:06.572Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.339Z"
        }, {
            "_id": "54781ca4ab43d1d4113abff1",
            "text": "Create amazing apps - ionicframework.com",
            "userId": "534b8e5aaa5e7afc1b23e69b",
            "date": "2014-11-29T06:56:36.472Z",
            "read": true,
            "readDate": "2014-12-01T06:27:38.338Z"
        }], "unread": 0
    };
}

// configure moment relative time
/*moment.locale('en', {
 relativeTime: {
 future: "in %s",
 past: "%s ago",
 s: "%d sec",
 m: "a minute",
 mm: "%d minutes",
 h: "an hour",
 hh: "%d hours",
 d: "a day",
 dd: "%d days",
 M: "a month",
 MM: "%d months",
 y: "a year",
 yy: "%d years"
 }
 });*/
