'use strict'

// @Compiler-Transpile "true"
// @Compiler-Minify "true"

const GoogleRecaptcha = require('custom-element-base')({
  name: 'google-recaptcha',
  config: {
    sitekey: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    type: {
      type: String,
      default: 'image'
    }
  },
  created: function() {
    this._captchaId = null
    this.style.display = 'block'
  },
  initialize: function() {
    if (!this.sitekey) {
      throw new Error('Google-Recaptcha: No sitekey specified')
    }
    if (this.theme !== 'light' && this.theme !== 'dark') {
      throw new Error('Google-Recaptcha: Invalid theme specified')
    }
    if (this.type !== 'image' && this.type !== 'audio') {
      throw new Error('Google-Recaptcha: Invalid type specified')
    }
    if (!GoogleRecaptcha._SCRIPT_LOADED) {
      GoogleRecaptcha.loadScript()
    }
    this.appendChild(this._container = document.createElement('div'))
    if (window.grecaptcha) {
      this._render()
    } else {
      const interval = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(interval)
          this._render()
        }
      }, 1000)
    }
  },
  proto: {
    reset: function() {
      grecaptcha.reset(this._captchaId)
    },
    getResponse: function() {
      return grecaptcha.getResponse(this._captchaId)
    },
    _render: function() {
      this._captchaId = grecaptcha.render(this._container, {
        sitekey: this.sitekey,
        theme: this.theme,
        type: this.type
      })
    }
  }
})
GoogleRecaptcha.loadScript = function() {
  GoogleRecaptcha._SCRIPT_LOADED = true
  const script = document.createElement('script')
  script.setAttribute('async', 'async')
  script.setAttribute('defer', 'defer')
  script.setAttribute('type', 'application/javascript')
  script.setAttribute('src', GoogleRecaptcha._API_URL)
  document.head.appendChild(script)
}
GoogleRecaptcha._API_URL = 'https://www.google.com/recaptcha/api.js'
GoogleRecaptcha._SCRIPT_LOADED = false

if (typeof module !== 'undefined') {
  module.exports = GoogleRecaptcha
}
