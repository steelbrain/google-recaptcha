Google-Recaptcha
===============
Google-Recaptcha is a HTML5 Custom Element that empowers you to use the Google Recaptcha without knowing their API at all. It's easy as in pie.

For browsers who don't support native custom elements, You're gonna need to import a polyfill :(

#### API
```js
class GoogleRecaptcha extends HTMLElement {
  reset(): void
  getResponse(): string
}
```

#### Example Usage
Every attribute other than the site key is optional.
```html
<google-recaptcha theme="dark" type="image" sitekey="your-site-key-here"></google-recaptcha>
```
```js
const captcha = document.createElement('google-recaptcha')
captcha.setAttribute('sitekey', 'your-site-key-here')
document.body.appendChild(captcha)
```

#### License
This project is licensed under the terms of MIT License, see the LICENSE file for more info.
