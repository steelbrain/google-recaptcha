'use strict'

// @Compiler-Transpile "true"

class GoogleRecaptcha extends HTMLElement {
  createdCallback() {
    this.style.display = 'block'
    this.config = {
      sitekey: this.getAttribute('sitekey') || '',
      theme: this.getAttribute('theme') || 'light',
      type: this.getAttribute('type') || 'image'
    }
  }
  attachedCallback() {
    if (!this.config.sitekey) {
      throw new Error('Google-Recaptcha: No sitekey specified')
    }
    if (this.config.theme !== 'light' && this.config.theme !== 'dark') {
      throw new Error('Google-Recaptcha: Invalid theme specified')
    }
    if (this.config.type !== 'image' && this.config.type !== 'audio') {
      throw new Error('Google-Recaptcha: Invalid type specified')
    }
    if (!GoogleRecaptcha._SCRIPT_LOADED) {
      GoogleRecaptcha.loadScript()
    }
    this.appendChild(this._container = document.createElement('div'))
    if (window.grecaptcha) {
      this._render()
    } else {
      var me = this
      var interval = setInterval(function() {
        if (window.grecaptcha) {
          clearInterval(interval)
          me._render()
        }
      }, 3000)
    }
  }
  attributeChangedCallback(attrName, _, attrValue) {
    if (this.config.hasOwnProperty(attrName)) {
      this.config[attrName] = attrValue
    }
  }
  _render() {
    this._captchaId = grecaptcha.render(this._container, this.config)
  }
  // Public method
  reset() {
    grecaptcha.reset(this._captchaId)
  }
  getResponse() {
    return grecaptcha.getResponse(this._captchaId)
  }

  static loadScript() {
    GoogleRecaptcha._SCRIPT_LOADED = true
    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('defer', '')
    script.setAttribute('type', 'application/javascript')
    script.setAttribute('src', GoogleRecaptcha._API_URL)
    document.head.appendChild(script)
  }
}
GoogleRecaptcha._API_URL = 'https://www.google.com/recaptcha/api.js'
GoogleRecaptcha._SCRIPT_LOADED = false

GoogleRecaptcha.Element = document.registerElement('google-recaptcha', {
  prototype: Object.create(GoogleRecaptcha.prototype)
})

if (typeof module !== 'undefined') {
  module.exports = GoogleRecaptcha.Element
}
