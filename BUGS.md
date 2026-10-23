# 🐛 Bugs & Known Issues

## Known Issues (MVP)

### Low Priority
1. **Emoji product images** — Using emojis for MVP; production needs real image URLs
2. **Simulated Google Auth** — Using mock user data; needs Firebase Auth integration
3. **No real payment processing** — Checkout form is UI-only; needs Stripe/Razorpay
4. **Static product data** — Products hardcoded; needs database API
5. **No image optimization** — Production needs lazy loading + WebP format

### Medium Priority
6. **Cart persistence** — localStorage only; no server-side cart merge
7. **No email verification** — Auth doesn't verify email addresses
8. **No inventory tracking** — Stock levels not checked
9. **No order email notifications** — Confirmation emails not sent
10. **Admin not protected** — No login gate on /admin route

### To Fix
11. **Mobile filter modal** — Could use smoother animation
12. **Search debounce** — Real-time search should debounce
13. **Loading skeletons** — No skeleton loaders for products
14. **Keyboard navigation** — Some interactive elements need tabindex
15. **ARIA labels** — Enhance screen reader support

## Bug Report Template
```
Title: [Component] Brief description
Steps to Reproduce:
1. 
2. 
3. 
Expected: 
Actual: 
Environment: 
```
